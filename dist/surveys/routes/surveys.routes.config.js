"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveysRoutes = void 0;
const common_routes_config_1 = require("../../common/common.routes.config");
const index_1 = require("../controllers/index");
const index_2 = require("../middleware/index");
class SurveysRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'SurveysRoutes');
    }
    configureRoutes() {
        //survey question routes
        this.app.route(`/surveys`)
            .get(index_1.surveysController.listSurveys)
            .post(index_2.surveysMiddleware.validateRequiredSurveyBodyFields, index_1.surveysController.createSurvey);
        this.app.param(`surveyId`, index_2.surveysMiddleware.extractSurveyId);
        this.app.route(`/surveys/:surveyId`)
            .all(index_2.surveysMiddleware.validateSurveyExists)
            .get(index_1.surveysController.getSurveyById);
        //survey anwers routes
        this.app.route('/answer')
            .post(index_2.surveysMiddleware.validateRequiredSurveyAnswerBodyFields, index_2.surveysMiddleware.validateAnswerBelongsToSurvey, index_1.surveysController.createSurveyAnswer);
        //get results for a survey
        this.app.route('/results/:surveyId')
            .all(index_2.surveysMiddleware.validateSurveyExists)
            .get(index_1.surveysController.getSurveyResults);
        return this.app;
    }
}
exports.SurveysRoutes = SurveysRoutes;
