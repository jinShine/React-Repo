import { Box, BoxProps } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import { GlobalNavigationBar } from './global_navigation_bar';

interface ServiceLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const ServiceLayout: React.FC<ServiceLayoutProps & BoxProps> = (props: ServiceLayoutProps & BoxProps) => {
  return (
    <Box {...props}>
      <Head>
        <title>{props.title}</title>
      </Head>
      <GlobalNavigationBar />
      {props.children}
    </Box>
  );
};
