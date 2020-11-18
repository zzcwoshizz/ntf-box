import { Col, Popover, Row, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';

import Discord from '@/icons/discord.svg';
import Mail from '@/icons/mail.svg';
import Medium from '@/icons/medium.svg';
import Reddit from '@/icons/reddit.svg';
import Telegram from '@/icons/telegram.svg';
import Twitter from '@/icons/twitter.svg';
import Wechat from '@/icons/wechat.svg';
import useContainer from '@/shared/hooks/useContainer';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { hex2rgba } from '@/utils/color';

const { Title } = Typography;

const Footer: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();
  const { t } = useLanguage();

  const linkSpan = {
    xs: { span: 12 },
    md: { span: 8 },
    lg: { span: 4 }
  };

  const styles = { padding: '12px 0' };

  return (
    <>
      <footer>
        <div className="content">
          <Row>
            <Col lg={{ span: 8 }} style={styles} xs={{ span: 24 }}>
              <img alt="ntf box" src="/imgs/logo_bottom.svg" />
            </Col>
            <Col {...linkSpan} style={styles}>
              <Title level={5}>{t('footer.aboutUs')}</Title>
              <li>
                <Link href="/account/items">
                  <a>{t('footer.myItems')}</a>
                </Link>
              </li>
              <li>
                <Link href="/account/activity">
                  <a>{t('footer.myActivity')}</a>
                </Link>
              </li>
              <li>
                <Link href="/account/items/transfer">
                  <a>{t('footer.gift')}</a>
                </Link>
              </li>
              <li>
                <Link href="/account/setting">
                  <a>{t('footer.setting')}</a>
                </Link>
              </li>
            </Col>
            <Col {...linkSpan} style={styles}>
              <Title level={5}>{t('footer.market')}</Title>
              <li>
                <Link href="/market">
                  <a>{t('footer.market')}</a>
                </Link>
              </li>
              <li>
                <Link href="/ranking">
                  <a>{t('footer.ranking')}</a>
                </Link>
              </li>
              <li>
                <Link href="/activity">
                  <a>{t('footer.activity')}</a>
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: '/market',
                    query: {
                      itemOrder: 4
                    }
                  }}
                >
                  <a>{t('footer.hot')}</a>
                </Link>
              </li>
            </Col>
            <Col {...linkSpan} style={styles}>
              <Title level={5}>{t('footer.service')}</Title>
              <li>
                <Link href="/help">
                  <a>{t('footer.help')}</a>
                </Link>
              </li>
              <li>
                <a href="https://medium.com/@finannel" rel="noopener noreferrer" target="_blank">
                  {t('footer.blog')}
                </a>
              </li>
              {/* <li>
                <Link href="/account/setting">
                  <a>{t('footer.subscribe')}</a>
                </Link>
              </li> */}
            </Col>
            <Col lg={{ span: 4 }} md={8} style={styles} xs={{ span: 18 }}>
              <div className="medias">
                {/* <a
                  href="https://www.reddit.com/search/?q=finannel"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Reddit />
                </a> */}
                <a href="https://t.me/finannel" rel="noopener noreferrer" target="_blank">
                  <Telegram />
                </a>
                <a href="https://twitter.com/finannel" rel="noopener noreferrer" target="_blank">
                  <Twitter />
                </a>
                <a href="https://discord.gg/ZjsXWDSz" rel="noopener noreferrer" target="_blank">
                  <Discord />
                </a>
                <a href="mailto:business@finannel.com" rel="noopener noreferrer" target="_blank">
                  <Mail />
                </a>
                <a href="https://medium.com/@finannel" rel="noopener noreferrer" target="_blank">
                  <Medium />
                </a>
                <Popover content={<img alt="wechat" src="/imgs/wechat.jpg" />} title={null}>
                  <a>
                    <Wechat />
                  </a>
                </Popover>
              </div>
            </Col>
          </Row>
        </div>
      </footer>
      <style jsx>{`
        footer {
          padding: 60px 0;
          background-color: #001d42;
        }

        .content {
          width: ${containerWidth}px;
          margin: 0 auto;
        }

        .content :global(.ant-typography) {
          color: #fff;
        }

        li {
          list-style: none;
        }

        a {
          color: ${hex2rgba('#fff', 0.5)};
          font-size: 12px;
        }

        .medias {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default Footer;
