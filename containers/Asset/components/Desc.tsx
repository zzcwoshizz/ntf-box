import { Button, Col, Divider, Input, Row, Space, Spin, Typography } from 'antd'
import { utils } from 'ethers'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

import EnableButton from '@/components/Button/EnableButton'
import Img from '@/components/Img'
import BornSvg from '@/icons/icon_born.svg'
import PriceSvg from '@/icons/icon_price.svg'
import useTheme from '@/shared/hooks/useTheme'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { generateAvatar } from '@/utils'
import { shortenAddress } from '@/utils/string'

import { useData } from '../context'
import Images from './Images'

const { Title } = Typography

const Desc: React.FunctionComponent = () => {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useLanguage()
  const { asset, token, isMine, fetching, holders, loading, changePrice, buy } = useData()
  const [price, setPrice] = React.useState('')

  return (
    <>
      <Spin spinning={fetching}>
        <div className="container">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: 20 }}>
              <Images images={token.images} />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{ padding: 20 }}>
              <span style={{ color: theme['@text-color-tertiary'] }}>{token.projectDO?.name}</span>
              <Title level={3}>{token.name}</Title>
              <Divider style={{ margin: '16px 0' }} />
              <div className="name">
                <Space align="center">
                  <Img width={32} src={generateAvatar(token.name ?? token.contractAdd)} />
                  <b>{token.name ?? shortenAddress(token.contractAdd)}</b>
                  <span>
                    {t('asset.detail.holders')} {holders}
                  </span>
                </Space>
              </div>
              <div className="intro">{token.des}</div>
              {asset && (
                <div className="price">
                  <Space align="center">
                    <PriceSvg />
                    {utils.formatEther(asset.dealPrice ?? '0')} ETH
                  </Space>
                </div>
              )}
              {isMine && (
                <div className="form">
                  {asset && (
                    <Input
                      style={{ width: '100%', marginTop: 10 }}
                      placeholder={t('asset.detail.inputPrice')}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  )}
                  {asset && (
                    <EnableButton
                      style={{ marginTop: 16 }}
                      type="primary"
                      loading={loading}
                      onClick={() =>
                        changePrice(price).finally(() => {
                          setPrice('')
                        })
                      }>
                      {t('asset.detail.modifyPrice')}
                    </EnableButton>
                  )}
                  {!asset && (
                    <Space style={{ marginTop: 16 }}>
                      <EnableButton
                        type="primary"
                        loading={loading}
                        onClick={() =>
                          router.push({
                            pathname: '/publish',
                            query: {
                              address: token.contractAdd,
                              tokenId: token.tokenId
                            }
                          })
                        }>
                        {t('asset.detail.sell')}
                      </EnableButton>
                      <Button
                        onClick={() => {
                          router.push({
                            pathname: '/transfer',
                            query: {
                              address: token.contractAdd,
                              tokenId: token.tokenId
                            }
                          })
                        }}>
                        {t('asset.detail.gift')}
                      </Button>
                    </Space>
                  )}
                </div>
              )}
              {!isMine && (
                <div className="form">
                  <EnableButton
                    style={{ marginTop: 16 }}
                    type="primary"
                    loading={loading}
                    onClick={buy}>
                    {t('asset.detail.buy')}
                  </EnableButton>
                </div>
              )}
              <div className="birth">
                <Space>
                  <BornSvg />
                  {t('asset.detail.born', {
                    time: moment(token.birth).format('YYYY/MM/DD HH:mm:ss')
                  })}
                </Space>
              </div>
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

        .birth {
          margin-top: 16px;
          font-size: 12px;
          color: ${theme['@text-color-tertiary']};
          line-height: 12px;
        }
      `}</style>
    </>
  )
}

export default Desc
