import { NextApiRequest, NextApiResponse } from 'next';
import MemberModel from '@/models/member/member.model';
import BadRequest from './error/bad_request';

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { uid, email, displayName, photoURL } = req.body;

  if (uid === undefined || uid === null) {
    throw new BadRequest('uid가 누락되었습니다.');
  }

  if (email === undefined || email === null) {
    throw new BadRequest('email이 누락되었습니다.');
  }

  const addResult = await MemberModel.add({ uid, displayName, email, photoURL });

  if (addResult.result) {
    return res.status(200).json(addResult);
  }

  return res.status(500).json(addResult);
}

async function findByScreenName(req: NextApiRequest, res: NextApiResponse) {
  const { screenName } = req.query;

  if (screenName === undefined || screenName === null) {
    throw new BadRequest('screenName이 누락되었습니다.');
  }

  const extractScreenName = Array.isArray(screenName) ? screenName[0] : screenName;
  const findResult = await MemberModel.findByScreenName(extractScreenName);

  if (findResult === null) {
    return res.status(404).end();
  }

  res.status(200).json(findResult);
}

const MemberController = {
  add,
  findByScreenName,
};

export default MemberController;
