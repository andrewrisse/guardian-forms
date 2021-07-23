import type { NextApiRequest, NextApiResponse } from 'next';
import withAuth from '../../../../middleware/withAuth';

// Mongoose
const ObjectId = require('mongodb').ObjectId;
import Survey from '../../models/survey';
import connectDB from '../../../../middleware/mongodb';
import { updateSurveyLogic } from '../../../../src/businessLogic/survey';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET':
      await getSurvey(req, res);
      break;
    case 'PATCH':
      await updateSurvey(req, res);
      break;
    case 'DELETE':
      await deleteSurvey(req, res);
      break;
    default:
      res.setHeader('ALLOW', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const getSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sid } = req.query;
  //@ts-ignore
  const userId = req.user.dodid;

  if (!sid) return res.status(400).send('Missing survey id');

  const survey = await Survey.findOne({ _id: ObjectId(sid) });

  if (!survey) return res.status(404).send('Survey not found.');

  // Survey must be public or the user must be the survey owner to get the survey
  if (!survey.public && survey.ownerId !== userId)
    return res.status(403).send('Forbidden');

  return res.status(200).json(survey);
};

const updateSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sid } = req.query;
  const updatedFields = req.body;
  //@ts-ignore
  const userId = req.user.dodid;

  if (!sid) return res.status(400).send('Missing survey id');
  if (!updatedFields) return res.status(400).send('Missing fields to update');

  // Get survey data
  const survey = await Survey.findOne({ _id: ObjectId(sid) });

  if (!survey) return res.status(404).send('Survey not found.');

  if (survey && survey.ownerId !== userId)
    // User must be the survey owner to update the survey
    return res.status(403).send('Forbidden');

  try {

    const updatedSurvey = await updateSurveyLogic(sid as string, survey, updatedFields);
    return res.status(200).json(updatedSurvey);
  } catch (err: any) {
    return res.status(500).send('Error updating survey.');
  }
};

const deleteSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sid } = req.query;
  //@ts-ignore
  const userId = req.user.dodid;

  if (!sid) return res.status(400).send('Missing survey id');

  const survey = await Survey.findOne({ _id: ObjectId(sid) });

  if (survey) {
    //Check user is the owner of this survey before deleting
    const ownerId = survey.ownerId;
    if (ownerId !== userId) return res.status(403).send('Forbidden');

    try {
      await Survey.deleteOne({ _id: ObjectId(sid) });
      return res.status(200).send('Survey deleted');
    } catch (err: any) {
      console.error(err);
      return res.status(500).send('Error deleting survey.');
    }
  } else {
    res.status(404).send('Survey not found');
  }
};

export default connectDB(withAuth(handler));
