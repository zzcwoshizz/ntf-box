import { Carousel, Col, Divider, Input, Row, Space, Spin, Typography } from 'antd'
import React from 'react'

import EnableButton from '@/components/Button/EnableButton'
import Img from '@/components/Img'
import PriceSvg from '@/icons/icon_price.svg'
import { AVATAR_URL } from '@/shared/constants'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'
import { shortenAddress } from '@/utils/string'

import { useData } from '../context'

const { Title } = Typography

const Desc: React.FunctionComponent = () => {
  const theme = useTheme()
  const { web3 } = useApp()
  const { asset, token, isMine, fetching, holders, loading, changePrice, buy } = useData()
  const [price, setPrice] = React.useState('')

  return (
    <>
      <Spin spinning={fetching}>
        <div className="container">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: 20 }}>
              <Carousel effect="fade">
                {(asset.tokens[0]?.images ?? ['https://error']).map((image, index) => (
                  <div key={index}>
                    <Img width="100%" src={image} />
                  </div>
                ))}
              </Carousel>
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{ padding: 20 }}>
              <Title level={3}>William Doutito 2019-20 ‘Super Rare 5/10</Title>
              <Divider />
              <div className="name">
                <Space align="center">
                  <Img
                    width={32}
                    src={AVATAR_URL + (token.name ?? shortenAddress(token.contractAdd))}
                  />
                  <b>{token.name ?? shortenAddress(token.contractAdd)}</b>
                  <span>Holders {holders}</span>
                </Space>
              </div>
              <div className="intro">
                Only 10 of the cards are available quarterly,Only 10 of the cards are available
                quarterly,Only 10 of the cards are available quarterly
              </div>
              <div className="price">
                <Space align="center">
                  <PriceSvg />
                  {web3.utils.fromWei(asset.dealPrice ?? '0')} ETH
                </Space>
              </div>
              {isMine && (
                <div className="form">
                  <Input
                    style={{ width: '100%', marginTop: 10 }}
                    placeholder="Revise the appropriate price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <EnableButton
                    style={{ marginTop: 16 }}
                    type="primary"
                    loading={loading}
                    onClick={() =>
                      changePrice(price).finally(() => {
                        setPrice('')
                      })
                    }>
                    MODIFY PRICE
                  </EnableButton>
                </div>
              )}
              {!isMine && (
                <div className="form">
                  <EnableButton
                    style={{ marginTop: 16 }}
                    type="primary"
                    loading={loading}
                    onClick={buy}>
                    BUY NOW
                  </EnableButton>
                </div>
              )}
            </Col>
          </Row>
        </div>
      </Spin>
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
