import { Col, Row } from 'antd';
import React from 'react';

import Header from '@/components/Header';
import Container from '@/components/Layout/Container';

import BundleList from './components/BundleList';
import Info from './components/Info';
import { DataProvider } from './context';

const Publish: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <DataProvider>
        <Container style={{ margin: '32px auto', padding: 24 }}>
          <Row>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Info />
            </Col>
            <Col lg={{ span: 10, offset: 2 }} xs={{ span: 24 }}>
              <BundleList />
            </Col>
          </Row>
        </Container>
      </DataProvider>
    </>
  );
};

export default Publish;
