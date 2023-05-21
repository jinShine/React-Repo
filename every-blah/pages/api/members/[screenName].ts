import MemberController from '@/src/commons/libraries/firebase/controllers/member_controller';
import checkSupportMethod from '@/src/commons/libraries/firebase/errors/check_support_method';
import handleError from '@/src/commons/libraries/firebase/errors/handle_error';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethods = ['GET'];
  try {
    checkSupportMethod(supportMethods, method);

    await MemberController.findByScreenName(req, res);
  } catch (error) {
    console.error(error);
    handleError(error, res);
  }
}
