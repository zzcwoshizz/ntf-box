import { Button, Divider, Input, Modal, Space, Typography } from 'antd';
import { BigNumber, utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { IAsset, IOffer, IToken } from '@/api/types';
import EnableButton from '@/components/Button/EnableButton';
import ERC20ApproveButton from '@/components/Button/ERC20ApproveButton';
import Jdenticon from '@/components/Jdenticon';
import TimeLeft from '@/components/TimeLeft';
import Tip_WETH from '@/components/Tip/Tip_WETH';
import BornSvg from '@/icons/icon_born.svg';
import PriceSvg from '@/icons/icon_price.svg';
import { APPROVE_ADDRESS, WETH_ADDRESS } from '@/shared/constants';
import { useActiveWeb3React } from '@/shared/hooks';
import useTheme from '@/shared/hooks/useTheme';
import { useApp } from '@/shared/providers/AppProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { shortenAddress, shortenAddressLast } from '@/utils/string';

const { Title } = Typography;

interface Props {
  token: IToken;
  offers: IOffer[];
  holders: number;
  asset?: IAsset;
  isMine: boolean;
  maxOfferPrice: string;
  changePrice(price: string): Promise<void>;
  cancelOrder(orderId: string): Promise<void>;
  offer(orderId: string, price: string): Promise<void>;
  buy(): Promise<void>;
}

const OrderDesc: React.FunctionComponent<Props> = ({
  token,
  offers,
  holders,
  asset,
  isMine,
  maxOfferPrice,
  changePrice,
  cancelOrder,
  offer,
  buy
}) => {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useLanguage();
  const { balance, wethBalance } = useApp();
  const { chainId } = useActiveWeb3React();

  const [price, setPrice] = React.useState('');
  const [offerPrice, setOfferPrice] = React.useState<string>();

  const maxOffer: IOffer | undefined = offers[0];

  return (
    <>
      <span style={{ color: theme['@text-color-tertiary'] }}>{token.projectDO?.name}</span>
      <Title level={3}>{token.name}</Title>
      <Divider style={{ margin: '16px 0' }} />
      <div className="name">
        <Space align="center">
          <Jdenticon size={32} value={token.contractAdd} />
          <b>{token.name ?? shortenAddress(token.contractAdd)}</b>
          {token.type === 'ERC1155' && (
            <span>
              {t('asset.detail.holders')} {holders}
            </span>
          )}
        </Space>
      </div>
      {token.type === 'ERC721' && token.owners && (
        <p style={{ marginTop: 15 }}>
          {t('asset.detail.holders')}:
          <Link href={`/user/${token.owners[0]}/items`}>
            <a>{token.owners[0]}</a>
          </Link>
        </p>
      )}
      {token.des && <div className="intro">{token.des}</div>}
      {/* 直接挂单出售 */}
      {asset && asset.orderType === 0 && (
        <div className="price">
          <Space align="center">
            <PriceSvg />
            {utils.formatEther(asset.dealPrice || '0')} ETH
          </Space>
        </div>
      )}
      {/* 拍卖出售 */}
      {asset && asset.orderType === 2 && (
        <div className="price">
          <Space align="center">
            <PriceSvg />
            <span>起拍价：</span>
            {utils.formatEther(asset.dealPrice || '0')} WETH
            <Tip_WETH />
          </Space>
          <span style={{ fontSize: 14, fontWeight: 400 }}>
            剩余时间：
            <TimeLeft left={Number(asset.expirationHeight) ?? 0} />
          </span>
        </div>
      )}
      {isMine && (
        <div className="form">
          {asset && !maxOffer && (
            <Input
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t('asset.detail.inputPrice')}
              style={{ width: '100%', marginTop: 16 }}
              value={price}
            />
          )}{' '}
          {asset && maxOffer && (
            <Input
              addonAfter={
                <Space>
                  <Jdenticon size={16} value={maxOffer.buyer} />
                  {shortenAddressLast(maxOffer.buyer)}
                </Space>
              }
              addonBefore="最高报价"
              style={{ width: '100%', marginTop: 16 }}
              value={utils.formatEther(maxOffer.price)}
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
          {asset.orderType === 2 && (
            <>
              <Input
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder={t('asset.detail.inputPrice')}
                style={{ marginTop: 16, display: 'block', width: '100%' }}
                value={offerPrice}
              />
              <ERC20ApproveButton
                address={WETH_ADDRESS[chainId || 1]}
                approveAddress={APPROVE_ADDRESS[chainId || 1]}
                name="WETH"
                onClick={() => {
                  if (
                    BigNumber.from(utils.parseEther(offerPrice || '0')).gt(
                      BigNumber.from(wethBalance)
                    )
                  ) {
                    Modal.warn({
                      title: 'Add funds to complete this transaction',
                      content: `Please deposit WETH ${offerPrice || '0'}`
                    });
                  } else if (
                    BigNumber.from(utils.parseEther(offerPrice || '0')).lte(
                      BigNumber.from(maxOfferPrice)
                    )
                  ) {
                    Modal.warn({
                      title: 'Warning',
                      content: `Offer must greater than ${utils.formatEther(maxOfferPrice)} ETH`
                    });
                  } else {
                    offer(asset.orderId, offerPrice || '0');
                  }
                }}
                style={{ marginTop: 16 }}
                type="primary"
              >
                {t('asset.detail.offer')}
              </ERC20ApproveButton>
            </>
          )}
          {asset.orderType === 0 && (
            <EnableButton
              onClick={() => {
                if (BigNumber.from(asset.dealPrice || '0').gt(BigNumber.from(balance))) {
                  Modal.warn({
                    title: 'Add funds to complete this transaction',
                    content: `Please deposit ETH ${utils.formatEther(asset.dealPrice || '0')}`
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
          )}
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

      <style jsx>{`
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
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-top: 30px;

          font-size: 20px;
          font-weight: bold;
          color: ${theme['@primary-color']};
          line-height: 20px;
        }

        .price span {
          color: ${theme['@text-color-tertiary']};
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

export default OrderDesc;
