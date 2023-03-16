import Head from 'next/head';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const ServiceLayout = function ({ title = 'every-blah', children }: IProps) {
  return (
    <>
      <Head>{title}</Head>
      {children}
    </>
  );
};
