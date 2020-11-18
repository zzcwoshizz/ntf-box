import _ from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';

import { getActivity } from '@/api';
import { ActivityType, IActivity, ReqActivityType } from '@/api/types';
import { useList } from '@/shared/hooks/useList';
import { IPage } from '@/types';

import { useProject } from './ProjectProvider';

type FilterType = { type: ReqActivityType; id?: number; name?: string };

const activityContext = React.createContext<{
  activities: IActivity[];
  page: IPage;
  fetching: boolean;
  filter: FilterType;
  toogleFilter(filter: FilterType): void;
  onScrollBottom(): void;
}>({} as any);

const ActivityProvider: React.FunctionComponent<{ address?: string | null }> = ({
  children,
  address
}) => {
  const { selectProject } = useProject();

  const { query } = useRouter();
  const defaultFilter: FilterType = {
    type: (Number(query.type ?? 0) ?? 0) as ReqActivityType,
    id: query.id ? Number(query.id) : undefined,
    name: query.name as string
  };

  const { state, action } = useList<IActivity, FilterType>(
    React.useCallback(
      async (params) => {
        const res = await getActivity({
          page: params.page,
          pageSize: params.pageSize,
          type: params.type,
          projectId: params.id ? params.id : undefined,
          address: address ?? undefined
        });

        return {
          list: res.list,
          total: res.total,
          hasMore: res.hasNextPage
        };
      },
      [address]
    ),
    defaultFilter,
    undefined
  );

  const onScrollBottom = _.debounce(() => {
    if (state.hasMore && state.list.length > 0 && !state.fetching) {
      action.setPagination({ ...state.pagination, page: state.pagination.page + 1 });
    }
  }, 100);

  const toogleFilter = (filter: FilterType) => {
    action.setFilter(filter);
  };

  React.useEffect(() => {
    selectProject(state.filter.id);
  }, [selectProject, state.filter.id]);

  return (
    <activityContext.Provider
      value={{
        activities: state.list,
        page: state.pagination,
        fetching: state.fetching,
        filter: state.filter,
        toogleFilter,
        onScrollBottom
      }}
    >
      {children}
    </activityContext.Provider>
  );
};

const useActivity = () => {
  const context = React.useContext(activityContext);

  return context;
};

export { ActivityProvider, useActivity };
