// models
import Survey from '../../pages/api/models/survey';
import Question from '../../pages/api/models/question';
// types
import { ALLOWED_SURVEY_PATCH_FIELDS, ISurvey } from '../../@types/survey';
// mongoose
const ObjectId = require('mongodb').ObjectId;

export const createSurveyLogic = async (surveyData: ISurvey) => {
  const questionsFromModel = [];
  for (const q of surveyData.questions) {
    const newQuestion = new Question({ ...q });
    questionsFromModel.push(newQuestion);
  }

  surveyData.questions = questionsFromModel;

  const newSurvey = new Survey(surveyData);
  await newSurvey.save();
  return newSurvey;
};

export const updateSurveyLogic = async (
  sid: string,
  survey: ISurvey,
  updatedFields: ISurvey
) => {
  const updatedSurvey = {};
  // Update only allowed fields
  let field: string;
  for (field of ALLOWED_SURVEY_PATCH_FIELDS) {
    if (field in updatedFields) {
      // @ts-ignore
      updatedSurvey[field] = updatedFields[field];
    }
  }

  await Survey.updateOne({ _id: ObjectId(sid) }, { $set: updatedSurvey });
  return updatedSurvey;
};
