import { EMPTY_PROFILE_URL } from '@/src/commons/constants';
import useAuth from '@/src/commons/hooks/useAuth';
import { ServiceLayout } from '@/src/components/layouts/service_layout';
import { GoogleLoginButton } from '@/src/components/google_login_button';
import { Box, Center, Flex, Heading, Image } from '@chakra-ui/react';
import { NextPage } from 'next';

const IndexPage: NextPage = () => {
  const { signInWithGoogle } = useAuth();

  const onClickGoogleLogin = () => signInWithGoogle();

  return (
    <ServiceLayout title="test" minH={'100vh'} bgColor={'gray.50'}>
      <Box maxW="md" mx="auto" pt={10}>
        <Image src={EMPTY_PROFILE_URL} alt="메인 로고" />
        <Flex justify={'center'}>
          <Heading>Every Blah</Heading>
        </Flex>
      </Box>
      <Center mt={'20px'}>
        <GoogleLoginButton onClick={onClickGoogleLogin} />
      </Center>
    </ServiceLayout>
  );
};

export default IndexPage;
