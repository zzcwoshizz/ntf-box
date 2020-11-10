import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import useContainer from '@/shared/hooks/useContainer';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import ActiveLink from '../Link/ActiveLink';
import Language from './Language';
import MyAccount from './MyAccount';

const Header: React.FunctionComponent = () => {
  const theme = useTheme();
  const { containerWidth } = useContainer();
  const { t } = useLanguage();

  const navs = [
    {
      href: '/',
      title: t('header.home')
    },
    {
      href: '/ranking',
      title: t('header.ranking')
    },
    {
      href: '/activity',
      title: t('header.activity')
    },
    {
      href: '/market',
      title: t('header.market')
    },
    {
      href: '/help',
      title: t('header.help')
    }
    // {
    //   href: '/record',
    //   title: t('header.record')
    // }
  ];

  const router = useRouter();

  return (
    <>
      <header>
        <div className="container">
          <Link href="/">
            <a>
              <img alt="logo" className="logo" src="/imgs/logo.svg" />
            </a>
          </Link>
          <nav>
            {navs.map((nav, index) => (
              <ActiveLink href={nav.href} key={index}>
                <a>{nav.title}</a>
              </ActiveLink>
            ))}
          </nav>
          <div className="right">
            <Space size="large">
              <MyAccount />
              <div className="language">
                <Language />
              </div>
            </Space>
            <div className="mb-menu">
              <Dropdown
                overlay={
                  <Menu>
                    {navs.map((nav, index) => (
                      <Menu.Item key={index}>
                        <ActiveLink href={nav.href}>
                          <a>{nav.title}</a>
                        </ActiveLink>
                      </Menu.Item>
                    ))}
                  </Menu>
                }
                placement={'bottomLeft'}
                trigger={['click']}
              >
                <MenuOutlined />
              </Dropdown>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        a {
          color: ${theme['@text-color']};
        }
        a.active {
          color: ${theme['@primary-color']};
        }

        header {
          width: 100%;
          background-color: ${router.asPath === '/' ? 'transparent' : '#fff'};
          box-shadow: ${router.asPath === '/' ? 'none' : '0px 2px 8px 0px rgba(60, 77, 111, 0.1)'};
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: ${containerWidth}px;
          height: 64px;
          margin: 0 auto;
        }

        .right {
          display: flex;
          align-items: center;
        }

        nav {
          flex: 1;
          margin: 0 40px;
        }
        nav a {
          margin-right: 40px;
        }
        nav a:nth-last-of-type(1) {
          margin-right: 0;
        }

        .mb-menu {
          display: none;
        }

        @media screen and (max-width: 1200px) {
          nav a {
            margin-right: 20px;
          }
        }
        @media screen and (max-width: 992px) {
          .mb-menu {
            display: block;
          }
          nav {
            display: none;
          }
        }
        @media screen and (max-width: 576px) {
          .language {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
