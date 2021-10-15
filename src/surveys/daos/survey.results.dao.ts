import { SurveyResultsDto } from "../dto/survey.dto";
import { surveysAnswers } from "./survey.answer.dao";
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class SurveysAnswersDao {

    constructor() {
        log('Created new instance of SurveyResultsDao');
    }

    async getAnswersThatBelongToASurvey(surveyId: string) {
        return surveysAnswers.filter(answer => answer.questionId === surveyId)
    }

    async checkIfSurveyHasAnswers(surveyId: string) {
        return surveysAnswers.find((result) => result.questionId === surveyId);
    }

    async getResultsBySurveyId(surveyId: string) {
        const surveyResults: Array<Object> = []

        const surveyHasAnswers = await this.checkIfSurveyHasAnswers(surveyId)

        if (surveyHasAnswers) {
            const answersThatBelongToASurvey = await this.getAnswersThatBelongToASurvey(surveyId);
            answersThatBelongToASurvey.forEach((answer) => {
                surveyResults.push(answer.answer);
            })
            return surveyResults;
        }
        else {
            throw new Error('Survey does not have results');
        }
    }

}

export default new SurveysAnswersDao();