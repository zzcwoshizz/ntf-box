import { Button, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { getBanner } from '@/api';
import { IBanner } from '@/api/types';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Container from '@/components/Layout/Container';
import Toolbar from '@/components/Toolbar';
import useStyle from '@/shared/hooks/useStyle';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const { Title, Text } = Typography;

const Hero: React.FunctionComponent = () => {
  const router = useRouter();
  const style = useStyle();
  const [banners, setBanners] = React.useState<IBanner[]>([]);
  const { t } = useLanguage();

  React.useEffect(() => {
    getBanner().then(({ data }) => {
      setBanners(data);
    });
  }, []);

  return (
    <>
      <div className="hero">
        <Toolbar />
        <Container
          style={{
            margin: '0 auto',
            borderRadius: '40px 40px 0 0',
            background: 'url(/imgs/commingsoon/banner_bg.png) no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Header />
          <div className="container">
            <Row style={{ marginTop: 40 }}>
              <Col lg={{ span: 15 }} xs={{ span: 24 }}>
                <div className="text">
                  <Title>{t('home.title')}</Title>
                  <Text>{t('home.desc')}</Text>
                </div>
                <div className="action">
                  <Button onClick={() => router.push('/market')} size="large" type="primary">
                    {t('home.buyNow')}
                  </Button>
                  {/* <Button onClick={() => router.push('/account/setting')} size="large" type="link">
                    {t('home.subscribe')}{' '}
                    <JTSvg style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                  </Button> */}
                </div>
              </Col>
              <Col lg={{ span: 8, offset: 1 }} xs={{ span: 24 }}>
                <img alt="ntf box" className="desc" src="/imgs/home/desc.png" />
              </Col>
            </Row>
            {banners.length > 0 && <Banner banner={banners} />}
          </div>
        </Container>
      </div>
      <style jsx>{`
        .hero {
          background-color: #001d42;
        }

        img.desc {
          width: 100%;
        }

        .text {
          margin-top: 20px;
        }
        .action {
          margin-top: 40px;
        }
      `}</style>

      <style jsx>{`
        @media screen and (max-width: ${style.xxl.endpoint}px) {
          .container {
            padding: 0 40px;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.xl.endpoint}px) {
          .container {
            padding: 0 32px;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.lg.endpoint}px) {
          .container {
            padding: 0 24px;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.md.endpoint}px) {
          .container {
            padding: 0 16px;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.sm.endpoint}px) {
          .container {
            padding: 0 16px;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.xs.endpoint}px) {
          .container {
            padding: 0 8px;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
