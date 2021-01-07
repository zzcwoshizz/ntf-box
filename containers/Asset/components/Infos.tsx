import { Button, Space, Tabs } from 'antd';
import React from 'react';

import { getAsset } from '@/api';
import NetActivityTable from '@/components/Table/NetActivityTable';
import AuctionTable from '@/components/Table/OfferTable';
import TokenOwnerTable from '@/components/Table/TokenOwnerTable';
import Features from '@/components/Token/Features';
import ActivitySvg from '@/icons/icon_acticity.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import { DataProvider, useData } from '../context';
import AssetModal from './AssetModal';

const { TabPane } = Tabs;

const Title: React.FunctionComponent<{ icon: React.ReactNode }> = ({ icon, children }) => {
  const theme = useTheme();

  return (
    <div>
      <Space align="center">
        {icon}
        {children}
      </Space>
      <style jsx>{`
        div {
          margin-bottom: 16px;

          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }
      `}</style>
    </div>
  );
};

const Infos: React.FunctionComponent = () => {
  const { t } = useLanguage();
  const [[visible, orderId], setOrderId] = React.useState<[boolean, string | undefined]>([
    false,
    undefined
  ]);

  const {
    isMine,
    token,
    tokenOwner,
    activities,
    auctions,
    asset,
    hasMoreTokenOwner,
    hasMoreActivities,
    hasMoreAuctions,
    loadMoreTokenOwner,
    loadMoreActivity,
    loadMoreAuction
  } = useData();

  return (
    <>
      {visible && (
        <DataProvider orderId={orderId} token={token}>
          <AssetModal onClose={() => setOrderId([false, undefined])} visible={visible} />
        </DataProvider>
      )}
      <div className="container">
        <div className="head">
          <Tabs
            onChange={(key) => {
              window.location.hash = '#' + key;
            }}
          >
            {asset?.orderType === 2 && (
              <TabPane key="offer-list" tab={t('asset.detail.offerList')} />
            )}
            {token.type === 'ERC1155' && (
              <TabPane key="asset-hold-address" tab={t('asset.detail.holdAddress')} />
            )}
            <TabPane key="asset-features" tab={t('asset.detail.features')} />
            <TabPane key="asset-activity-record" tab={t('asset.detail.activityRecord')} />
          </Tabs>
        </div>
        {asset?.orderType === 2 && (
          <div className="content" id="offer-list">
            <Title icon={<ActivitySvg />}>{t('asset.detail.offerList')}</Title>
            <AuctionTable data={auctions} isMine={isMine} />
            {hasMoreAuctions && (
              <Button
                onClick={loadMoreAuction}
                style={{ display: 'block', margin: '24px auto 0 auto' }}
              >
                {t('asset.detail.more')}
              </Button>
            )}
          </div>
        )}
        {token.type === 'ERC1155' && (
          <div className="content" id="asset-hold-address">
            <Title icon={<ActivitySvg />}>{t('asset.detail.holdAddress')}</Title>
            <TokenOwnerTable
              data={tokenOwner}
              onSee={async (orderId: string) => {
                setOrderId([true, orderId]);
              }}
            />
            {hasMoreTokenOwner && (
              <Button
                onClick={loadMoreTokenOwner}
                style={{ display: 'block', margin: '24px auto 0 auto' }}
              >
                {t('asset.detail.more')}
              </Button>
            )}
          </div>
        )}
        <div className="content" id="asset-features">
          <Title icon={<ActivitySvg />}>{t('asset.detail.features')}</Title>
          <Features token={token} />
        </div>
        <div className="content" id="asset-activity-record">
          <Title icon={<ActivitySvg />}>{t('asset.detail.activityRecord')}</Title>
          <NetActivityTable data={activities} />
          {hasMoreActivities && (
            <Button
              onClick={loadMoreActivity}
              style={{ display: 'block', margin: '24px auto 0 auto' }}
            >
              {t('asset.detail.more')}
            </Button>
          )}
        </div>
      </div>
      <style jsx>{`
        .container {
          margin-top: 16px;
          padding: 0 24px 24px 24px;
          background-color: #fff;
        }
        .head :global(.ant-tabs-nav) {
          padding: 10px 0;
        }

        .content {
          margin-bottom: 20px;
        }
        .content:nth-last-of-type(1) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
};

export default Infos;
