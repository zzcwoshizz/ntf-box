import HotSvg from '@icons/icon_hot.svg';
import { Space, Tabs } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { AssetType } from '@/api/types';
import { useConstants } from '@/shared/providers/ConstantsProvider';
import { hex2rgba } from '@/utils/color';

import Container from '../Layout/Container';

const { TabPane } = Tabs;

const Toolbar: React.FunctionComponent = () => {
  const { ASSET_TYPES } = useConstants();
  const router = useRouter();

  return (
    <>
      <Container style={{ margin: '0 auto' }}>
        <Tabs
          activeKey=""
          onChange={(value) => {
            router.push({
              pathname: '/ranking',
              query: {
                type: value
              }
            });
          }}
        >
          {Object.keys(ASSET_TYPES).map((key) => (
            <TabPane
              key={key}
              style={{ height: 22 }}
              tab={
                <Space>
                  {(key as AssetType) === 'HOT' && <HotSvg />}
                  {ASSET_TYPES[key as AssetType]}
                </Space>
              }
            />
          ))}
        </Tabs>
      </Container>
      <style global jsx>{`
        .ant-tabs-top > .ant-tabs-nav::before,
        .ant-tabs-top > div > .ant-tabs-nav::before {
          border: none;
        }
        .ant-tabs-tab {
          color: ${hex2rgba('#fff', 0.6)};
        }
        .ant-tabs > .ant-tabs-nav,
        .ant-tabs > div > .ant-tabs-nav {
          margin-bottom: 0;
        }
        .ant-tabs-tab {
          padding: 0;
          display: inline-flex;
          align-items: center;
          height: 52px;
        }
        .ant-tabs-tab-btn {
          height: 25px;
        }
        .ant-tabs-nav-wrap .anticon svg {
          fill: ${hex2rgba('#fff', 0.6)};
        }
      `}</style>
    </>
  );
};

export default Toolbar;
