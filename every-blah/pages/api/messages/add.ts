import MessageController from '@/src/commons/libraries/firebase/controllers/message_controller';
import checkSupportMethod from '@/src/commons/libraries/firebase/errors/check_support_method';
import handleError from '@/src/commons/libraries/firebase/errors/handle_error';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethods = ['POST'];
  try {
    checkSupportMethod(supportMethods, method);

    await MessageController.post(req, res);
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }
}
