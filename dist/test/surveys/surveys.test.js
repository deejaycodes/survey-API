"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const shortid_1 = __importDefault(require("shortid"));
const firstQuestionBody = {
    id: shortid_1.default.generate(),
    question: "What is your favourite color",
    possibleAnswers: ["blue", "black", "green", "yellow", "orange"]
};
const requestBodyWithoutQuestion = {
    id: shortid_1.default.generate(),
    question: "What is your best pet",
};
const requestBodyWithoutPossibleAnswers = {
    id: shortid_1.default.generate(),
    possibleAnswers: ["blue", "black", "green", "yellow", "orange"]
};
let questionId = '';
let correctAnswer = '';
describe('API endpoints', function () {
    let request;
    before(function () {
        request = supertest_1.default.agent(app_1.default);
    });
    after(function (done) {
        // shut down the Express.js server, then tell Mocha we're done:
        app_1.default.close(() => {
            done();
        });
    });
    it('should allow a POST to /api/surveys', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield request.post('/api/surveys').send(firstQuestionBody);
            (0, chai_1.expect)(response.body.code).to.equal(201);
            (0, chai_1.expect)(response.body.data).not.to.be.empty;
            (0, chai_1.expect)(response.body).to.be.an('object');
            (0, chai_1.expect)(response.body.data.survey.possibleAnswers).to.be.an('array');
            (0, chai_1.expect)(response.body.data.survey.id).to.be.a('string');
            questionId = response.body.data.survey.id;
        });
    });
    it('should allow a GET to /api/surveys', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.get('/api/surveys');
            (0, chai_1.expect)(res.body.code).to.equal(200);
            (0, chai_1.expect)(res.body.data).not.to.be.empty;
            (0, chai_1.expect)(res.body.data.surveys.length).to.be.equal(1);
            (0, chai_1.expect)(res.body).to.be.an('object');
        });
    });
    describe('answer endpoints', function () {
        it('should allow a POST to /api/answer', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const answerBody = {
                    questionId: questionId,
                    answer: "black"
                };
                const res = yield request
                    .post('/api/answer')
                    .send(answerBody);
                (0, chai_1.expect)(res.body.code).to.equal(201);
                (0, chai_1.expect)(res.body.data).not.to.be.empty;
                (0, chai_1.expect)(res.body.data.answer).to.be.an('object');
            });
        });
        it('should disallow a POST to /api/answer with an nonexistent questionId', function () {
            return __awaiter(this, void 0, void 0, function* () {
                correctAnswer = 'black';
                const res = yield request
                    .post('/api/answer')
                    .send({
                    questionId: 'I don\'t exist',
                    answer: correctAnswer
                });
                (0, chai_1.expect)(res.body.error).to.equal('Question not found');
                (0, chai_1.expect)(res.status).to.equal(404);
            });
        });
        it('should disallow a POST to /api/answer with an answer that is not part of the possible answers', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .post(`/api/answer`)
                    .send({
                    questionId: questionId,
                    answer: "wrong answer"
                });
                (0, chai_1.expect)(res.body.error).to.equal('Supplied answer does not match any of the expected answers');
                (0, chai_1.expect)(res.status).to.equal(404);
            });
        });
    });
    describe('results endpoints', function () {
        it('should allow a GET to /api/results/:surveyId with a surveyId', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request.get(`/api/results/${questionId}`);
                (0, chai_1.expect)(res.body.status).to.equal(200);
                (0, chai_1.expect)(res.body.data).not.to.be.empty;
                (0, chai_1.expect)(res.body.data.results[0]).to.be.equal(correctAnswer);
            });
        });
        // it('should disallow a GET to /api/results/:surveyId with a wrong surveyId', async function () {
        //     const wrongSurveyId = '78uuyyyy';
        //     const res = await request.get(`/api/results/${wrongSurveyId}`);
        //     // expect(res.status).to.equal(404);
        //     expect(res.body.error).to.equal(
        //         `Survey with id ${wrongSurveyId} not found`
        //     );
        // })
    });
    describe('input validation', function () {
        it('should disallow a POST to /api/surveys with a request body without a question', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield request.post('/api/surveys').send(requestBodyWithoutQuestion);
                (0, chai_1.expect)(response.status).to.equal(400);
                (0, chai_1.expect)(response.body.error).to.equal('Missing required fields question and possible answers');
            });
        });
    });
});
