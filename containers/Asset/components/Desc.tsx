import { Button, Col, Divider, Input, Modal, Row, Space, Spin, Typography } from 'antd';
import { BigNumber, utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import EnableButton from '@/components/Button/EnableButton';
import Jdenticon from '@/components/Jdenticon';
import BornSvg from '@/icons/icon_born.svg';
import PriceSvg from '@/icons/icon_price.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useApp } from '@/shared/providers/AppProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { shortenAddress } from '@/utils/string';

import { useData } from '../context';
import Images from './Images';

const { Title } = Typography;

const Desc: React.FunctionComponent = () => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLanguage();
  const { balance } = useApp();
  const { asset, token, isMine, fetching, holders, changePrice, cancelOrder, buy } = useData();

  const [price, setPrice] = React.useState('');

  return (
    <>
      <Spin spinning={fetching}>
        <div className="container">
          <Row>
            <Col lg={{ span: 8 }} style={{ padding: 20 }} xs={{ span: 24 }}>
              <Images images={token.images} />
            </Col>
            <Col lg={{ span: 16 }} style={{ padding: 20 }} xs={{ span: 24 }}>
              <span style={{ color: theme['@text-color-tertiary'] }}>{token.projectDO?.name}</span>
              <Title level={3}>{token.name}</Title>
              <Divider style={{ margin: '16px 0' }} />
              <div className="name">
                <Space align="center">
                  <Jdenticon size={32} value={token.contractAdd} />
                  <b>{token.name ?? shortenAddress(token.contractAdd)}</b>
                  <span>
                    {t('asset.detail.holders')} {holders}
                  </span>
                </Space>
              </div>
              {token.type === 'ERC721' && token.owners && (
                <p style={{ marginTop: 15 }}>
                  {t('asset.detail.holders')}:
                  <Link href={`/user/${token.owners[0]}`}>
                    <a>{token.owners[0]}</a>
                  </Link>
                </p>
              )}
              {token.des && <div className="intro">{token.des}</div>}
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
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder={t('asset.detail.inputPrice')}
                      style={{ width: '100%', marginTop: 10 }}
                      value={price}
                    />
                  )}
                  {asset && (
                    <Space>
                      <EnableButton
                        onClick={() =>
                          changePrice(price).finally(() => {
                            setPrice('');
                          })
                        }
                        style={{ marginTop: 16 }}
                        type="primary"
                      >
                        {t('asset.detail.modifyPrice')}
                      </EnableButton>
                      <EnableButton
                        onClick={() => {
                          if (!asset.orderId) {
                            return;
                          }

                          return cancelOrder(asset.orderId);
                        }}
                        style={{ marginTop: 16 }}
                      >
                        {t('asset.detail.cancel')}
                      </EnableButton>
                    </Space>
                  )}
                  {!asset && (
                    <Space style={{ marginTop: 16 }}>
                      <EnableButton
                        onClick={() =>
                          router.push({
                            pathname: '/publish',
                            query: {
                              address: token.contractAdd,
                              tokenId: token.tokenId
                            }
                          })
                        }
                        type="primary"
                      >
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
                          });
                        }}
                      >
                        {t('asset.detail.gift')}
                      </Button>
                    </Space>
                  )}
                </div>
              )}
              {!isMine && asset && (
                <div className="form">
                  <EnableButton
                    onClick={() => {
                      if (BigNumber.from(asset.dealPrice ?? '0').gt(BigNumber.from(balance))) {
                        Modal.warn({
                          title: 'Add funds to complete this transaction',
                          content: `Please deposit ETH ${utils.formatEther(asset.dealPrice ?? '0')}`
                        });
                      } else {
                        buy();
                      }
                    }}
                    style={{ marginTop: 16 }}
                    type="primary"
                  >
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
  );
};

export default Desc;
