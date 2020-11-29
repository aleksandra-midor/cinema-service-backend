# cinema-service-backend
![backend checks](https://github.com/aleksandra-midor/cinema-service-backend/workflows/backend%20checks/badge.svg)


[Smart Coding](http://www.smartcoding.se/) course exam project for a cinema service.

## Main features:

- cinema network web page with info about movies and shows
- ticket booking service with payment and email confirmation
- multi language support

## Live Version

[live version link](/)

## Github repository

[aleksandra-midor/cinema-service-backend](https://github.com/aleksandra-midor/cinema-service-backend)

## Technologies

### Backend
- node JS
- express 
- mongo DB
- stripe (payment)
- mailJet
- eslint
- mocha, chai, supertest

### Frontend
- react with hooks based on CRA template
- sass
- i18n
- eslint
- stripe (payment)
- cloudinary (images hosting)
- jest, testing-library

### CI and Deployment
- Github actions
- netlify (frontend)
- heroku (backend)

## Local environment setup

### Requirements

- [mongo](https://www.mongodb.com/) database with development and testing collections
- [stripe](https://stripe.com/en-se) free account and its secret api key 
- [mailjet](https://mailjet.com) free account with api key and secret key
- cinema service [frontend repository](https://github.com/aleksandra-midor/cinema-service-frontend) downloaded, installed, and running

### Setup

1. clone the repository 
    ```
    https://github.com/aleksandra-midor/cinema-service-backend.git
    ```
2. install dependencies 
    ```
    npm install
    ```
3. create `.env` and `.env.test` files in the project root directory 
    ```
    DB_CONNECTION=<db-connection-string>
    PORT=<port-number>
    STRIPE_SECRET_KEY=<stripe-key>
    MAILJET_API_KEY=<mailjest-api-key>
    MAILJET_SECRET_KEY=<mailet-secret-key>
    ```
    and replace 

    - `<db-connection-string>` with mongoDB connection string for development DB in `.env` file and mongoDB connection string for testing in DB in `.env.test` file
    - `<stripe-key>` with a secret key from stripe
    - `<mailjest-api-key>` with mailjet api key
    - `<mailjest-secret-key>` with mailjet secret key

4. run `npm run seedDb:Develpoment` to seed the database with movies and cinemas
5. run `npm run dev` to start developing in watch mode or `npm start` to run the backend service

## Avaliable scripts

### `npm run dev`
Runs application in development watch mode

### `npm start`
Runs application

### `npm test`
Launches the test runner

### `npm run seedDb:Development`
Seeds development DB

### `npm run seedDb:Test`
Seeds test DB

### `npm run lint`
Runs code lint check

## About the author:

Aleksandra Midor

website: [aleksandramidor.com](http://aleksandramidor.com/)

mail: [ola_midor@outlook.com](mailto:ola_midor@outlook.com)
