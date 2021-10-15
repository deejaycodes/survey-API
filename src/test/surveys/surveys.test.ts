import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';



const firstQuestionBody = {
    id: shortid.generate(),
    question: "What is your favourite color",
    possibleAnswers: ["blue", "black", "green", "yellow", "orange"]
};

const requestBodyWithoutQuestion = {
    id: shortid.generate(),
    question: "What is your best pet",
};

const requestBodyWithoutPossibleAnswers = {
    id: shortid.generate(),
    possibleAnswers: ["blue", "black", "green", "yellow", "orange"]
};


let questionId = '';
let correctAnswer = '';


describe('API endpoints', function () {
    let request: supertest.SuperAgentTest;
    before(function () {
        request = supertest.agent(app);
    });
    after(function (done) {
        // shut down the Express.js server, then tell Mocha we're done:
        app.close(() => {
            done();
        });
    });

    it('should allow a POST to /api//surveys', async function () {
        const response = await request.post('/api/surveys').send(firstQuestionBody);
        expect(response.body.code).to.equal(201);
        expect(response.body.data).not.to.be.empty;
        expect(response.body).to.be.an('object');
        expect(response.body.data.survey.possibleAnswers).to.be.an('array');
        expect(response.body.data.survey.id).to.be.a('string');
        questionId = response.body.data.survey.id;

    });

    it('should allow a GET to /api/surveys', async function () {
        const res = await request.get('/api/surveys');
        expect(res.body.code).to.equal(200);
        expect(res.body.data).not.to.be.empty;
        expect(res.body.data.surveys.length).to.be.equal(1);
        expect(res.body).to.be.an('object');
    })

    describe('answer endpoints', function () {
        it('should allow a POST to /api/answer', async function () {
            const answerBody =
            {
                questionId: questionId,
                answer: "black"
            }
            const res = await request
                .post('/api/answer')
                .send(answerBody);
            expect(res.body.code).to.equal(201);
            expect(res.body.data).not.to.be.empty;
            expect(res.body.data.answer).to.be.an('object')
        });

        it('should disallow a POST to /api/answer with an nonexistent questionId', async function () {
            correctAnswer = 'black'
            const res = await request
                .post('/api/answer')
                .send({
                questionId: 'I don\'t exist',
                answer: correctAnswer
                });
                expect(res.body.error).to.equal(
                    'Question not found'
                );
                expect(res.status).to.equal(404);
        });

        it('should disallow a POST to /api/answer with an answer that is not part of the possible answers', async function () {
            const res = await request
                .post(`/api/answer`)
                .send({
                questionId: questionId,
                answer: "wrong answer"
                });
                expect(res.body.error).to.equal(
                    'Supplied answer does not match any of the expected answers'
                );
                expect(res.status).to.equal(404);
        });

       
    });

    describe('results endpoints', function () {
        it('should allow a GET to /api/results/:surveyId with a surveyId', async function () {
            const res = await request.get(`/api/results/${questionId}`);
            expect(res.body.code).to.equal(200);
            expect(res.body.data).not.to.be.empty;
            expect(res.body.data.results[0]).to.be.equal(correctAnswer);
        })

        it('should disallow a GET to /api/results/:surveyId with a wrong surveyId', async function () {
            const wrongSurveyId = '78uuyyyy';
            const res = await request.get(`/api/results/${wrongSurveyId}`);
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal(
                `Survey with id ${wrongSurveyId} not found`
            );
          
        })

    })
    describe('input validation', function () {
        it('should disallow a POST to /api/surveys with a request body without a question', async function () {
        const response = await request.post('/api/surveys').send(requestBodyWithoutQuestion);
        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Missing required fields question and possible answers')
        })
    })

});