import type { NextApiRequest, NextApiResponse } from 'next';
import withAuth from '../../../middleware/withAuth';
import connectDb from '../../../middleware/mongodb';

// Mongoose
import Survey from '../models/survey';
import { createSurveyLogic } from '../../../src/businessLogic/survey';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'GET':
      await getAllUsersSurveys(req, res);
      break;
    case 'POST':
      await createSurvey(req, res);
      break;
    default:
      res.setHeader('ALLOW', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

// Gets all a user's surveys
const getAllUsersSurveys = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  //@ts-ignore
  const surveys = await Survey.find({ ownerId: req.user.dodid });

  res.json(surveys);
};

const createSurvey = async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-ignore
  const { dodid } = req.user;
  const { title, description, questions } = req.body;

  if (!title) return res.status(400).send('Missing title');

  const surveyData = {
    public: false,
    ownerId: dodid,
    title,
    description,
    questions
  };

  const newSurvey = await createSurveyLogic(surveyData);

  return res.status(201).json(newSurvey);
};

export default connectDb(withAuth(handler));
