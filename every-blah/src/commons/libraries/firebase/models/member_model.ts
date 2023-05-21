import FirebaseAdmin from '../firebase_admin';
import { IAuthUserInfo } from '../types';
import { MEMBER_COLLECTION, SCREEN_NAME_COLLECTION } from './collection';

async function add(props: IAuthUserInfo) {
  const { uid, email, displayName, photoURL } = props;

  try {
    const screenName = (props.email as string).split('@')[0];

    const addResult = await FirebaseAdmin.getInstance().Firestore.runTransaction(async (transaction) => {
      const memberRef = FirebaseAdmin.getInstance().Firestore.collection(MEMBER_COLLECTION).doc(uid);
      const screenNameRef = FirebaseAdmin.getInstance().Firestore.collection(SCREEN_NAME_COLLECTION).doc(screenName);

      const memberDoc = await transaction.get(memberRef);
      if (memberDoc.exists) {
        return false;
      }

      const addData = {
        uid,
        email,
        displayName: displayName ?? '',
        photoURL: photoURL ?? '',
      };

      await transaction.set(memberRef, addData);
      await transaction.set(screenNameRef, addData);

      return true;
    });

    if (addResult === false) {
      return { result: true, id: uid };
    }

    return { result: true, id: uid };
  } catch (error) {
    console.error(error);
    return { result: false, message: '서버 에러' };
  }
}

async function findByScreenName(screenName: string) {
  const memberRef = FirebaseAdmin.getInstance().Firestore.collection(SCREEN_NAME_COLLECTION).doc(screenName);
  const memberDoc = await memberRef.get();
  if (memberDoc.exists === false) {
    return null;
  }

  const data = memberDoc.data() as IAuthUserInfo;

  return data;
}

const MemberModel = {
  add,
  findByScreenName,
};

export default MemberModel;
