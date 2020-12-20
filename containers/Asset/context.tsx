import { useRouter } from 'next/router';
import React from 'react';
import { useAsync, useAsyncRetry } from 'react-use';

import {
  cancelOrder as cancelOrderApi,
  getAsset,
  getNetActivity,
  getOfferList,
  getToken,
  getTokenOwner,
  offer as offerApi
} from '@/api';
import { IAsset, INetActivity, IOffer, IToken, ITokenOwner } from '@/api/types';
import { useActiveWeb3React } from '@/shared/hooks';
import { useList } from '@/shared/hooks/useList';
import useMarket from '@/shared/hooks/useMarket';
import useServerError from '@/shared/hooks/useServerError';
import { useApp } from '@/shared/providers/AppProvider';
import { delay } from '@/utils/time';

const dataContext = React.createContext<{
  asset?: IAsset;
  activities: INetActivity[];
  auctions: IOffer[];
  token: IToken;
  fetching: boolean;
  holders: number;
  tokenOwner: ITokenOwner[];
  isMine: boolean;
  hasMoreTokenOwner: boolean;
  hasMoreActivities: boolean;
  hasMoreAuctions: boolean;
  maxOfferPrice: string;
  changePrice(price: string): Promise<void>;
  cancelOrder(orderId: string): Promise<void>;
  loadMoreTokenOwner(): void;
  loadMoreActivity(): void;
  loadMoreAuction(): void;
  buy(): Promise<any>;
  offer(orderId: string, price: string): Promise<any>;
}>({} as any);

const DataProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter();
  const { token: apiToken } = useApp();
  const { account } = useActiveWeb3React();
  const { showError } = useServerError();

  const { address, tokenId } = router.query as { address: string; tokenId: string };

  const {
    value: token = {
      contractAdd: '',
      tokenId: '0',
      type: 'ERC721'
    },
    loading: tokenLoading
  } = useAsync(async () => {
    await delay(30);
    const { data } = await getToken({ contractAdd: address, tokenId });

    return data;
  }, [address, tokenId]);

  const orderId = React.useMemo(() => {
    if (token.orderIds) {
      return token.orderIds[0];
    } else {
      return undefined;
    }
  }, [token]);

  const { value: asset, loading: assetLoading, retry } = useAsyncRetry(async () => {
    if (orderId) {
      return (await getAsset({ orderId })).data;
    } else {
      return undefined;
    }
  }, [orderId, apiToken]);

  const market = useMarket([token]);

  // 持有人列表
  const { state, action } = useList<ITokenOwner>(
    React.useCallback(
      async (params) => {
        if (token.type === 'ERC721') {
          return {
            list: [],
            total: 0,
            hasMore: false
          };
        }

        if (!token.contractAdd) {
          return {
            list: [],
            total: 0,
            hasMore: false
          };
        }

        const res = await getTokenOwner({
          page: params.page,
          pageSize: params.pageSize,
          tokenId: token.tokenId,
          contractAdd: token.contractAdd
        });

        return {
          list: res.list,
          total: res.total,
          hasMore: res.hasNextPage
        };
      },
      [token.contractAdd, token.tokenId, token.type]
    ),
    {},
    undefined,
    false
  );

  const loadMoreTokenOwner = () => {
    if (state.hasMore && state.list.length > 0 && !state.fetching) {
      action.setPagination({
        ...state.pagination,
        page: state.pagination.page + 1
      });
    }
  };

  // 全网记录列表
  const { state: activityState, action: activityAction } = useList<INetActivity>(
    React.useCallback(
      async (params) => {
        if (!token.contractAdd) {
          return {
            list: [],
            total: 0,
            hasMore: false
          };
        }

        const res = await getNetActivity({
          page: params.page,
          pageSize: params.pageSize,
          tokenId: token.tokenId,
          contractAdd: token.contractAdd
        });

        return {
          list: res.list,
          total: res.total,
          hasMore: res.hasNextPage
        };
      },
      [token.contractAdd, token.tokenId]
    ),
    {},
    undefined,
    false
  );

  const loadMoreActivity = () => {
    if (activityState.hasMore && activityState.list.length > 0 && !activityState.fetching) {
      activityAction.setPagination({
        ...activityState.pagination,
        page: activityState.pagination.page + 1
      });
    }
  };

  // 竞价列表
  const { state: auctionState, action: auctionAction } = useList<IOffer>(
    React.useCallback(
      async (params) => {
        if (!orderId) {
          return {
            list: [],
            total: 0,
            hasMore: false
          };
        }

        const res = await getOfferList(orderId, {
          page: params.page,
          pageSize: params.pageSize
        });

        return {
          list: res.list,
          total: res.total,
          hasMore: res.hasNextPage
        };
      },
      [orderId]
    ),
    {},
    undefined,
    false
  );

  const loadMoreAuction = () => {
    if (auctionState.hasMore && auctionState.list.length > 0 && !auctionState.fetching) {
      auctionAction.setPagination({
        ...auctionState.pagination,
        page: auctionState.pagination.page + 1
      });
    }
  };

  // 是否是本人物品
  const isMine = token.owner ?? false;

  const changePrice = async (price: string) => {
    if (!account || !orderId) {
      return;
    }

    try {
      await market.changePrice(orderId, price);
      retry();
    } catch (e) {
      showError(e);
    }
  };

  const cancelOrder = async (orderId: string) => {
    if (!account) {
      return;
    }

    try {
      await cancelOrderApi(orderId);
      retry();
    } catch (e) {
      showError(e);
    }
  };

  const buy = async () => {
    if (!orderId) {
      return;
    }

    try {
      await market.buy(orderId);
      retry();
    } catch (e) {
      showError(e);
    }
  };

  const offer = async (orderId: string, price: string) => {
    try {
      await offerApi(orderId, { price });
    } catch (e) {
      showError(e);
    }
  };

  return (
    <dataContext.Provider
      value={{
        asset,
        activities: activityState.list,
        auctions: auctionState.list,
        token,
        fetching: tokenLoading || assetLoading,
        holders: state.pagination.total ?? 0,
        tokenOwner: state.list,
        isMine,
        hasMoreTokenOwner: state.hasMore,
        hasMoreActivities: activityState.hasMore,
        hasMoreAuctions: auctionState.hasMore,
        maxOfferPrice: auctionState.list?.[0]?.price || asset?.dealPrice || '0',
        changePrice,
        cancelOrder,
        loadMoreTokenOwner,
        loadMoreActivity,
        loadMoreAuction,
        buy,
        offer
      }}
    >
      {children}
    </dataContext.Provider>
  );
};

const useData = () => {
  const context = React.useContext(dataContext);

  return context;
};

export { DataProvider, useData };
