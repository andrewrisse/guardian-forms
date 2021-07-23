import { NextApiRequest, NextApiResponse } from 'next';

// Mongoose
import Survey from '../../../models/survey';
import Question from '../../../models/question';
import withAuth from '../../../../../middleware/withAuth';
const ObjectId = require('mongodb').ObjectId;
import connectDb from '../../../../../middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  switch (method) {
    case 'POST':
      await createQuestion(req, res);
      break;
    default:
      res.setHeader('ALLOW', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const createQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-ignore
  const userId = req.user.dodid;
  const { sid } = req.query;
  if (!sid) return res.status(400).send('Missing survey id.');

  const survey = await Survey.findOne({ _id: ObjectId(sid) });

  if (!survey) return res.status(404).send('Survey not found.');

  // User must be the survey owner to create a survey question
  if (survey.ownerId !== userId) return res.status(403).send('Forbidden');

  const question = new Question({
    questionText: req.body.questionText,
    scaleType: req.body.scaleType
  });
  try {
    await Survey.updateOne(
      { _id: ObjectId(sid) },
      { $push: { questions: question } }
    );
    return res.status(201).json(question);
  } catch (err: any) {
    console.error(err);
    return res.status(500).send('Error creating question.');
  }
};

export default connectDb(withAuth(handler));
