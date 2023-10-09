CREATE DATABASE analytics;
USE analytics;

CREATE TABLE analytics (
    userID int not null AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(250) NOT NULL,  
    postCount int NOT NULL,
    online BOOLEAN
);

INSERT INTO analytics(userName, postCount, online)
VALUES ("Vsomera", 0, 0), ("JSomera", 0, 0);
