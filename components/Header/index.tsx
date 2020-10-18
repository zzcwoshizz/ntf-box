import { DownOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import EnableButton from '@/components/Button/EnableButton'
import CnSvg from '@/icons/icon_cn.svg'
import EnSvg from '@/icons/icon_en.svg'
import useContainer from '@/shared/hooks/useContainer'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { shortenAddress } from '@/utils/string'

import ActiveLink from '../Link/ActiveLink'

const languages = {
  cn: <CnSvg width={32} height={32} />,
  en: <EnSvg width={32} height={32} />
}

const Header: React.FunctionComponent = () => {
  const [lan] = React.useState<'cn' | 'en'>('cn')
  const theme = useTheme()
  const { containerWidth } = useContainer()
  const { t } = useLanguage()

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
    },
    {
      href: '/record',
      title: t('header.record')
    }
  ]

  const router = useRouter()
  const { user, login } = useApp()

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Link href="/account/items">
          <a>{t('header.items')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/account/activity">
          <a>{t('header.activity')}</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link href="/account/items/sell">
          <a>{t('header.sell')}</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/account/items/transfer">
          <a>{t('header.transfer')}</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <Link href="/account/setting">
          <a>{t('header.setting')}</a>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <>
      <header>
        <div className="container">
          <Link href="/">
            <a>
              <img className="logo" src="/imgs/logo.png" alt="logo" />
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
            {user ? (
              <Dropdown overlay={userMenu}>
                <Button type="text">
                  {user.nickName ?? shortenAddress(user.address)} <DownOutlined />
                </Button>
              </Dropdown>
            ) : (
              <EnableButton type="text" onClick={login}>
                {t('header.myAccount')}
              </EnableButton>
            )}
            <div className="language">
              <Dropdown
                placement={'bottomLeft'}
                trigger={['click']}
                overlay={
                  <Menu>
                    <Menu.Item key="1">{languages['en']}</Menu.Item>
                    <Menu.Item key="2">{languages['cn']}</Menu.Item>
                  </Menu>
                }>
                {languages[lan]}
              </Dropdown>
            </div>
            <div className="mb-menu">
              <Dropdown
                placement={'bottomLeft'}
                trigger={['click']}
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
                }>
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
          margin-left: 16px;
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
  )
}

export default Header
