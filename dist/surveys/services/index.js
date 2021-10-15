"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsService = exports.surveysService = exports.answersService = void 0;
const answers_services_1 = __importDefault(require("./answers.services"));
exports.answersService = answers_services_1.default;
const surveys_services_1 = __importDefault(require("./surveys.services"));
exports.surveysService = surveys_services_1.default;
const results_services_1 = __importDefault(require("./results.services"));
exports.resultsService = results_services_1.default;
