import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AuthUserState } from '@/store/auth_user_atom';
import FirebaseClient from '@/models/firebase_client';

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useRecoilState(AuthUserState);
  const [loading, setLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(authUser !== null);

  async function signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    try {
      const signInResult = await signInWithPopup(FirebaseClient.getInstance().Auth, provider);
      if (signInResult.user) {
        const res = await fetch('/api/members.add', {
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
  }

  async function signOut(): Promise<void> {
    FirebaseClient.getInstance().Auth.signOut().then(clear);
  }

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
    setIsLoggedIn(false);
  };

  const authStateChanged = async (authState: User | null) => {
    if (authState === null) {
      clear();
      return;
    }

    setLoading(true);
    setAuthUser({
      uid: authState.uid,
      email: authState.email,
      displayName: authState.displayName,
      photoURL: authState.photoURL,
    });
    setIsLoggedIn(true);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = FirebaseClient.getInstance().Auth.onAuthStateChanged(authStateChanged);

    return () => unsubscribe();
  }, []);

  return {
    isLoggedIn,
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  };
}
