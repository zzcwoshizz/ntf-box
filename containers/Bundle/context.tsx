import { useRouter } from 'next/router';
import React from 'react';
import { useAsyncRetry } from 'react-use';

import { cancelOrder as cancelOrderApi, getAsset, getOfferList, offer as offerApi } from '@/api';
import { IAsset, IOffer, IToken } from '@/api/types';
import { useActiveWeb3React } from '@/shared/hooks';
import { useList } from '@/shared/hooks/useList';
import useMarket from '@/shared/hooks/useMarket';
import useServerError from '@/shared/hooks/useServerError';

const dataContext = React.createContext<{
  asset?: IAsset;
  tokens?: IToken[];
  fetching: boolean;
  offers: IOffer[];
  maxOfferPrice: string;
  buy(): Promise<any>;
  offer(orderId: string, price: string): Promise<any>;
  changePrice(price: string): Promise<void>;
  cancelOrder(orderId: string): Promise<void>;
}>({} as any);

const DataProvider: React.FunctionComponent = ({ children }) => {
  const { account } = useActiveWeb3React();
  const router = useRouter();
  const { showError } = useServerError();

  const { orderId } = router.query as { orderId: string };

  const { value: asset, loading: fetching, retry } = useAsyncRetry(async () => {
    const { data } = await getAsset({ orderId });

    return data;
  }, [orderId]);

  // 竞价列表
  const { state: offerState } = useList<IOffer>(
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

  const tokens: IToken[] | undefined = asset?.tokens.map((token) => token);
  const market = useMarket(tokens ?? []);

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
        tokens,
        offers: offerState.list,
        fetching,
        maxOfferPrice: offerState.list?.[0]?.price || asset?.dealPrice || '0',
        buy,
        offer,
        cancelOrder,
        changePrice
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
