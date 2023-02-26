# Week 1 — App Containerization

First run the backend Flask app locally to make sure it also runs when containerized.

For the Cruddur backend to run, some environmental variables should be declared.

```
export FRONTEND_URL="*"
export BACKEND_URL="*"
```

![Backend local](../_docs/assets/week1/backend-local.png)

Next, we'll proceed with containerizing the backend. But first the environmental variables need to be unset.

```
unset FRONTEND_URL
unset BACKEND_URL
```

Create a `Dockerfile` in the backend directory. This gives Docker the set of instructions and steps required in containerizing the application. Below is the content of the Dockerfile.

```
FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]
```


![Backend image](../_docs/assets/week1/backend-image.png)


## Containerize Application (Dockerfiles, Docker Compose)

Run the container afterwards for the backend app based on the following Dockerfile:

```
FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_ENV=development

EXPOSE ${PORT}
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=4567"]
```

![Backend container](../_docs/assets/week1/docker-run-backend.png)

![Backend container](../_docs/assets/week1/backend-dockerized.png)

That's awesome. Now we move on to the frontend of the application and basically run through the same process.

We first run the app locally and then proceed to containerizing it with the following `Dockerfile` script.

```
FROM node:16.18

ENV PORT=3000

COPY . /frontend-react-js
WORKDIR /frontend-react-js
RUN npm install
EXPOSE ${PORT}
CMD ["npm", "start"]
```

![Frontend image](../_docs/assets/week1/frontend-image.png)

![Frontend running](../_docs/assets/week1/frontend-up.png)

## Document the Notification Endpoint for the OpenAI Document
## Write a Flask Backend Endpoint for Notifications.

Next we work on the notification features for both the backend and frontend apps.

![Backend notification](../_docs/assets/week1/backend-notification.png)

## Write a React Page for Notifications

![Frontend notification](../_docs/assets/week1/frontend-notification.png)

## Run PostgreSQL and DynamoDB Local Container.

Note that I had to stop running the backend container before I could run the frontend. To run and orchestrate multiple containers, Docker Compose comes to the rescue.

We'll use Docker compose to run the frontend, backend, DynamoDB, and Postgresql databases. To achieve this, create a file, `docker-compose.yml` in the root directory. The content of the file can be found [here](https://github.com/enyioman/aws-bootcamp-cruddur-2023/blob/main/docker-compose.yml).

Run the command to build the images and run the containers if there are no errors in the YAML file.

```
docker-compose up --build
```

![Docker compose](../_docs/assets/week1/docker-compose.png)

![Docker compose](../_docs/assets/week1/docker-compose2.png)

## Validating the DynamoDB and Postgresql Databases 

To validate access to the databases, we'll create table, put items into them and then query the items.

![DynamoDB Create table](../_docs/assets/week1/dynamodb-create-table.png)

![DynamoDB list table](../_docs/assets/week1/dynamodb-list-table.png)

![DynamoDB put item](../_docs/assets/week1/dynamodb-put-item.png)

![DynamoDB scan table](../_docs/assets/week1/dynamodb-scan-table.png)

![Postgresql up](../_docs/assets/week1/postgres-up.png)




# Homework Challenges

