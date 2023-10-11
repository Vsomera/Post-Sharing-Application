import yaml
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from base import Base
from posts import Posts
from user_analytics import UserAnalytics
from flask import request

app = Flask(__name__) 

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
        title = data.get('title')
        postText = data.get('postText') 
        userID = data.get('userID')  

        # Create a new post object
        new_post = Posts(userID=userID, postText=postText, title=title)  

        # Add the new post to the session
        session.add(new_post)

        # Commit the session to save the new post
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

        if post:
            # Delete the post
            session.delete(post)

            # Commit the session to save the changes
            session.commit()

            session.close()

            return jsonify({'message': 'Post deleted successfully'})
        
        else:
            return jsonify({'error': 'Post not found'}), 404
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True, port=8080) # runs app in debug mode