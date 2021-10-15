import express from 'express';
import { surveysService, answersService, resultsService } from '../services/index';
import { success, error } from "../helpers/api.response";



class SurveysController {

    async createSurvey(req: express.Request, res: express.Response) {

        const survey = await surveysService.create(req.body);
        if (survey) {
            return res.status(201)
                .json(success("survey created successfully", { survey }, res.statusCode));
        } else {
            res.status(500).json(error("Something went wrong", res.statusCode));
        }


    }


    async getSurveyById(req: express.Request, res: express.Response) {
        const survey = await surveysService.readById(req.params.surveyId);
        if (survey) {
            return res.status(200)
                .json(success("survey fetched successfully", { survey }, res.statusCode));
        }
        res.status(500).json(error("server error", res.statusCode));
    }


    async listSurveys(req: express.Request, res: express.Response) {

        const surveys = await surveysService.list(100, 0);
        if (surveys) {
            return res.status(200)
                .json(success("surveys fetched successfully", { surveys }, res.statusCode));
        } else {
            res.status(500).json(error("server error", res.statusCode));
        }




    }

    async createSurveyAnswer(req: express.Request, res: express.Response) {

        const answer = await answersService.create(req.body)
        if (answer) {
            return res.status(201)
                .json(success("survey answered successfully", { answer }, res.statusCode));
        } else {
            res.status(500).json(error("server error", res.statusCode));
        }
    }

    async getSurveyResults(req: express.Request, res: express.Response) {

        const results = await resultsService.getResultBySurveyId(req.params.surveyId);
        if (results) {
            return res.status(200)
                .json(success("survey results fetched successfully", { results }, res.statusCode));
        } else {
            res.status(500).json(error("server error", res.statusCode));
        }
    }
}

export default new SurveysController();