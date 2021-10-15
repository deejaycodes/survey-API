import { surveyAnswerDao as SurveyAnswerDao } from '../daos/index';
import { CRUD_OPERATIONS } from "../../common/interfaces/crud.interface";
import { SurveyAnswerDto } from "../dto/survey.dto";

class SurveysAnswers implements CRUD_OPERATIONS {


    async create(resource: SurveyAnswerDto) {
        return SurveyAnswerDao.addSurveyAnswer(resource);
    }

    async list(limit: number, page: number) {
        return SurveyAnswerDao.getSurveyAnswers()
    };

    async readById(resourceId: string) {
        return SurveyAnswerDao.getAnswersBySurveyId(resourceId);
    };
}

export default new SurveysAnswers();