# Backend Challenge 2022 - Expense Tracker

## Description

This is a RESTful API developed using NestJS that saves and retrieves data for a web app that tracks your expenses. It also uses MongoDB as database server.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build for production mode
$ npm build

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## General Instructions

In order to successfully start the service, you also need to set the following environment variables. You can modify the following environment variables using the .env file (check out the .env.template)

- MONGODB -> The connection string (URI) to the Mongo Database
- PORT -> The port which the server will listen to

## Documentation

To see how to interact with the endpoints, please reffer to the Swagger documentation that can be found at ```/api```.