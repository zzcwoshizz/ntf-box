import { Col, Row, Typography } from 'antd';
import React from 'react';

import useContainer from '@/shared/hooks/useContainer';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const { Title, Text } = Typography;

const Intro: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();
  const { t } = useLanguage();

  return (
    <>
      <div className="intro">
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
      </div>
      <style jsx>{`
        .intro {
          width: ${containerWidth}px;
          margin: 0 auto;
          padding: 100px 0;
        }

        img {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Intro;
