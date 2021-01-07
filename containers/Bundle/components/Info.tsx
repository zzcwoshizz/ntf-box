import { Affix, Button, Input, Modal, Space } from 'antd';
import { BigNumber, utils } from 'ethers';
import Link from 'next/link';
import React from 'react';

import { IOffer } from '@/api/types';
import EnableButton from '@/components/Button/EnableButton';
import ERC20ApproveButton from '@/components/Button/ERC20ApproveButton';
import Jdenticon from '@/components/Jdenticon';
import OfferTable from '@/components/Table/OfferTable';
import PriceSvg from '@/icons/icon_price.svg';
import { APPROVE_ADDRESS, WETH_ADDRESS } from '@/shared/constants';
import { useActiveWeb3React } from '@/shared/hooks';
import useTheme from '@/shared/hooks/useTheme';
import { useApp } from '@/shared/providers/AppProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { shortenAddressLast } from '@/utils/string';

import { useData } from '../context';

const Info: React.FunctionComponent = () => {
  const { account } = useActiveWeb3React();
  const { t } = useLanguage();
  const { balance, wethBalance } = useApp();
  const {
    asset,
    maxOfferPrice,
    hasMoreOffers,
    loadMoreOffers,
    changePrice,
    cancelOrder,
    buy,
    offer,
    offers
  } = useData();
  const theme = useTheme();
  const { chainId } = useActiveWeb3React();

  const [price, setPrice] = React.useState('');
  const [offerPrice, setOfferPrice] = React.useState<string>();

  const isMine = asset?.operator === account;
  const maxOffer: IOffer | undefined = offers[0];

  return (
    <>
      <Affix offsetTop={20}>
        <Space>
          {t('asset.detail.holders')}:
          <Jdenticon size={24} value={asset?.operator} />
          <Link href={`/user/${asset?.operator}/items`}>
            <a>{shortenAddressLast(asset?.operator)}</a>
          </Link>
        </Space>
        {asset && asset.orderType === 3 && (
          <div className="price">
            <Space align="center">
              <PriceSvg />
              {utils.formatEther(asset.dealPrice || '0')} ETH
            </Space>
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
          </div>
        )}
        {!isMine && asset && (
          <div className="form">
            {asset.orderType === 5 && (
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
            {asset.orderType === 3 && (
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

        {asset?.orderType === 2 && (
          <div className="content" id="offer-list">
            <OfferTable data={offers} isMine={isMine} />
            {hasMoreOffers && (
              <Button
                onClick={loadMoreOffers}
                style={{ display: 'block', margin: '24px auto 0 auto' }}
              >
                {t('asset.detail.more')}
              </Button>
            )}
          </div>
        )}
      </Affix>

      <style jsx>{`
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
      `}</style>
    </>
  );
};

export default Info;
