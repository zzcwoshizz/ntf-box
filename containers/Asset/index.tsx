import React from 'react';

import Header from '@/components/Header';
import useContainer from '@/shared/hooks/useContainer';

import Desc from './components/Desc';
import Infos from './components/Infos';
import { DataProvider } from './context';

const Asset: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();

  return (
    <>
      <Header />
      <DataProvider>
        <div className="container">
          <Desc />
          <Infos />
        </div>
      </DataProvider>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
        }
      `}</style>
    </>
  );
};

export default Asset;
