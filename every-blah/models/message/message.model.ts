import { firestore } from 'firebase-admin';
import CustomServerError from '@/controllers/error/custom_server_error';
import FirebaseAdmin from '../firebase_admin';

const MEMBER_COLLECTION = 'members';
const MESSGAGE_COLLECTION = 'messages';
const SCREEN_NAME_COLLECTION = 'screen_names';

const { Firestore } = FirebaseAdmin.getInstance();

async function post({
  uid,
  message,
  author,
}: {
  uid: string;
  message: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
}) {
  const memeberRef = Firestore.collection(MEMBER_COLLECTION).doc(uid);

  await Firestore.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memeberRef);
    if (memberDoc.exists === false) {
      throw new CustomServerError({ statusCode: 400, message: '존재하지 않는 사용자입니다.' });
    }
    const newMessageRef = memeberRef.collection(MESSGAGE_COLLECTION).doc();
    const newMessageBody: {
      message: string;
      createAt: firestore.FieldValue;
      author?: {
        displayName: string;
        photoURL?: string;
      };
    } = {
      message,
      createAt: firestore.FieldValue.serverTimestamp(),
    };

    if (author !== undefined) {
      newMessageBody.author = author;
    }

    await transaction.set(newMessageRef, newMessageBody);
  });
}

const MessageModel = {
  post,
};

export default MessageModel;
