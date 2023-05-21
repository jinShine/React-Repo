import { firestore } from 'firebase-admin';
import ServerError from '../errors/server_error';
import FirebaseAdmin from '../firebase_admin';
import { MEMBER_COLLECTION, MESSAGE_COLLECTION } from './collection';
import { IInMessage, IInMessageServer } from '../types';

interface IMessageInfo {
  uid: string;
  message: string;
  author?: IAuthorInfo;
}

interface IAuthorInfo {
  displayName: string;
  photoURL?: string;
}

const { Firestore } = FirebaseAdmin.getInstance();

async function post(props: IMessageInfo) {
  const memberRef = Firestore.collection(MEMBER_COLLECTION).doc(props.uid);
  await Firestore.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (memberDoc.exists === false) {
      throw new ServerError({ statusCode: 400, message: '존재하지 않는 사용자입니다.' });
    }

    const newMessageRef = memberRef.collection(MESSAGE_COLLECTION).doc();
    const newMessageBody: {
      message: string;
      createAt: firestore.FieldValue;
      author?: IAuthorInfo;
    } = {
      message: props.message,
      createAt: firestore.FieldValue.serverTimestamp(),
    };
    if (props.author === undefined) {
      newMessageBody.author = props.author;
    }

    await transaction.set(newMessageRef, newMessageBody);
  });
}

async function list({ uid }: { uid: string }) {
  const memberRef = Firestore.collection(MEMBER_COLLECTION).doc(uid);
  const listData = await Firestore.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (memberDoc.exists === false) {
      throw new ServerError({ statusCode: 400, message: '존재하지 않는 사용자입니다.' });
    }

    const messageCollection = memberRef.collection(MESSAGE_COLLECTION);
    const messageCollectionDoc = await transaction.get(messageCollection);
    const data = messageCollectionDoc.docs.map((value) => {
      const docData = value.data() as Omit<IInMessageServer, 'id'>;
      const returnData = {
        ...docData,
        id: value.id,
        createAt: docData.createAt.toDate().toISOString(),
        replyAt: docData.replyAt ? docData.replyAt.toDate().toISOString() : undefined,
      } as IInMessage;

      return returnData;
    });

    return data;
  });

  return listData;
}

const MessageModel = {
  post,
  list,
};

export default MessageModel;
