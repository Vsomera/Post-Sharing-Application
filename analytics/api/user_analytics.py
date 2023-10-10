from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP
from base import Base
import datetime

# Define the 'user_analytics' table
class UserAnalytics(Base):
    ''' User Analytics '''

    __tablename__ = 'user_analytics'

    userID = Column(String(250), primary_key=True, nullable=False)
    postCount = Column(Integer, nullable=False)
    online = Column(Boolean, nullable=False)

    def __init__(self, userID, postCount, online, lastActivity=None):
        ''' Initializes user analytics data '''
        self.userID = userID
        self.postCount = postCount
        self.online = online

    def to_dict(self):
        ''' Dict representation of user analytics data '''
        return {
            'userID': self.userID,
            'postCount': self.postCount,
            'online': self.online,
        }
