import { Button, Space, Spin, Tabs } from 'antd';
import React from 'react';

import NetActivityTable from '@/components/Table/NetActivityTable';
import TokenOwnerTable from '@/components/Table/TokenOwnerTable';
import Features from '@/components/Token/Features';
import ActivitySvg from '@/icons/icon_acticity.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import { useData } from '../context';

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

  const {
    token,
    fetching,
    tokenOwner,
    activities,
    hasMoreTokenOwner,
    hasMoreActivities,
    loadMoreTokenOwner,
    loadMoreActivity
  } = useData();

  return (
    <>
      <Spin spinning={fetching}>
        <div className="container">
          <div className="head">
            <Tabs
              onChange={(key) => {
                window.location.hash = '#' + key;
              }}
            >
              {token.type === 'ERC1155' && (
                <TabPane key="asset-hold-address" tab={t('asset.detail.holdAddress')} />
              )}
              <TabPane key="asset-features" tab={t('asset.detail.features')} />
              <TabPane key="asset-activity-record" tab={t('asset.detail.activityRecord')} />
            </Tabs>
          </div>
          {token.type === 'ERC1155' && (
            <div className="content" id="asset-hold-address">
              <Title icon={<ActivitySvg />}>{t('asset.detail.holdAddress')}</Title>
              <TokenOwnerTable address={token.contractAdd} data={tokenOwner} />
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
      </Spin>
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
