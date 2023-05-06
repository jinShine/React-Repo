import { NextApiRequest, NextApiResponse } from 'next';
import checkSupportMethod from '@/controllers/error/check_support_method';
import handleError from '@/controllers/error/handle_error';
import MessageController from '@/controllers/message.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['POST'];

  try {
    checkSupportMethod(supportMethod, method);

    await MessageController.post(req, res);
  } catch (error) {
    console.error(error);
    // 에러 처리
    handleError(error, res);
  }
}
