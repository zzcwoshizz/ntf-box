import { Col, Row, Typography } from 'antd';
import Link from 'next/link';
import React from 'react';

import Discord from '@/icons/discord.svg';
import Mail from '@/icons/mail.svg';
import Reddit from '@/icons/reddit.svg';
import Telegram from '@/icons/telegram.svg';
import Twitter from '@/icons/twitter.svg';
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
            <Col lg={{ span: 12 }} style={styles} xs={{ span: 24 }}>
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
                <Link href="/account/items">
                  <a>{t('footer.gift')}</a>
                </Link>
              </li>
            </Col>
            <Col {...linkSpan} style={styles}>
              <Title level={5}>{t('footer.learnMore')}</Title>
              <li>
                <Link href="/activity">
                  <a>{t('footer.activity')}</a>
                </Link>
              </li>
              <li>
                <Link href="/help">
                  <a>{t('footer.helpCenter')}</a>
                </Link>
              </li>
              <li>
                <Link href="/ranking">
                  <a>{t('footer.ranking')}</a>
                </Link>
              </li>
            </Col>
            <Col lg={{ span: 4 }} md={8} style={styles} xs={{ span: 18 }}>
              <div className="medias">
                <a
                  href="https://www.reddit.com/search/?q=finannel"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Reddit />
                </a>
                <a href="https://t.me/finannel" rel="noopener noreferrer" target="_blank">
                  <Telegram />
                </a>
                <a href="https://twitter.com/finannel" rel="noopener noreferrer" target="_blank">
                  <Twitter />
                </a>
                <a href="https://discord.gg/b3jxVgsY" rel="noopener noreferrer" target="_blank">
                  <Discord />
                </a>
                <a href="mailto:service@finannel.com" rel="noopener noreferrer" target="_blank">
                  <Mail />
                </a>
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
