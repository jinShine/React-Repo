import FirebaseAdmin from '../firebase_admin';
import { IAuthUser } from '../in_auth_user';

const MEMBER_COLLECTION = 'members';
const SCREEN_NAME_COLLECTION = 'screen_names';

type AddResult = { result: true; id: string } | { result: false; message: string };

async function add({ uid, displayName, email, photoURL }: IAuthUser): Promise<AddResult> {
  try {
    const screenName = (email as string).split('@')[0];

    const addResult = await FirebaseAdmin.getInstance().Firestore.runTransaction(async (transaction) => {
      const memberRef = FirebaseAdmin.getInstance().Firestore.collection(MEMBER_COLLECTION).doc(uid);
      const screenNameRef = FirebaseAdmin.getInstance().Firestore.collection(SCREEN_NAME_COLLECTION).doc(screenName);

      const memberDoc = await transaction.get(memberRef);
      if (memberDoc.exists) {
        // 이미 추가한 상태
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
    if (error instanceof Error) {
      return { result: false, message: error.message };
    }
    return { result: false, message: '서버 에러' };
  }
}

async function findByScreenName(screenName: string): Promise<IAuthUser | null> {
  const memberRef = FirebaseAdmin.getInstance().Firestore.collection(SCREEN_NAME_COLLECTION).doc(screenName);
  const memberDoc = await memberRef.get();

  if (!memberDoc.exists) {
    return null;
  }

  const data = memberDoc.data() as IAuthUser;
  return data;
}

const MemberModel = {
  add,
  findByScreenName,
};

export default MemberModel;
