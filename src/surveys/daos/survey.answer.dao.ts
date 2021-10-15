import {SurveyAnswerDto} from "../dto/survey.dto";

import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');
export const surveysAnswers: Array<SurveyAnswerDto> = [];
class SurveysAnswersDao {
   

    constructor() {
        log('Created new instance of SurveyAnswerDao');
    }

    async addSurveyAnswer(answer: SurveyAnswerDto) {
        answer.id = shortid.generate();
        surveysAnswers.push(answer);
        return answer;
    }

    async getSurveyAnswers() {
        return surveysAnswers;
    }

    async getAnswersBySurveyId(surveyId: string) {
        return surveysAnswers.find((survey: { id: string; }) => survey.id === surveyId);
    }
   
}

export default new SurveysAnswersDao();