# samen-eten
A school project for the subject programming 4. samen-eten is an API built with expressJS. it manages meals and student homes.

## Installation guide
### Docker
Build:
```
docker-compose build
```
Compose and start up:
```
docker-compose up
```
Enter image:
```
docker exec -it [image-name] /bin/bash
```
available images:
- samen_eten_node
- samen_eten_mariadb
- samen_eten_phpmyadmin

### phpmyadnin
Login:
```
localhost:8080
```
Login credentials:
Username: ```root```

Password: ```1337```
After logging in run the database script to create database.

### .env
required fields:
```
SONAR_LOGIN_KEY = 
SONAR_PROJECT_KEY = 
SONAR_SERVER_NAME = 

DB_HOST = samen_eten_mariadb
DB_USER = root
DB_DATABASE = studenthome
DB_PASSWORD = 1337
JWT_SECRET = HkJXf7CWNeJfyeA4

TEST_TOKEN = (Make a JWT token here that can be used to test)
TEST_PASSWORD = 
```

### usage
Go to localhost in your browser or open postman and enter the url: `localhost/api`

main routes:

`/info`

`/studenthome`

`/studenthome/meal`

`/auth`



