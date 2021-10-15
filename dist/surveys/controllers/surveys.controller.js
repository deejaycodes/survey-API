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
const index_1 = require("../services/index");
const api_response_1 = require("../helpers/api.response");
class SurveysController {
    createSurvey(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield index_1.surveysService.create(req.body);
            if (survey) {
                return res.status(201)
                    .json((0, api_response_1.success)("survey created successfully", { survey }, res.statusCode));
            }
            else {
                res.status(500).json((0, api_response_1.error)("Something went wrong", res.statusCode));
            }
        });
    }
    getSurveyById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield index_1.surveysService.readById(req.params.surveyId);
            if (survey) {
                return res.status(200)
                    .json((0, api_response_1.success)("survey fetched successfully", { survey }, res.statusCode));
            }
            res.status(500).json((0, api_response_1.error)("server error", res.statusCode));
        });
    }
    listSurveys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveys = yield index_1.surveysService.list(100, 0);
            if (surveys) {
                return res.status(200)
                    .json((0, api_response_1.success)("surveys fetched successfully", { surveys }, res.statusCode));
            }
            else {
                res.status(500).json((0, api_response_1.error)("server error", res.statusCode));
            }
        });
    }
    createSurveyAnswer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const answer = yield index_1.answersService.create(req.body);
            if (answer) {
                return res.status(201)
                    .json((0, api_response_1.success)("survey answered successfully", { answer }, res.statusCode));
            }
            else {
                res.status(500).json((0, api_response_1.error)("server error", res.statusCode));
            }
        });
    }
    getSurveyResults(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield index_1.resultsService.getResultBySurveyId(req.params.surveyId);
            if (results) {
                return res.status(200)
                    .json((0, api_response_1.success)("survey results fetched successfully", { results }, res.statusCode));
            }
            else {
                res.status(500).json((0, api_response_1.error)("server error", res.statusCode));
            }
        });
    }
}
exports.default = new SurveysController();
