import { SurveyDto } from "../dto/survey.dto";
import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

export const surveys: Array<SurveyDto> = [];



class SurveysDao {
   
    constructor() {
        log('Created new instance of SurveysDao');
    }

    async addSurvey(survey: SurveyDto) {
        survey.id = shortid.generate();
        surveys.push(survey);
        return survey;
    }

    async getSurveys() {
        return surveys;
    }

    async getSurveyById(surveyId: string) {
        return surveys.find((survey: { id: string; }) => survey.id === surveyId);
    }


}

export default new SurveysDao();