import { surveyResultsDao as SurveyResultDao } from '../daos/index';
import { GET_RESULTS } from "../../common/interfaces/results.interface";

class SurveyResults implements GET_RESULTS {

    async getResultBySurveyId(resourceId: string) {
        return SurveyResultDao.getResultsBySurveyId(resourceId);
    };
}

export default new SurveyResults();