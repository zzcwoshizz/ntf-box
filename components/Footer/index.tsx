import { Col, Row, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'

import Discord from '@/icons/discord.svg'
import Mail from '@/icons/mail.svg'
import Reddit from '@/icons/reddit.svg'
import Telegram from '@/icons/telegram.svg'
import Twitter from '@/icons/twitter.svg'
import useContainer from '@/shared/hooks/useContainer'
import useTheme from '@/shared/hooks/useTheme'

const { Title } = Typography

const Footer: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const theme = useTheme()

  const linkSpan = {
    xs: { span: 12 },
    md: { span: 8 },
    lg: { span: 4 }
  }

  const styles = { padding: '12px 0' }

  return (
    <>
      <footer>
        <div className="content">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} style={styles}>
              <img src="/imgs/logo.png" alt="ntf box" />
            </Col>
            <Col {...linkSpan} style={styles}>
              <Title level={5}>About us</Title>
              <li>
                <Link href="/">
                  <a target="_blank" rel="noopener noreferrer">
                    My belongings
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a target="_blank" rel="noopener noreferrer">
                    My record
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a target="_blank" rel="noopener noreferrer">
                    Transfer of goods
                  </a>
                </Link>
              </li>
            </Col>
            <Col {...linkSpan} style={styles}>
              <Title level={5}>Learn more</Title>
              <li>
                <Link href="/">
                  <a target="_blank" rel="noopener noreferrer">
                    Network wide record
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a target="_blank" rel="noopener noreferrer">
                    Help center
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a target="_blank" rel="noopener noreferrer">
                    Ranking List
                  </a>
                </Link>
              </li>
            </Col>
            <Col xs={{ span: 18 }} lg={{ span: 4 }} md={8} style={styles}>
              <div className="medias">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Reddit />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Telegram />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  <Discord />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer">
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
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        }

        .medias {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

export default Footer
