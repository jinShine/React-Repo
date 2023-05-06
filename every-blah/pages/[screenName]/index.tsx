import styled from '@emotion/styled';
import { Avatar, Button, Image, Input, message, Switch } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { ServiceLayout } from '@/components/layout/service_layout';
import useFirebaseAuth from '@/hooks/use_firebase_auth';
import { IAuthUser } from '@/models/in_auth_user';

// const userInfo = {
//   uid: 'test',
//   email: 'seungjin42@gmail.com',
//   displayName: '버즈',
//   photoURL: 'https://lh3.googleusercontent.com/a/AGNmyxZIT7Wr3Y35got6WpxMIhANSnF8puM0I6djYL90=s96-c',
// };

const { TextArea } = Input;

const UserHomePage: NextPage<Props> = function ({ userInfo }) {
  const [inputMessage, setInputMessage] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  const [isAnonymous, setAnonymous] = useState(true);
  const { isLoggedIn, authUser } = useFirebaseAuth();

  if (userInfo === null) {
    return <p>사용자를 찾을 수 없습니다.</p>;
  }

  return (
    <ServiceLayout title="user home">
      {contextHolder}
      <Wrapper>
        <UserInfoContainer>
          <Image src={userInfo.photoURL} width={50} height={50} />
          <UserInfoContent>
            <p>{userInfo.displayName}</p>
            <p>{userInfo.email}</p>
          </UserInfoContent>
        </UserInfoContainer>
        <UserInputContainer>
          <UserInputHead>
            <Avatar size={30} icon={<UserOutlined />} src={isAnonymous ? '' : authUser?.photoURL} />
            <TextArea
              style={{ backgroundColor: 'lightgray' }}
              placeholder="무엇이 궁금한가요?"
              autoSize={{ maxRows: 7 }}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  const lineCount = (e.currentTarget.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1) + 1;
                  if (lineCount > 7) {
                    messageApi.info('최대 7줄까지만 입력가능합니다.');
                    return;
                  }
                }
                setInputMessage(e.currentTarget.value);
              }}
            />
            <Button disabled={inputMessage.length === 0}>등록</Button>
          </UserInputHead>
        </UserInputContainer>
        <Switch
          checkedChildren="익명"
          unCheckedChildren=""
          checked={isAnonymous}
          onChange={() => {
            if (!isLoggedIn) {
              messageApi.info('로그인이 필요합니다.');
              return;
            }
            setAnonymous((prev) => !prev);
          }}
        />
      </Wrapper>
    </ServiceLayout>
  );
};

interface Props {
  userInfo: IAuthUser | null;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { screenName } = query;

  if (screenName === undefined) {
    return {
      props: {
        userInfo: null,
      },
    };
  }

  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '3000';

    const baseUrl = `${protocol}://${host}:${port}`;

    const userInfoResp = await fetch(`${baseUrl}/api/user.info/${screenName}`).then((data) => data.json());

    console.log('@@@@@@@@@@@', userInfoResp);

    return {
      props: {
        userInfo: userInfoResp,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        userInfo: null,
      },
    };
  }
};

export default UserHomePage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserInfoContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UserInputContainer = styled.div`
  width: 100%;
  border: 1px solid lightgray;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const UserInputHead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
