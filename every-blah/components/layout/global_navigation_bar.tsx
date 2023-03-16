import styled from '@emotion/styled';
import useFirebaseAuth from '@/hooks/use_firebase_auth';

export const GlobalNavigationBar = function () {
  const { isLoggedIn, loading, signInWithGoogle, signOut } = useFirebaseAuth();

  return (
    <Wrapper>
      <div />
      <div>
        <img src="/vercel.svg" style={{ height: '40px', width: '40px' }} alt="logo" />
      </div>
      <div>
        <button type="button" onClick={isLoggedIn ? signOut : signInWithGoogle}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
  max-width: 768px;
`;
