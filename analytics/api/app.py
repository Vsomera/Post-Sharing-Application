import yaml
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from base import Base
from posts import Posts
from user_analytics import UserAnalytics
from flask import request
from flask_cors import CORS  # Import CORS

app = Flask(__name__) 
CORS(app)

with open("app_conf.yml", 'r') as f1:
    # imports config filescd
    app_config = yaml.safe_load(f1.read())

user = app_config['datastore']['user']
password = app_config['datastore']['password']
hostname = app_config['datastore']['hostname']
port = app_config['datastore']['port']
db = app_config['datastore']['db']

DB_ENGINE = create_engine(f'mysql+pymysql://{user}:{password}@{hostname}:{port}/{db}')
Base.metadata.bind = DB_ENGINE
DB_SESSION = sessionmaker(bind=DB_ENGINE)

''' Get All Posts '''
@app.route("/api/get-posts", methods=['GET'])
def getPosts():
    try:
        # Create a session
        session = DB_SESSION()

        # Query all posts from the 'posts' table
        all_posts = session.query(Posts).all()

        # Convert the posts to a list of dictionaries
        post_list = [post.to_dict() for post in all_posts]

        session.close()

        return jsonify(post_list)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
        

''' Add a new Post '''
@app.route("/api/add-post", methods=['POST'])
def addPost():
    try:
        # Create a session
        session = DB_SESSION()

        # Get data from request
        data = request.json
        userID = data.get('userID')
        title = data.get('title')
        content = data.get('content')

        # Create a new post object
        new_post = Posts(userID=userID, title=title, content=content)

        # Add the new post to the session
        session.add(new_post)

        # Commit the session to save the new post
        session.commit()

        # Increment the post count for the user in the user_analytics table
        user_analytics_data = session.query(UserAnalytics).get(userID)
        if user_analytics_data:
            user_analytics_data.postCount += 1
        else:
            # Handle the case where the user doesn't exist in user_analytics (e.g., create a new entry)
            user_analytics_data = UserAnalytics(userID=userID, postCount=1, online=True)
            session.add(user_analytics_data)

        # commit changes to user analytics
        session.commit()

        session.close()

        return jsonify({'message': 'Post added successfully'}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

''' Edit a Post '''
@app.route("/api/edit-post/<int:post_id>", methods=['PUT'])
def editPost(post_id):
    try:
        # Create a session
        session = DB_SESSION()

        # Get the post by ID
        post = session.query(Posts).get(post_id)

        if post:
            # Get data from request
            data = request.json
            post.title = data.get('title', post.title)
            post.content = data.get('content', post.content)

            # Commit the session to save the updated post
            session.commit()

            session.close()

            return jsonify({'message': 'Post updated successfully'})
        
        else:
            return jsonify({'error': 'Post not found'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

''' Delete a Post '''
@app.route("/api/delete-post/<int:post_id>", methods=["DELETE"])
def deletePost(post_id):
    try:
        # Create a session
        session = DB_SESSION()

        # Get the post by ID
        post = session.query(Posts).get(post_id)

        data = request.json
        userID = data.get('userID')

        if post:
            # Delete the post
            session.delete(post)

            # Commit the session to save the changes
            session.commit()

             # Decrement the post count for the user in the user_analytics table
            user_analytics_data = session.query(UserAnalytics).get(userID)
            if user_analytics_data:
                user_analytics_data.postCount -= 1

                # Commit the session to update user_analytics
                session.commit()

            session.close()

            return jsonify({'message': 'Post deleted successfully'})
        
        else:
            return jsonify({'error': 'Post not found'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

''' Get User Analytics Data '''
@app.route("/api/user-statistics", methods=['POST'])
def getUserStatistics():
    try:
        session = DB_SESSION()

        data = request.json
        userID = data.get('userID')

        # user analytics data
        user_analytics_data = session.query(UserAnalytics).all()

        total_post_count = 0
        online_count = 0
        your_posts = 0

        for user_data in user_analytics_data:

            total_post_count += user_data.postCount

            online_count += int(user_data.online)

            if user_data.userID == userID:
                your_posts += user_data.postCount 

        session.close()

        #  dictionary with the statistics
        user_statistics = {
            "postCount": total_post_count,
            "yourPosts": your_posts,  
            "online": online_count
        }

        return jsonify(user_statistics)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
''' Toggle Online '''
@app.route("/api/toggle-online", methods=['PUT'])
def toggleOnline():
    try:
        # Create a session
        session = DB_SESSION()

        # Get data from request
        data = request.json
        userID = data.get('userID')

        # Find the user in the user_analytics table
        user_analytics_data = session.query(UserAnalytics).get(userID)

        if user_analytics_data:
            # Toggle the "online" field
            user_analytics_data.online = 1 if user_analytics_data.online == 0 else 0

            # Commit the session to save the updated user analytics
            session.commit()

            session.close()

            return jsonify({'message': 'Online status toggled successfully'})
        else:
            return jsonify({'error': 'User not found in user_analytics'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080) # runs app in debug mode