import { Button, Carousel, Col, Divider, Input, Row, Space, Typography } from 'antd'
import React from 'react'

import Img from '@/components/Img'
import PriceSvg from '@/icons/icon_price.svg'
import { AVATAR_URL } from '@/shared/constants'
import useMarket from '@/shared/hooks/useMarket'
import useTheme from '@/shared/hooks/useTheme'

const contentStyle: React.CSSProperties = {
  height: '100%',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79'
}

const { Title } = Typography

const Desc: React.FunctionComponent = () => {
  const theme = useTheme()
  const market = useMarket(
    '0x4eB7c32b63345240b11A42dD3F421bf5Ecfdab1C',
    '0xDE0cD69362be870c53429e6511990741037970b5'
  )

  return (
    <>
      <div className="container">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: 20 }}>
            <Carousel effect="fade">
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{ padding: 20 }}>
            <Title level={3}>William Doutito 2019-20 ‘Super Rare 5/10</Title>
            <Divider />
            <div className="name">
              <Space align="center">
                <Img width={32} src={AVATAR_URL + 'avat'} />
                <b>Alta Roy</b>
                <span>More holders 30+</span>
              </Space>
            </div>
            <div className="intro">
              Only 10 of the cards are available quarterly,Only 10 of the cards are available
              quarterly,Only 10 of the cards are available quarterly
            </div>
            <div className="price">
              <Space align="center">
                <PriceSvg />
                0.32 ETH
              </Space>
            </div>
            <div className="form">
              <Input
                style={{ width: '100%', marginTop: 10 }}
                placeholder="Revise the appropriate price"
              />
              <Button
                style={{ marginTop: 16 }}
                type="primary"
                onClick={() => {
                  market.changePrice('512081857308012544', '0.054321')
                }}>
                MODIFY PRICE
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .container {
          padding: 20px;
          background-color: #fff;
        }

        .name b {
          font-size: 16px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 16px;
        }
        .name span {
          font-size: 12px;
          color: ${theme['@disabled-color']};
          line-height: 12px;
        }

        .intro {
          padding: 8px 16px;
          margin-top: 10px;
          background: ${theme['@body-background']};
          border-radius: 2px;

          font-size: 14px;
          color: ${theme['@disabled-color']};
          line-height: 20px;
        }

        .price {
          margin-top: 30px;

          font-size: 20px;
          font-weight: bold;
          color: ${theme['@primary-color']};
          line-height: 20px;
        }
      `}</style>
    </>
  )
}

export default Desc
