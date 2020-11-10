import { useRouter } from 'next/router';
import React from 'react';
import { useAsyncRetry } from 'react-use';

import { getAsset } from '@/api';
import { IAsset, IToken } from '@/api/types';
import useMarket from '@/shared/hooks/useMarket';

const dataContext = React.createContext<{
  asset?: IAsset;
  tokens?: IToken[];
  fetching: boolean;
  loading: boolean;
  buy(): Promise<void>;
}>({} as any);

const DataProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const { orderId } = router.query as { orderId: string };

  const { value: asset, loading: fetching } = useAsyncRetry(async () => {
    const { data } = await getAsset({ orderId });

    return data;
  }, [orderId]);

  const tokens: IToken[] | undefined = asset?.tokens.map((token) => token);
  const market = useMarket(tokens ?? []);

  const buy = async () => {
    setLoading(true);

    try {
      await market.buy(orderId);
      router.push('/account/items');
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  return (
    <dataContext.Provider value={{ asset, tokens, fetching, loading, buy }}>
      {children}
    </dataContext.Provider>
  );
};

const useData = () => {
  const context = React.useContext(dataContext);

  return context;
};

export { DataProvider, useData };
