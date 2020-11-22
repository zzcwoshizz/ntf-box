import React from 'react';

import Header from '@/components/Header';
import Container from '@/components/Layout/Container';

import Desc from './components/Desc';
import Infos from './components/Infos';
import { DataProvider } from './context';

const Asset: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <DataProvider>
        <Container style={{ margin: '32px auto' }}>
          <Desc />
          <Infos />
        </Container>
      </DataProvider>
    </>
  );
};

export default Asset;
