
# ACIT 3495 - Docker Microservice Application

Full stack Microservice application that authenticates users and allows users to share posts.



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
