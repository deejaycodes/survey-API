# Survey API

The task is to build a survey API with the following operations:
 - Create a survey
 - Answer a survey
 - Retrieve the results of a survey

# Get Started

- Clone the repository using git clone https://github.com/deejaycodes/survey-API.git
- Run `npm i` or `npm install` to install all app dependencies
- Make a copy of the sample.env file and rename to .env
- Start the app at the root directory using
  - `npm run start`

## To run the app via docker

```
docker-compose up

```
# Demo

The base endpoint is an health check endpoint that returns a success response.

---
- ### API Security implemented in this task

1. Add a rate limit for requests of 50 requests per 10 minutes using `express-rate-limit`.
2. Secure HTTP headers using `helmet`.
3 . Use `CORS` to make API public.

Note - For a more robust application, more security implementations will be done

---


# Choice of design pattern
I used Typescript and combined it with Data Access Object (DAO) design pattern to implement Single Responsiblity Principle and Data Transfer Object(DTO).
DTOs are objects that conform to data model types, and DAOs are the services that use them.

# Database Implementation
For this coding challenge, no database was used. The data created were all stored in an array and retrieved from the array, which means the data evaporates whenever we quit our Node.js app.I also used shortid package to generate a unique ID for each survey created.
MONGODB and Mongoose ODM will be a good choice for a project like this.
Models will be created as follows : 
 ## Questions Model 
 	- This will define the schema for how questions (surveys) will be stored in the database.
	- It will have a relationship with the Answer Model.
 ## Answers Model
 	- This will define the schema for how answers to each survey question will be stored in the database.
	- It will have a relationship with the Question Model.
	
## Data Creation and Retrieval	
 - This will be implemented using mongoose ORM methods for CRUD processes. The Data Transfer Objects will help to conform strictly to model types
 while Data Access Object will carry out database related transactions just like we have it in repository pattern.

## API

## Please find below a POSTMAN DOCUMENTATION url for the task <a href="https://documenter.getpostman.com/view/17940103/UV5WCHG7">https://documenter.getpostman.com/view/17940103/UV5WCHG7</a>.

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| Base Url    |  / 
| Http Method | POST                                        |
| Path        | /api/surveys                                |
| Http Method | POST                                        |
| Path        | /api/surveys/:surveyId                      |
| Http Method | POST                                        |
| Path        | /api/answer                                 |
| Http Method | GET                                         |
| Path        | /api/results/:surveyId                      |

> These codes are custom to the app and the http status codes are still going to be sent

### Sample Request Parameters
```
 {
	  "id":"a85Ddv6fd",
	  "question" : "What is your favourite color?",
	  "possibleAnswers" : ["black", "yellow", "blue"]
}
```

### Sample Success Response Parameters

```
   {
    "message": "survey created successfully",
    "error": false,
    "code": 201,
    "data": {
        "survey": {
            "id": "slayqNbfj",
            "question": "What is your favourite color?",
            "possibleAnswers": [
                "black",
                "yellow",
                "blue"
            ]
        }
    }
}
```

### Sample Error Response Parameters

```
   {
    "message": "server error",
    "code": 500,
    "error": true
}
```

# Project Structure
(Source folder only)

```
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── Readme.md
├── sample.env
├── src
│   ├── app.ts
│   ├── common
│   │   ├── common.routes.config.ts
│   │   └── interfaces
│   │       ├── crud.interface.ts
│   │       └── results.interface.ts
│   ├── surveys
│   │   ├── constants
│   │   │   └── http-status.ts
│   │   ├── controllers
│   │   │   ├── index.ts
│   │   │   └── surveys.controller.ts
│   │   ├── daos
│   │   │   ├── index.ts
│   │   │   ├── survey.answer.dao.ts
│   │   │   ├── survey.dao.ts
│   │   │   └── survey.results.dao.ts
│   │   ├── dto
│   │   │   ├── create.survey.dto.ts
│   │   │   └── survey.dto.ts
│   │   ├── helpers
│   │   │   ├── api.response.ts
│   │   │   └── logger.ts
│   │   ├── middleware
│   │   │   ├── index.ts
│   │   │   └── surveys.middleware.ts
│   │   ├── routes
│   │   │   └── surveys.routes.config.ts
│   │   └── services
│   │       ├── answers.services.ts
│   │       ├── index.ts
│   │       ├── results.services.ts
│   │       └── surveys.services.ts
│   └── test
│       ├── app.test.ts
│       └── surveys
│           └── surveys.test.ts
└── tsconfig.json
 	
```
# Libraries/Frameworks Used

- Mocha - For running unit tests
- Express - Express. js is a free and open-source web application framework for Node. js.
 It is used for designing and building web applications quickly and easily.
- Nodejs - JavaScript runtime environment for building backend applications.
 

# Areas of improvemnet

I had a lot of fun building this but there are some improvements I can still make:

- More tests, especially  unit tests for the DAOs and Services.
- Implement a suitable backend to for data storage and retrieval
- Include a makefile to ease the execution of some common tasks
- Add users with authentication and authorization

# Testing

- To run the tests, simply run this command `npm test`
- We can also get code coverage by `npm run coverage`

Thank you 👍
