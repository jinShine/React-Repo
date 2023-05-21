import { EMPTY_PROFILE_URL } from '@/src/commons/constants';
import useAuth from '@/src/commons/hooks/useAuth';
import { IAuthUserInfo, IInMessage } from '@/src/commons/libraries/firebase/types';
import { ServiceLayout } from '@/src/components/layouts/service_layout';
import MessageItem from '@/src/components/message/message_item';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Switch,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { userInfo } from 'os';
import { ChangeEvent, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface UserHomePageProps {
  fetchUserInfo: IAuthUserInfo | null;
}

interface IMessageInfo {
  uid: string;
  message: string;
  author?: IAuthorInfo | null;
}

interface IAuthorInfo {
  displayName: string;
  photoURL?: string;
}

const UserHomePage: NextPage<UserHomePageProps> = ({ fetchUserInfo }: UserHomePageProps) => {
  const toast = useToast();
  const { isLoggedIn, userInfo } = useAuth();
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);

  const [messageList, setMessageList] = useState<IInMessage[]>([]);

  const fetchMessageList = async (uid: string) => {
    try {
      const res = await fetch(`/api/messages/list?uid=${uid}`);
      if (res.status === 200) {
        const data = await res.json();
        setMessageList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (fetchUserInfo == null) {
      return;
    }

    fetchMessageList(fetchUserInfo.uid);
  }, [fetchUserInfo]);

  if (fetchUserInfo === null) {
    return <Text>사용자를 찾을 수 없습니다.</Text>;
  }

  const isOwner = fetchUserInfo !== null && fetchUserInfo.uid === userInfo?.uid;

  const onChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;

    if (value) {
      const lineCount = value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1;
      if (lineCount >= 7) {
        toast({
          title: '최대 7줄까지만 입력가능합니다.',
          position: 'top-right',
        });

        return;
      }
    }

    setMessage(value);
  };

  const onChangeAnonymousSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isLoggedIn) {
      toast({ title: '로그인이 필요합니다.', position: 'top-right' });
      return;
    }

    setIsAnonymous((prev) => !prev);
  };

  const onClickPostMessage = async ({ uid, message, author }: IMessageInfo) => {
    if (message.length <= 0) {
      return {
        result: false,
        message: '메시지를 입력해주세요',
      };
    }
    try {
      await fetch('/api/messages/add', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, message, author }),
      });

      setMessage('');
    } catch (error) {
      console.error(error);
      toast({ title: '메시지 등록 실패', position: 'top-right' });
    }
  };

  return (
    <ServiceLayout title={`${fetchUserInfo?.displayName}의 홈`} minH={'100vh'} bgColor={'gray.50'}>
      <Box maxW={'md'} mx={'auto'} pt={6}>
        <Box borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'} mb={'2'} bg={'white'}>
          <Flex p={'6'}>
            <Avatar size={'lg'} src={fetchUserInfo?.photoURL ?? EMPTY_PROFILE_URL} mr={'2'}></Avatar>
            <Flex direction={'column'} justify={'center'}>
              <Text fontSize={'md'}>{fetchUserInfo?.displayName}</Text>
              <Text fontSize={'xs'}>{fetchUserInfo?.email}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth={'1px'} borderRadius={'lg'} overflow={'hidden'} mb={'2'} bg={'white'}>
          <Flex align={'center'} p={2}>
            <Avatar
              size={'xs'}
              src={isAnonymous ? EMPTY_PROFILE_URL : fetchUserInfo?.photoURL ?? EMPTY_PROFILE_URL}
              mr={'2'}
            />
            <Textarea
              as={TextareaAutosize}
              bg={'gray.100'}
              border={'none'}
              resize={'none'}
              minH={'unset'}
              minRows={1}
              maxRows={7}
              fontSize={'xs'}
              mr={'2'}
              placeholder="무엇이 궁금한가요?"
              value={message}
              onChange={onChangeMessage}
            />
            <Button
              bgColor={'yellow.300'}
              colorScheme="yellow"
              color={'white'}
              variant={'solid'}
              size={'sm'}
              isDisabled={message.length === 0}
              onClick={() => {
                const postData: IMessageInfo = {
                  uid: fetchUserInfo.uid,
                  message,
                  author: null,
                };
                if (!isAnonymous) {
                  postData.author = {
                    photoURL: fetchUserInfo.photoURL ?? EMPTY_PROFILE_URL,
                    displayName: fetchUserInfo.displayName ?? 'anonymous',
                  };
                }
                onClickPostMessage(postData);
              }}
            >
              등록
            </Button>
          </Flex>
          <FormControl display={'flex'} alignItems={'center'} mt={1} mx={2}>
            <Switch
              id="anonymous"
              size={'sm'}
              colorScheme={'orange'}
              mr={1}
              isChecked={isAnonymous}
              onChange={onChangeAnonymousSwitch}
            />
            <FormLabel htmlFor="anonymous" mb={0} fontSize={'xx-small'}>
              익명
            </FormLabel>
          </FormControl>
        </Box>
        <VStack spacing={'12px'} mt={6}>
          {messageList.map((item) => (
            <MessageItem
              key={item.id}
              uid={fetchUserInfo.uid}
              photoURL={item.author?.photoURL ?? EMPTY_PROFILE_URL}
              item={item}
              displayName={fetchUserInfo.displayName ?? ''}
              isOwner={isOwner}
            />
          ))}
        </VStack>
      </Box>
    </ServiceLayout>
  );
};

export const getServerSideProps: GetServerSideProps<UserHomePageProps> = async ({ query }) => {
  const { screenName } = query;

  if (screenName === undefined || screenName === null) {
    return {
      props: {
        fetchUserInfo: null,
      },
    };
  }

  try {
    const protocol = process.env.PROTOCOL || 'http';
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || '3000';
    const baseURL = `${protocol}://${host}:${port}`;
    const userInfoResult: AxiosResponse<IAuthUserInfo> = await axios(`${baseURL}/api/members/${screenName}`);

    return {
      props: {
        fetchUserInfo: userInfoResult.data ?? null,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        fetchUserInfo: null,
      },
    };
  }
};

export default UserHomePage;
