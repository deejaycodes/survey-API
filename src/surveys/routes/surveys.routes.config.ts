import { CommonRoutesConfig } from '../../common/common.routes.config';
import { surveysController as SurveysController } from '../controllers/index';
import { surveysMiddleware as SurveysMiddleware } from '../middleware/index';

import express from 'express';

export class SurveysRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'SurveysRoutes');
    }

    configureRoutes() {

        //survey question routes
        this.app.route('/api/surveys')
            .get(SurveysController.listSurveys)
            .post(
                SurveysMiddleware.validateRequiredSurveyBodyFields,
                SurveysController.createSurvey);

        this.app.param(`surveyId`, SurveysMiddleware.extractSurveyId);
        this.app.route(`/api/surveys/:surveyId`)
            .all(SurveysMiddleware.validateSurveyExists)
            .get(SurveysController.getSurveyById)

        //survey anwers routes
        this.app.route('/api/answer')
            .post(
                SurveysMiddleware.validateRequiredSurveyAnswerBodyFields,
                SurveysMiddleware.validateAnswerBelongsToSurvey,
                SurveysController.createSurveyAnswer
            )
            
        //get results for a survey
        this.app.route('/api/results/:surveyId')
            .all(SurveysMiddleware.validateSurveyExists)
            .get(SurveysController.getSurveyResults)




        return this.app;
    }
}