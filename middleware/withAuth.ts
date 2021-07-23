import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { decodeJsonWebToken } from '../util/decodeJsonWebToken';

// check each request for a valid bearer token
const withAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (process.env.NODE_ENV === 'development') {
      //@ts-ignore
      req.user = { dodid: '123test' };
    } else {
      // Get token and check if it exists
      if (!req.headers.authorization?.toLocaleLowerCase().startsWith('bearer'))
        return res.status(401).send('Unauthenticated');
      //@ts-ignore
      req.user = decodeJsonWebToken(req.headers.authorization.split(' ')[1]);
    }

    return handler(req, res);
  };
};

export default withAuth;
