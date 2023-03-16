import styled from '@emotion/styled';
import { GoogleAuthProvider } from 'firebase/auth';
import { NextPage } from 'next';
import { GoogleLoginButton } from '@/components/google_login_button';
import { ServiceLayout } from '@/components/layout/service_layout';
import useFirebaseAuth from '@/hooks/use_firebase_auth';

const IndexPage: NextPage = function () {
  const { signInWithGoogle } = useFirebaseAuth();

  return (
    <ServiceLayout title="test">
      <Wrapper>
        <img src="/vercel.svg" alt="메인 로고" />
        <div># 애블</div>
      </Wrapper>
      <GoogleLoginButton onClick={signInWithGoogle} />
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
