import React from 'react';

import { AssetType, ItemOrder, OrderType, ReqActivityType } from '@/api/types';

import { useLanguage } from './LanguageProvider';

const constantsContext = React.createContext<{
  ACTIVITY_TYPES: { [key in ReqActivityType]: string };
  ITEM_ORDER: { [key in ItemOrder]: string };
  ORDER_TYPE: { [key in OrderType]: string };
  ASSET_TYPES: { [key in AssetType]: string };
}>({} as any);

const ConstantsProvider: React.FunctionComponent = ({ children }) => {
  const { t } = useLanguage();

  const ACTIVITY_TYPES: { [key in ReqActivityType]: string } = {
    0: '全部',
    1: '上架物品',
    2: '出售',
    3: '拍卖',
    4: '转赠',
    5: '下架',
    6: '修改价钱',
    7: '购买'
  };

  const ITEM_ORDER: { [key in ItemOrder]: string } = {
    0: t('asset.itemOrder.0'),
    1: t('asset.itemOrder.1'),
    2: t('asset.itemOrder.2'),
    3: t('asset.itemOrder.3'),
    4: t('asset.itemOrder.4')
  };

  const ORDER_TYPE: { [key in OrderType]: string } = {
    0: t('asset.orderType.0'),
    1: t('asset.orderType.1'),
    2: t('asset.orderType.2')
  };

  const ASSET_TYPES: { [key in AssetType]: string } = {
    HOT: t('asset.types.HOT'),
    NEW: t('asset.types.NEW'),
    VIRTUAL_WORLDS: t('asset.types.VIRTUAL_WORLDS'),
    DOMAIN_NAMES: t('asset.types.DOMAIN_NAMES'),
    BLOCKCHAIN_ART: t('asset.types.BLOCKCHAIN_ART'),
    TRADING_CARDS: t('asset.types.TRADING_CARDS'),
    COLLECTIBLES: t('asset.types.COLLECTIBLES'),
    SPORTS: t('asset.types.SPORTS'),
    UTILITY: t('asset.types.UTILITY'),
    GAME: t('asset.types.GAME')
  };

  return (
    <constantsContext.Provider value={{ ACTIVITY_TYPES, ITEM_ORDER, ORDER_TYPE, ASSET_TYPES }}>
      {children}
    </constantsContext.Provider>
  );
};

const useConstants = () => {
  const context = React.useContext(constantsContext);

  return context;
};

export { ConstantsProvider, useConstants };
