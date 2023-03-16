import type { AppProps /*, AppContext */ } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

const MyApp = function ({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
