import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  onClick: () => void;
}

export const GoogleLoginButton = (props: GoogleLoginButtonProps) => {
  return (
    <Button
      size={'lg'}
      maxW={'md'}
      borderRadius={'full'}
      bgColor={'#4285f4'}
      color={'white'}
      colorScheme="blue"
      leftIcon={<FcGoogle style={{ backgroundColor: 'white', borderRadius: '10px', padding: '2px' }} />}
      onClick={props.onClick}
    >
      구글 계정으로 시작하기
    </Button>
  );
};
