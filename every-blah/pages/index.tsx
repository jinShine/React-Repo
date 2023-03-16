import { NextPage } from 'next';
import styled from '@emotion/styled';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ServiceLayout } from '@/components/service_layout';
import { GoogleLoginButton } from '@/components/google_login_button';
import FirebaseClient from '@/models/firebase_client';

const provider = new GoogleAuthProvider();

const IndexPage: NextPage = function () {
  const onClickGoogleLogin = () => {
    signInWithPopup(FirebaseClient.getInstance().Auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <ServiceLayout title="test">
      <Wrapper>
        <img src="/vercel.svg" alt="메인 로고" />
        <div># 애블</div>
      </Wrapper>
      <GoogleLoginButton onClick={onClickGoogleLogin} />
    </ServiceLayout>
  );
};

export default IndexPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;
