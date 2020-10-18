import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'

import { getAssetList } from '@/api'
import { IAsset, ItemOrder, OrderType } from '@/api/types'
import { useList } from '@/shared/hooks/useList'
import { IPage } from '@/types'

import { useProject } from './ProjectProvider'

type FilterType = { orderType: OrderType; itemOrder: ItemOrder; id?: number; name?: string }

const assetContext = React.createContext<{
  assets: IAsset[]
  page: IPage
  fetching: boolean
  filter: FilterType
  toogleFilter(filter: FilterType): void
  onScrollBottom(): void
}>({} as any)

const AssetProvider: React.FunctionComponent<{ address?: string | null }> = ({
  children,
  address
}) => {
  const { selectProject } = useProject()

  const { query } = useRouter()
  const defaultFilter: FilterType = {
    orderType: (query.orderType as OrderType) ?? '0',
    itemOrder: (query.itemOrder as ItemOrder) ?? '0',
    id: query.id ? Number(query.id) : undefined,
    name: query.name as string
  }

  const { state, action } = useList<IAsset, FilterType>(
    async (params) => {
      const res = await getAssetList({
        page: params.page,
        pageSize: params.pageSize,
        orderType: params.orderType,
        itemOrder: params.itemOrder,
        projectId: params.id ? params.id : undefined,
        address: address ?? undefined
      })
      return {
        list: res.list,
        total: res.total,
        hasMore: res.hasNextPage
      }
    },
    defaultFilter,
    undefined,
    [address]
  )

  const onScrollBottom = _.debounce(() => {
    if (state.hasMore && state.list.length > 0 && !state.fetching) {
      action.setPagination({ ...state.pagination, page: state.pagination.page + 1 })
    }
  }, 100)

  const toogleFilter = (filter: FilterType) => {
    action.setFilter(filter)
  }

  React.useEffect(() => {
    selectProject(state.filter.id)
  }, [state.filter.id])

  return (
    <assetContext.Provider
      value={{
        assets: state.list,
        page: state.pagination,
        fetching: state.fetching,
        filter: state.filter,
        toogleFilter,
        onScrollBottom
      }}>
      {children}
    </assetContext.Provider>
  )
}

const useAsset = () => {
  const context = React.useContext(assetContext)

  return context
}

export { AssetProvider, useAsset }
