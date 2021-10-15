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
Object.defineProperty(exports, "__esModule", { value: true });
const survey_dao_1 = require("../daos/survey.dao");
const index_1 = require("../services/index");
class SurveysMiddleware {
    validateRequiredSurveyBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.id && req.body.possibleAnswers) {
                next();
            }
            else {
                res.status(400).send({ error: `Missing required fields question and possible answers` });
            }
        });
    }
    validateSurveyExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield index_1.surveysService.readById(req.params.surveyId);
            if (survey) {
                next();
            }
            else {
                res.status(404).send({ error: `Survey with id ${req.params.surveyId} not found` });
            }
        });
    }
    extractSurveyId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.surveyId;
            next();
        });
    }
    validateAnswerBelongsToSurvey(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { questionId, answer } = req.body;
            const question = survey_dao_1.surveys.find((survey) => survey.id === questionId);
            if (question) {
                const possibleAnswers = question.possibleAnswers;
                const answerExist = possibleAnswers.includes(answer);
                if (answerExist) {
                    next();
                }
                else {
                    res.status(404).send({ error: `Supplied answer does not match any of the expected answers` });
                }
            }
            else {
                res.status(404).send({ error: `Question not found` });
            }
        });
    }
    validateRequiredSurveyAnswerBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.answer) {
                next();
            }
            else {
                res.status(400).send({ error: `Missing required fields` });
            }
        });
    }
}
exports.default = new SurveysMiddleware();
