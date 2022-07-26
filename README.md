# Full Stack Challenge 2022 - Expense Tracker

## Description

This web app tracks and categorizes your expenses, and sets alarms to your budget categories. It doesn't use any authorization method for endpoints. However, you can create users and login without tokens.

## Try it Live!

Base URL: https://av-expense-tracker.herokuapp.com/

Documentation URL: https://av-expense-tracker.herokuapp.com/api

It might take a while for the service to answer on the first time.

## Technologies Used

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
- [TypeScript](https://www.typescriptlang.org/) / [JavaScript](https://www.javascript.com/)
- [Jest](https://jestjs.io)
- [Heroku](https://www.heroku.com)

## Installation

Please check out the README files in frontend and backend folders.

## File structure
    .
    ├── backend                     # folder for the NestJS API
    |    ├──────src                 # NestJS source code
    |    |      ├──────categories   # controller, service and dtos for categories 
    |    |      ├──────expenses     # controller, service and dtos for expenses
    |    |      ├──────schemas      # mongoose schemas for services
    |    |      ├──────users        # controller, service and dtos for users
    |    |      └──────app.module   # main module for controllers and services
    |    ├──────test                # stubs for the unit tests
    |    ├──────.env.template       # example for env variables in .env file
    |    ├──────docker-compose.prod # configuration for deployment with docker
    |    ├──────Dockerfile          # configuration for the docker creation
    |    ├──────package.json        # configuration and dependencies for NestJS
    |    └──────README.md           # instructions for the backend
    ├── frontend                    # folder for the React web app
    |    ├──────public              # public files for web app
    |    ├──────src                 # React source code
    |    |      ├──────api          # axios connection functions 
    |    |      ├──────categories   # categories components and their unit tests
    |    |      ├──────expenses     # expenses components and their unit tests
    |    |      ├──────home         # monthlyreports component
    |    |      ├──────users        # users components and their unit tests
    |    |      └──────App.tsx      # react-router-dom configuration
    |    ├──────package.json        # configuration and dependencies for React
    |    └── README.md              # instructions for the frontend
    └── README.md                   # general instructions for the project

## Docker Instructions

Go to the frontend folder and execute the following commands to build the app:

```bash
# install dependencies
$ npm install

# build for production
$ npm run build
```

Copy all the files inside frontend/build folder to backend/public.

Go to the backend folder.

You need to pass the following environment variables to a new .env file (check out .env.template):

- MONGODB -> The connection string (URI) to the Mongo Database
- PORT -> The port you want the server listen to

```bash
# generate the container
$ docker-compose -f docker-compose.prod.yaml up --build

# run the container if it's already created
$ docker-compose -f docker-compose.prod.yaml up -d
```

The container will start with the service running and listening to the port, if successfully started.