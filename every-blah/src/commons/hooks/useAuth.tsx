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
      }
    } catch (error) {
      console.error(error);
    }

    // signInWithPopup(FirebaseClient.getInstance().Auth, provider)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result);
    //     const token = credential?.accessToken;
    //     const user = result.user;
    //     console.log('########', result);
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     // // The email of the user's account used.
    //     // const email = error.customData.email;
    //     // // The AuthCredential type that was used.
    //     // const credential = GoogleAuthProvider.credentialFromError(error);
    //   });
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
