import ChakraUISetting from '@/src/commons/libraries/chakra';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraUISetting>
        <Component {...pageProps} />
      </ChakraUISetting>
    </RecoilRoot>
  );
}

export default MyApp;
