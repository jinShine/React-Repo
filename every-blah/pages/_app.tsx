import '../styles/globals.css';
import type { AppProps /*, AppContext */ } from 'next/app';
import getConfig from 'next/config';

const MyApp = function ({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
};

export default MyApp;
