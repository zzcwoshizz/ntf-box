import { Button, Col, Row, Typography } from 'antd'
import React from 'react'

import { getBanner } from '@/api'
import { IBanner } from '@/api/types'
import Banner from '@/components/Banner'
import Header from '@/components/Header'
import JTSvg from '@/icons/icon_jt.svg'
import useContainer from '@/shared/hooks/useContainer'

const { Title, Text } = Typography

const Hero: React.FunctionComponent = () => {
  const [banners, setBanners] = React.useState<IBanner[]>([])
  const { containerWidth } = useContainer()

  React.useEffect(() => {
    getBanner().then(({ data }) => {
      setBanners(data)
    })
  }, [])

  return (
    <>
      <div className="hero">
        <div className="container">
          <Header />
          <div className="content">
            <Row>
              <Col xs={{ span: 24 }} lg={{ span: 15 }}>
                <div className="text">
                  <Title>Decentralized and heterogeneous asset trading platform</Title>
                  <Text>Secondary title text introduction text introduction text introduction</Text>
                </div>
                <div className="action">
                  <Button type="primary" size="large">
                    BUY NOW
                  </Button>
                  <Button type="link" size="large">
                    Subscribe <JTSvg style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                  </Button>
                </div>
              </Col>
              <Col xs={{ span: 24 }} lg={{ span: 8, offset: 1 }}>
                <img className="desc" src="/imgs/home/desc.png" alt="ntf box" />
              </Col>
            </Row>
            {banners.length > 0 && <Banner banner={banners} />}
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero {
          padding: 52px 52px 0 52px;
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
          margin: 0 auto;
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
            padding: 40px 40px 0 40px;
          }
          .container {
            border-radius: 36px 36px 0 0;
          }
        }

        @media screen and (max-width: 1320px) {
          .hero {
            padding: 40px 20px 0 20px;
          }
        }

        @media screen and (max-width: 1280px) {
          .hero {
            padding: 40px 10px 0 10px;
          }
        }

        @media screen and (max-width: 1200px) {
          .hero {
            padding: 32px 32px 0 32px;
          }
          .container {
            border-radius: 32px 32px 0 0;
          }
        }
        @media screen and (max-width: 992px) {
          .hero {
            padding: 24px 24px 0 24px;
          }
          .container {
            border-radius: 28px 28px 0 0;
          }
        }
        @media screen and (max-width: 768px) {
          .hero {
            padding: 16px 16px 0 16px;
          }
          .container {
            border-radius: 24px 24px 0 0;
          }
        }
      `}</style>
    </>
  )
}

export default Hero
