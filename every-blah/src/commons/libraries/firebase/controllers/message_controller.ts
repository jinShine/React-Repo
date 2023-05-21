import { NextApiRequest, NextApiResponse } from 'next';
import BadRequestError from '../errors/bad_request_error';
import MessageModel from '../models/message_model';

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { uid, message, author } = req.body;

  if (uid === undefined) {
    throw new BadRequestError('uid가 누락되었습니다.');
  }
  if (message === undefined) {
    throw new BadRequestError('message가 누락되었습니다.');
  }

  await MessageModel.post({ uid, message, author });

  return res.status(201).end();
}

async function list(req: NextApiRequest, res: NextApiResponse) {
  const { uid } = req.query;

  if (uid === undefined) {
    throw new BadRequestError('uid가 누락되었습니다.');
  }

  const uidToString = Array.isArray(uid) ? uid[0] : uid;
  const listRes = await MessageModel.list({ uid: uidToString });

  return res.status(200).json(listRes);
}

const MessageController = {
  post,
  list,
};

export default MessageController;
