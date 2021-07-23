import { NextApiRequest, NextApiResponse } from 'next';
import Survey from '../../../../models/survey';
import connectDb from '../../../../../../middleware/mongodb';
import withAuth from '../../../../../../middleware/withAuth';
import {ALLOWED_QUESTION_PATCH_FIELDS} from "../../../../../../@types/question";
const ObjectId = require('mongodb').ObjectId;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;

  switch (method) {
    case 'DELETE':
      await deleteQuestion(req, res);
      break;
    case 'PATCH':
      await updateQuestion(req, res);
      break;
    default:
      res.setHeader('ALLOW', ['DELETE', 'PATCH']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const deleteQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-ignore
  const userId = req.user.dodid;

  const { sid, qid } = req.query;

  if (!sid) return res.status(400).send('Missing survey id.');
  if (!qid) return res.status(400).send('Missing question id.');

  const survey = await Survey.findOne({ _id: ObjectId(sid) });

  if (!survey) return res.status(404).send('Survey not found.');

  // User must be the survey owner to create a survey question
  if (survey.ownerId !== userId) return res.status(403).send('Forbidden');

  try {
    await Survey.updateOne(
      { _id: ObjectId(sid) },
      { $pull: { questions: { _id: qid } } }
    );
    return res.status(200).send('Question deleted.');
  } catch (err: any) {
    console.error(err);
    return res.status(500).send('Error deleting question.');
  }
};

const updateQuestion = async (req: NextApiRequest, res: NextApiResponse) => {
  //@ts-ignore
  const userId = req.user.dodid;

  const { sid, qid } = req.query;

  if (!sid) return res.status(400).send('Missing survey id.');
  if (!qid) return res.status(400).send('Missing question id.');

  const survey = await Survey.findOne({ _id: ObjectId(sid) });

  if (!survey) return res.status(404).send('Survey not found.');

  // User must be the survey owner to create a survey question
  if (survey.ownerId !== userId) return res.status(403).send('Forbidden');

  const updateFieldsObj = {};
  for (let field of ALLOWED_QUESTION_PATCH_FIELDS) {
    if (req.body[field]) {
      // @ts-ignore
      updateFieldsObj[`questions.$.${field}`] = req.body[field];
    }
  }

  try {
    await Survey.updateOne(
      { _id: ObjectId(sid), 'questions._id': qid },
      {
        $set: updateFieldsObj
      }
    );
    return res.status(200).json('Question updated.');
  } catch (err: any) {
    console.error(err);
    return res.status(500).send('Error updating question.');
  }
};

export default connectDb(withAuth(handler));
