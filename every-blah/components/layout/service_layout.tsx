import Head from 'next/head';
import { GlobalNavigationBar } from './global_navigation_bar';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const ServiceLayout = function ({ title = 'every-blah', children }: IProps) {
  return (
    <>
      <Head>{title}</Head>
      <GlobalNavigationBar />
      {children}
    </>
  );
};
