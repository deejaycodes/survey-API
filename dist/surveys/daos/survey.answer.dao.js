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
exports.surveysAnswers = void 0;
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:in-memory-dao');
exports.surveysAnswers = [];
class SurveysAnswersDao {
    constructor() {
        log('Created new instance of SurveyAnswerDao');
    }
    addSurveyAnswer(answer) {
        return __awaiter(this, void 0, void 0, function* () {
            answer.id = shortid_1.default.generate();
            exports.surveysAnswers.push(answer);
            return answer;
        });
    }
    getSurveyAnswers() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.surveysAnswers;
        });
    }
    getAnswersBySurveyId(surveyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.surveysAnswers.find((survey) => survey.id === surveyId);
        });
    }
}
exports.default = new SurveysAnswersDao();
