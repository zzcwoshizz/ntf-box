import { Typography } from 'antd';
import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Container from '@/components/Layout/Container';
import Filter from '@/containers/Ranking/components/Filter';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import List from './components/List';
import { DataProvider } from './context';

const { Title } = Typography;

const Ranking: React.FunctionComponent = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <DataProvider>
        <Container style={{ margin: '32px auto' }}>
          <Title level={2} style={{ textIndent: 24 }}>
            {t('ranking.title')}
          </Title>
          <div className="content">
            <Filter />
            <div className="list">
              <List />
            </div>
          </div>
        </Container>
      </DataProvider>
      <style jsx>{`
        .content {
          padding: 24px;
          background-color: #fff;
        }
      `}</style>
      <Footer />
    </>
  );
};

export default Ranking;
