import { NextApiResponse } from 'next';
import CustomServerError from './custom_server_error';

const handleError = (error: unknown, res: NextApiResponse) => {
  if (error instanceof CustomServerError) {
    res
      .status(error.statusCode)
      .setHeader('location', error.location ?? '')
      .send(error.serializeError());
  } else {
    res.status(499).send('unknown error');
  }
};

export default handleError;
