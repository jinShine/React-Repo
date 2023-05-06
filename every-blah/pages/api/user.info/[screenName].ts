import { NextApiRequest, NextApiResponse } from 'next';
import checkSupportMethod from '@/controllers/error/check_support_method';
import handleError from '@/controllers/error/handle_error';
import MemberController from '@/controllers/member.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supportMethod = ['GET'];

  try {
    checkSupportMethod(supportMethod, method);

    await MemberController.findByScreenName(req, res);
  } catch (error) {
    console.error(error);
    // 에러 처리
    handleError(error, res);
  }
}
