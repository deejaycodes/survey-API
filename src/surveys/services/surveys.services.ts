import { surveyDao as SurveysDao } from '../daos/index';
import { CRUD_OPERATIONS } from "../../common/interfaces/crud.interface";
import { SurveyDto } from "../dto/survey.dto";

class SurveysService implements CRUD_OPERATIONS {

    async create(resource: SurveyDto) {

        return SurveysDao.addSurvey(resource);
    }

    async list(limit: number, page: number) {
        return SurveysDao.getSurveys();
    };
    
   //check should it be a string or a number
    async readById(resourceId: string) {
        return SurveysDao.getSurveyById(resourceId);
    };
}

export default new SurveysService();