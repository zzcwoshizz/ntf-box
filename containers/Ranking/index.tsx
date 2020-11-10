import { Typography } from 'antd';
import React from 'react';

import Header from '@/components/Header';
import Filter from '@/containers/Ranking/components/Filter';
import useContainer from '@/shared/hooks/useContainer';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import List from './components/List';
import { DataProvider } from './context';

const { Title } = Typography;

const Ranking: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <DataProvider>
        <div className="container">
          <Title level={2} style={{ textIndent: 24 }}>
            {t('ranking.title')}
          </Title>
          <div className="content">
            <Filter />
            <div className="list">
              <List />
            </div>
          </div>
        </div>
      </DataProvider>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
        }

        .content {
          padding: 24px;
          background-color: #fff;
        }
      `}</style>
    </>
  );
};

export default Ranking;
