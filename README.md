
# ACIT 3495 - Docker Microservice Application

Full stack Microservice application that authenticates users and allows users to share posts.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![App Screenshot](https://cdn.discordapp.com/attachments/1156121031208087605/1161823337278865508/image.png?ex=6539b34d&is=65273e4d&hm=18bcd207f7b02b62f34bd0911b01fe0049a62dd7540e90613ad348ae56d670ad&)


# Installation


```bash
  git clone https://github.com/Vsomera/Docker-Microservices.git
  cd Docker-Microservices
  docker-compose up --build
```
    
## Analytics API Reference

#### Get all posts

```http
  GET http://localhost:8080/api/get-posts
```



#### Share a new Post

```http
  POST http://localhost:8080/api/add-post
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userID`      | `string` | **Required**. Id of user |
| `title`      | `string` | **Required**. Title of Post |
| `content`      | `string` | **Required**. Content of Post |


#### Edit a Post

```http
  PUT http://localhost:8080/api/edit-post/<post:id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Title of Post |
| `content`      | `string` | **Required**. Content of Post |


#### Delete a Post

```http
  DELETE http://localhost:8080/api/delete-post/<post:id>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userID`      | `string` | **Required**. Id of User |


## Authentication API Reference

#### Register a User

```http
  POST http://localhost:5050/api/users/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of User |
| `email`      | `string` | **Required**. Email of User |
| `password`      | `string` | **Required**. Password of User (will be hashed in database)|

#### Login a User

```http
  POST http://localhost:5050/api/users/
```
- Returns an access token if user is authorized

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username of User |
| `email`      | `string` | **Required**. Email of User |


#### Get user Information

```http
  GET http://localhost:5050/api/users/
```

| Auth-Type | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Bearer Token`      | `string` | **Required**. Token signed with user information |
