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


Run the container afterwards.

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


