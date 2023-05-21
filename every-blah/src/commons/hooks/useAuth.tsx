import { GoogleAuthProvider, User, signInWithPopup } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FirebaseClient from '../libraries/firebase/firebase_client';
import { authUserInfoState } from '../store';

export default function useAuth() {
  const [userInfo, setUserInfo] = useRecoilState(authUserInfoState);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(userInfo !== null);
  }, [userInfo]);

  useEffect(() => {
    const unsubscribe = FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const signInResult = await signInWithPopup(FirebaseClient.getInstance().Auth, provider);
      if (signInResult.user) {
        console.log(signInResult.user);

        const res = await fetch('/api/members/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: signInResult.user.uid,
            email: signInResult.user.email,
            displayName: signInResult.user.displayName,
            photoURL: signInResult.user.photoURL,
          }),
        });

        console.info({ status: res.status });
        const resData = await res.json();
        console.info(resData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    FirebaseClient.getInstance().Auth.signOut().then(clear);
  };

  const clear = () => {
    setUserInfo(null);
    setLoading(false);
  };

  const authStateChanged = async (authState: User | null) => {
    if (authState === null) {
      setUserInfo(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setUserInfo({
      uid: authState.uid,
      email: authState.email,
      displayName: authState.displayName,
      photoURL: authState.photoURL,
    });
    setLoading(false);
  };

  return {
    isLoggedIn,
    userInfo,
    loading,
    signInWithGoogle,
    signOut,
  };
}
