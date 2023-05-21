import { NextApiResponse } from 'next';
import ServerError from './server_error';

const handleError = (error: unknown, res: NextApiResponse) => {
  let unknownError = error;
  if (error instanceof ServerError === false) {
    unknownError = new ServerError({ statusCode: 499, message: 'uknown error' });
  }

  const serverError = unknownError as ServerError;
  res
    .status(serverError.statusCode)
    .setHeader('location', serverError.location ?? '')
    .send(serverError.serializeErrors());
};

export default handleError;
