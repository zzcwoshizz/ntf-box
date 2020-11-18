import { Button, Col, Row, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { getBanner } from '@/api';
import { IBanner } from '@/api/types';
import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Toolbar from '@/components/Toolbar';
import JTSvg from '@/icons/icon_jt.svg';
import useContainer from '@/shared/hooks/useContainer';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const { Title, Text } = Typography;

const Hero: React.FunctionComponent = () => {
  const router = useRouter();
  const [banners, setBanners] = React.useState<IBanner[]>([]);
  const { containerWidth } = useContainer();
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
        <div className="container">
          <Header />
          <div className="content">
            <Row>
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
        </div>
      </div>
      <style jsx>{`
        .hero {
          padding: 0 52px;
          background-color: #001d42;
        }

        .container {
          border-radius: 40px 40px 0 0;
          background: url(/imgs/commingsoon/banner_bg.png) no-repeat;
          background-size: cover;
          background-position: center;
        }

        .content {
          width: ${containerWidth}px;
          margin: 40px auto 0 auto;
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

        @media screen and (max-width: 1600px) {
          .hero {
            padding: 0 40px;
          }
          .container {
            border-radius: 36px 36px 0 0;
          }
        }

        @media screen and (max-width: 1320px) {
          .hero {
            padding: 0 20px;
          }
        }

        @media screen and (max-width: 1280px) {
          .hero {
            padding: 0 10px;
          }
        }

        @media screen and (max-width: 1200px) {
          .hero {
            padding: 0 32px;
          }
          .container {
            border-radius: 32px 32px 0 0;
          }
        }
        @media screen and (max-width: 992px) {
          .hero {
            padding: 0 24px;
          }
          .container {
            border-radius: 28px 28px 0 0;
          }
        }
        @media screen and (max-width: 768px) {
          .hero {
            padding: 0 16px;
          }
          .container {
            border-radius: 24px 24px 0 0;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;
