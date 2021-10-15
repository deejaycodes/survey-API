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
const survey_answer_dao_1 = require("./survey.answer.dao");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:in-memory-dao');
class SurveysAnswersDao {
    constructor() {
        log('Created new instance of SurveyResultsDao');
    }
    getAnswersThatBelongToASurvey(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return survey_answer_dao_1.surveysAnswers.filter(answer => answer.questionId === surveyId);
        });
    }
    checkIfSurveyHasAnswers(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return survey_answer_dao_1.surveysAnswers.find((result) => result.questionId === surveyId);
        });
    }
    getResultsBySurveyId(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveyResults = [];
            const surveyHasAnswers = yield this.checkIfSurveyHasAnswers(surveyId);
            if (surveyHasAnswers) {
                const answersThatBelongToASurvey = yield this.getAnswersThatBelongToASurvey(surveyId);
                answersThatBelongToASurvey.forEach((answer) => {
                    surveyResults.push(answer.answer);
                });
                return surveyResults;
            }
            else {
                return 'Survey does not have results';
            }
        });
    }
}
exports.default = new SurveysAnswersDao();
