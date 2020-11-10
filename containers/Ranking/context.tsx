import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { getRanking } from '@/api';
import { AssetType, ItemOrder } from '@/api/types';
import { useList } from '@/shared/hooks/useList';
import { IPage } from '@/types';

type FilterType = { type: AssetType; itemOrder: ItemOrder; order: 'desc' | 'asc' };

const dataContext = React.createContext<{
  ranking: any[];
  page: IPage;
  fetching: boolean;
  filter: FilterType;
  toogleFilter(filter: FilterType): void;
  onScrollBottom(): void;
}>({} as any);

const DataProvider: React.FunctionComponent = ({ children }) => {
  const { query } = useRouter();
  const defaultFilter: FilterType = {
    type: (query.type as AssetType) ?? 'HOT',
    itemOrder: (query.itemOrder as ItemOrder) ?? '0',
    order: (query.order as 'desc' | 'asc') ?? 'desc'
  };

  const getList = React.useCallback(async (params: IPage & FilterType) => {
    const res = await getRanking({
      page: params.page,
      pageSize: params.pageSize,
      type: params.type,
      itemOrder: params.itemOrder,
      order: params.order
    });

    return {
      list: res.list,
      total: res.total,
      hasMore: res.hasNextPage
    };
  }, []);

  const { state, action } = useList<any, FilterType>(getList, defaultFilter);

  const onScrollBottom = _.debounce(() => {
    if (state.hasMore && state.list.length > 0 && !state.fetching) {
      action.setPagination({ ...state.pagination, page: state.pagination.page + 1 });
    }
  }, 100);

  const toogleFilter = (filter: FilterType) => {
    action.setFilter(filter);
  };

  return (
    <dataContext.Provider
      value={{
        ranking: state.list,
        page: state.pagination,
        fetching: state.fetching,
        filter: state.filter,
        toogleFilter,
        onScrollBottom
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
