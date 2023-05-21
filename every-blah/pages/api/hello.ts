import FirebaseAdmin from '@/src/commons/libraries/firebase/firebase_admin';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  FirebaseAdmin.getInstance().Firestore.collection('test');
  res.status(200).json({ name: 'John Doe' });
}
