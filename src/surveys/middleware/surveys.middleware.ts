import express from 'express';

import { surveys } from "../daos/survey.dao"

import { surveysService } from '../services/index'


class SurveysMiddleware {

    async validateRequiredSurveyBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.question && req.body.possibleAnswers) {
            next();
        } else {
            res.status(400).send({ error: `Missing required fields question and possible answers` });
        }
    }

    async validateSurveyExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const survey = await surveysService.readById(req.params.surveyId);
        if (survey) {
            next();
        } else {
            res.status(404).send({ error: `Survey with id ${req.params.surveyId} not found`});
        }
    }

    async extractSurveyId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.surveyId;
        next();
    }

    async validateAnswerBelongsToSurvey(req: express.Request, res: express.Response, next: express.NextFunction) {
        const { questionId, answer } = req.body;
        const question = surveys.find((survey: { id: string; }) => survey.id === questionId);

        if (question) {
            const possibleAnswers = question.possibleAnswers
            const answerExist = possibleAnswers.includes(answer)
            if (answerExist) {
                next();
            }
            else {
                res.status(404).send({ error: `Supplied answer does not match any of the expected answers` });
            }
        }else{
            res.status(404).send({ error: `Question not found` });
        }
    }

    async validateRequiredSurveyAnswerBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.answer) {
            next();
        } else {
            res.status(400).send({ error: `Missing required fields` });
        }
    }


}

export default new SurveysMiddleware();