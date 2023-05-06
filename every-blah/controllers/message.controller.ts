import { NextApiRequest, NextApiResponse } from 'next';
import BadRequest from './error/bad_request';
import MessageModel from '@/models/message/message.model';

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { uid, message, author } = req.body;
  if (uid === undefined) {
    throw new BadRequest('uid 누락');
  }
  if (message === undefined) {
    throw new BadRequest('message 누락');
  }

  await MessageModel.post({ uid, message, author });
  return res.status(201).end();
}

const MessageController = {
  post,
};

export default MessageController;
