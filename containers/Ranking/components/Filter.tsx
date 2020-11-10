import { Tabs } from 'antd';
import React from 'react';

import { AssetType } from '@/api/types';
import { useConstants } from '@/shared/providers/ConstantsProvider';

import { useData } from '../context';

const { TabPane } = Tabs;

const Filter: React.FunctionComponent = () => {
  const { ASSET_TYPES } = useConstants();
  const { filter, toogleFilter } = useData();

  return (
    <>
      <Tabs
        activeKey={filter.type}
        onChange={(value) => {
          toogleFilter({ ...filter, type: value as AssetType });
        }}
      >
        {Object.keys(ASSET_TYPES).map((key) => (
          <TabPane key={key} tab={ASSET_TYPES[key as AssetType]} />
        ))}
      </Tabs>
      <style global jsx>{`
        .ant-tabs-nav-wrap {
          padding-bottom: 10px;
        }
      `}</style>
    </>
  );
};

export default Filter;
