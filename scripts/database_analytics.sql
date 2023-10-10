-- Create the 'analytics' database if it doesn't exist
CREATE DATABASE IF NOT EXISTS analytics;

-- Switch to the 'analytics' database
USE analytics;

-- Create the 'posts' table
CREATE TABLE IF NOT EXISTS posts (
    postID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID VARCHAR(250) NOT NULL,
    postText VARCHAR(250) NOT NULL,
    postDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'user_analytics' table
CREATE TABLE IF NOT EXISTS user_analytics (
    userID VARCHAR(250) NOT NULL,
    postCount INT NOT NULL,
    online BOOLEAN
);

