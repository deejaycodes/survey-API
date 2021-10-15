export interface SurveyDto {
    id: string;
    question: string;
    possibleAnswers: string[];
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export interface SurveyAnswerDto {
    id: string;
    questionId: string;
    answer: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export interface SurveyResultsDto {
    questionId: string;
    results: SurveyAnswerDto[];
    resultObject : {}
}