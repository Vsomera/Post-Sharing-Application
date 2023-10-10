import yaml
from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from base import Base
from posts import Posts
from user_analytics import UserAnalytics

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
    pass

''' Edit a Post '''
@app.route("/api/edit-post", methods=['EDIT'])
def editPost():
    pass

''' Delete a Post '''
@app.route("/api/delete-post", methods=["DELETE"])
def deletePost():
    pass


if __name__ == "__main__":
    app.run(debug=True, port=8080) # runs app in debug mode