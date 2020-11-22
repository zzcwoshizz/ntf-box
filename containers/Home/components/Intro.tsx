import { Col, Row, Typography } from 'antd';
import React from 'react';

import Container from '@/components/Layout/Container';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const { Title, Text } = Typography;

const Intro: React.FunctionComponent = () => {
  const { t } = useLanguage();

  return (
    <>
      <Container style={{ margin: '0 auto', padding: '100px 0' }}>
        <Row>
          <Col lg={{ span: 12 }} style={{ padding: 10 }} xs={{ span: 24 }}>
            <img alt="ntf box" className="desc" src="/imgs/home/intro.png" />
          </Col>
          <Col lg={{ span: 11, offset: 1 }} style={{ padding: 10 }} xs={{ span: 24 }}>
            <Title level={3}>{t('home.intro.title')}</Title>
            <Text type="secondary">
              <span dangerouslySetInnerHTML={{ __html: t('home.intro.desc') }} />
            </Text>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        img {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Intro;
