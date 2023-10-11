from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.dialects.mysql import TIMESTAMP
from base import Base
import datetime

# Define the 'posts' table
class Posts(Base):
    ''' Posts '''

    __tablename__ = 'posts'

    postID = Column(Integer, primary_key=True, autoincrement=True)
    userID = Column(String(250), nullable=False)
    content = Column(String(250), nullable=False)
    title = Column(String(250), nullable=False)  
    postDate = Column(TIMESTAMP, nullable=False, server_default='CURRENT_TIMESTAMP')

    def __init__(self, userID, content, title):
        ''' Initializes a post '''
        self.userID = userID
        self.title = title
        self.content = content

    def to_dict(self):
        ''' Dict representation of a post '''
        return {
            'postID': self.postID,
            'userID': self.userID,
            'title': self.title,
            'content': self.content, 
            'postDate': self.postDate
        }
