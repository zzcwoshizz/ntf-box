import DiscordIcon from '@icons/dapp_discord_white.svg'
import TelegramIcon from '@icons/dapp_telegram_white.svg'
import TwitterIcon from '@icons/dapp_twitter_white.svg'
import { Input, message, Typography } from 'antd'
import React from 'react'

import { subscribe } from '@/api'
import { IBanner } from '@/api/types'
import Banner from '@/components/Banner'
import theme from '@/styles/antd-custom.json'

const { Search } = Input
const { Text, Title } = Typography

type Props = {
  banner: IBanner[]
}

const CommingSoon: React.FunctionComponent<Props> = (props) => {
  const [loading, setLoading] = React.useState(false)

  return (
    <>
      <div className="container">
        <div className="head">
          <img src="/imgs/logo.png" alt="logo" />
        </div>
        <div className="content">
          <Title>NFTBOX是全球优质非同质化资产交易平台</Title>
          <p>
            <Text type="secondary">集中了全球2000余种NFT项目，包括艺术、游戏、卡牌等项目</Text>
          </p>
          <Search
            enterButton="订阅"
            placeholder="输入您的邮箱账号"
            loading={loading}
            onSearch={(email) => {
              setLoading(true)
              subscribe(email).finally(() => {
                setLoading(false)
                message.success('Success')
              })
            }}
          />
          <div className="icon-wrapper">
            <a>
              <DiscordIcon />
            </a>
            <a>
              <TwitterIcon />
            </a>
            <a>
              <TelegramIcon />
            </a>
          </div>
        </div>
        <div>
          <Banner banner={props.banner} />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          padding-bottom: 150px;
          border-radius: 40px 40px 0 0;
          background: url(/imgs/commingsoon/banner_bg.png) no-repeat;
          background-size: cover;
          background-position: center;
        }

        @media screen and (max-width: 980px) {
          .container {
            padding-bottom: 100px;
          }
        }

        @media screen and (max-width: 736px) {
          .container {
            padding-bottom: 70px;
          }
        }

        @media screen and (max-width: 480px) {
          .container {
            padding-bottom: 20px;
          }
        }

        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 66%;
          height: 64px;
          margin: 0 auto;
        }

        .content {
          width: 860px;
          margin: 0 auto;
          text-align: center;
        }

        @media screen and (max-width: 980px) {
          .content {
            width: 480px;
          }
        }

        @media screen and (max-width: 736px) {
          .content {
            width: 400px;
          }
        }

        @media screen and (max-width: 480px) {
          .content {
            width: 280px;
          }
        }

        .content :global(.ant-input-group-wrapper) {
          width: 70%;
          margin-top: 40px;
        }

        @media screen and (max-width: 480px) {
          .content :global(.ant-input-group-wrapper) {
            width: 70%;
            margin-top: 20px;
          }
        }

        .icon-wrapper {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }

        @media screen and (max-width: 480px) {
          .icon-wrapper {
            margin-top: 20px;
          }
        }
        .icon-wrapper a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          margin: 0 12px;
          border-radius: 16px;
          background: ${theme['@primary-color']};
          opacity: 0.6;
        }
      `}</style>
      <style jsx global>{`
        body {
          height: 100vh;
          padding: 52px 52px 0 52px;
          background: url(/imgs/commingsoon/bg.png) no-repeat;
          background-size: cover;
          background-position: center;
        }

        @media screen and (max-width: 980px) {
          body {
            padding: 40px 40px 0 40px;
          }
        }

        @media screen and (max-width: 736px) {
          body {
            padding: 28px 28px 0 28px;
          }
        }

        @media screen and (max-width: 480px) {
          body {
            padding: 20px 20px 0 20px;
          }
        }
        #__next {
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default CommingSoon
