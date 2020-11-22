import { MenuOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import useStyle from '@/shared/hooks/useStyle';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import Container from '../Layout/Container';
import ActiveLink from '../Link/ActiveLink';
import Language from './Language';
import MyAccount from './MyAccount';

const Header: React.FunctionComponent = () => {
  const theme = useTheme();
  const style = useStyle();
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
        <Container style={{ margin: '0 auto', padding: '0 12px' }}>
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
              <MyAccount />
              <div className="language" style={{ marginLeft: 12 }}>
                <Language />
              </div>
              <div className="mb-menu" style={{ marginLeft: 12 }}>
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
                  placement={'bottomRight'}
                  trigger={['click']}
                >
                  <MenuOutlined />
                </Dropdown>
              </div>
            </div>
          </div>
        </Container>
      </header>
      <style jsx>{`
        a {
          color: ${theme['@text-color']};
        }
        a.active {
          color: ${theme['@primary-color']};
        }

        header {
          background-color: ${router.pathname === '/' ? 'transparent' : '#fff'};
          box-shadow: ${router.pathname === '/'
            ? 'none'
            : '0px 2px 8px 0px rgba(60, 77, 111, 0.1)'};
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
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
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.lg.endpoint}px) {
          nav a {
            margin-right: 20px;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.md.endpoint}px) {
          .mb-menu {
            display: block !important;
          }
          nav {
            display: none !important;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (max-width: ${style.xs.endpoint}px) {
          .language {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
