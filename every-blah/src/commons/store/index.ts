import { atom } from 'recoil';
import { IAuthUserInfo } from '../libraries/firebase/types';

export const authUserInfoState = atom<IAuthUserInfo | null>({
  key: 'authUserInfoState',
  default: null,
});
