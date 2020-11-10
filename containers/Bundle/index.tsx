import { Col, Row } from 'antd';
import React from 'react';

import Header from '@/components/Header';
import useContainer from '@/shared/hooks/useContainer';

import BundleList from './components/BundleList';
import Info from './components/Info';
import { DataProvider } from './context';

const Publish: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();

  return (
    <>
      <Header />
      <DataProvider>
        <div className="container">
          <Row>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <Info />
            </Col>
            <Col lg={{ span: 10, offset: 2 }} xs={{ span: 24 }}>
              <BundleList />
            </Col>
          </Row>
        </div>
      </DataProvider>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
          padding: 24px;
        }
      `}</style>
    </>
  );
};

export default Publish;
