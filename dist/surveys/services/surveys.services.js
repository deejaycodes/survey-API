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
const index_1 = require("../daos/index");
class SurveysService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.surveyDao.addSurvey(resource);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.surveyDao.getSurveys();
        });
    }
    ;
    //check should it be a string or a number
    readById(resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return index_1.surveyDao.getSurveyById(resourceId);
        });
    }
    ;
}
exports.default = new SurveysService();
