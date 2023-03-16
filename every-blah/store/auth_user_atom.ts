/* eslint-disable @typescript-eslint/no-empty-function */
import { atom } from 'recoil';
import { IAuthUser } from '@/models/in_auth_user';

export const AuthUserState = atom<IAuthUser | null>({
  key: 'AuthUserState',
  default: {
    uid: '',
    email: null,
    displayName: null,
    photoURL: null,
  },
});
