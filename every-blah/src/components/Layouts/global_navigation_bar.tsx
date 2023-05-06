import useAuth from '@/src/commons/hooks/useAuth';
import { Box, Button, HStack, SimpleGrid, Spacer, Text } from '@chakra-ui/react';

export const GlobalNavigationBar = () => {
  const { isLoggedIn, loading, userInfo, signInWithGoogle, signOut } = useAuth();

  const loginButton = (
    <Button
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'purple.400'}
      _hover={{ bg: 'puple.100' }}
      onClick={signInWithGoogle}
    >
      로그인
    </Button>
  );

  const logoutButton = (
    <Button as="a" fontWeight={400} variant={'link'} color={'blackAlpha.500'} onClick={signOut}>
      로그아웃
    </Button>
  );

  return (
    <Box borderBottom={1} borderStyle={'solid'} borderColor={'gray.200'} bg={'white'}>
      <SimpleGrid columns={3} mx={'auto'} maxW={'md'} minH={'60px'} alignItems={'center'} px={'3'}>
        <Spacer />
        <HStack justify={'center'}>
          <Text>Every Blah</Text>
        </HStack>

        <HStack justify={'flex-end'}>{isLoggedIn ? logoutButton : loginButton}</HStack>
      </SimpleGrid>
    </Box>
  );
};
