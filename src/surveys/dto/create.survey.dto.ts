export interface CreateSurveyDto {
    id: string;
    question: string;
    possibleAnswers: string[];
    createdAt: Date
    updatedAt: Date
}