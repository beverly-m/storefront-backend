# Storefront Backend API
###### Nicole Moyo (Facilitated by Udacity - Fullstack Javascript Developer Certification)

The API allows access to endpoints that facilitate CRUD operations for a storefront e.g. user and product creation and viewing of a user's current active orders. A PostgreSQL database stores the data fetched by the API.

*To view available endpoints, navigate to the REQUIREMENTS.md file*

## Getting Started

*Database Port: 5432* <br />
*Application Port: 3000*

#### Create and populate the .env file 
Enter the following environment variables

```
ENV=dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
BCRYPT_PASSWORD=think-different
SALT_ROUNDS=10
TOKEN_SECRET=sufficient-grace
```

#### Database Setup

1. Connect to PostgreSQL via the terminal
###### Credentials
  - ###### username: postgres 
  - ###### password: root

```
psql -U postgres
```

2. Enter the password for user: 

![SF1](https://user-images.githubusercontent.com/71017261/214968377-4177d171-251d-4829-9d71-481d23d23e89.jpg)

3. Create the database for development
###### Database Credentials
- ###### database_name: storefront_dev
- ###### password: root
```
CREATE DATABASE storefront_dev;
```

3. Create the database for testing
###### Database Credentials
- ###### database_name: storefront_test
- ###### password: root
```
CREATE DATABASE storefront_test;
```

#### Install required packages
In another terminal, within the storefront-backend folder run the following:

```
npm install
```

##### Create tables for the storefront_dev database using migration files
Still within the storefront-backend folder run the following:

```
db-migrate up
```

## Start the application server

#### Run server (src/server.ts) with nodemon
```
npm run start
```
This runs the script nodemon src/server.ts
**See package.json for definition of all scripts*

OR

```
npm run watch
```

## Build application
```
npm run build
```
This will create a dist folder Typescript files compiled to Javascript

## Test application 

#### Run Jasmine tests

```
npm run test 
```

#### Run prettier to check for inconsistencies in formatting

```
npm run prettier 
```

#### Run eslint for linting

```
npm run lint
```
