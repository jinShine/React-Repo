import { firestore } from 'firebase-admin';

export interface IAuthUserInfo {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface IMessageBase {
  id: string;
  /** 사용자가 남긴 질문 */
  message: string;
  /** 댓글 */
  reply?: string;
  author?: {
    displayName: string;
    photoURL?: string;
  };
}
export interface IInMessage extends IMessageBase {
  createAt: string;
  replyAt?: string;
}

export interface IInMessageServer extends IMessageBase {
  createAt: firestore.Timestamp;
  replyAt?: firestore.Timestamp;
}
