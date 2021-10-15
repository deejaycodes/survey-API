# App Test

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

## API

There are multiple endpoints that can be used to retrieve records. Please find below a POSTMAN documentation url is <a href="https://documenter.getpostman.com/view/7667873/UUxxhUPR">https://documenter.getpostman.com/view/7667873/UUxxhUPR</a>.

| Parameter   | Description                                 |
| ----------- | ------------------------------------------- |
| Base Url    |  / 
| Http Method | POST                                        |
| Path        | /surveys                                    |
| Http Method | POST                                        |
| Path        | /surveys/:surveyId                          |
| Http Method | POST                                        |
| Path        | /answer                                     |
| Http Method | GET                                         |
| Path        | /results/:surveyId                          |

> These codes are custom to the app and the http status codes are still going to be sent

### Sample Request Parameters
```
 {
	  "id":"a85Ddv6fd",
	  "question" : "What is your name",
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
            "question": "What is your name",
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

![file structure](https://i.ibb.co/KVyzY5C/structure.png)

# Libraries Used

- Mocha - For running unit tests
- Express - Express. js is a free and open-source web application framework for Node. js.
 It is used for designing and building web applications quickly and easily.

# Todo

I had a lot of fun building this but there are some improvements I can still make:

- More tests, especially  unit tests for all other  and integration using super test.
- Add a dependency injection library like awilix to handle injection of dependencies
- Include a makefile to ease the execution of some common tasks

# Testing

- To run the tests, simply run this command `npm test`
- We can also get code coverage by `npm run coverage`

Thank you 👍
