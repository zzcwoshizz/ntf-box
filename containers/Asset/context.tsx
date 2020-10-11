import { useRouter } from 'next/router'
import React from 'react'
import { useAsyncRetry } from 'react-use'

import { getAsset, getNetActivity, getTokenOwner } from '@/api'
import { IAsset, INetActivity, IToken, ITokenOwner } from '@/api/types'
import { useList } from '@/shared/hooks/useList'
import useMarket from '@/shared/hooks/useMarket'
import { useApp } from '@/shared/providers/AppProvider'
import { isEqualIgnoreCase } from '@/utils/string'

const dataContext = React.createContext<{
  asset: IAsset
  activities: INetActivity[]
  token: IToken
  fetching: boolean
  holders: number
  tokenOwner: ITokenOwner[]
  isMine: boolean
  loading: boolean
  hasMoreTokenOwner: boolean
  hasMoreActivities: boolean
  changePrice(price: string): Promise<void>
  loadMoreTokenOwner(): void
  loadMoreActivity(): void
  buy(): Promise<any>
}>({} as any)

const DataProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter()
  const { account } = useApp()
  const [loading, setLoading] = React.useState(false)

  const { orderId } = router.query as { orderId: string }

  const {
    value: asset = {
      orderType: 1,
      tokens: [],
      viewNum: 0,
      operator: ''
    },
    loading: fetching,
    retry
  } = useAsyncRetry(async () => {
    if (orderId) {
      const { data } = await getAsset({ orderId })
      return data
    }
  }, [orderId])

  const token: IToken = React.useMemo(() => {
    return asset.tokens.length > 0
      ? asset.tokens[0]
      : {
          contractAdd: '',
          tokenId: '0'
        }
  }, [JSON.stringify(asset)])

  const market = useMarket([token])

  // 持有人列表
  const { state, action } = useList<ITokenOwner>(
    async (params) => {
      if (!token.contractAdd) {
        return {
          list: [],
          total: 0,
          hasMore: false
        }
      }

      const res = await getTokenOwner({
        page: params.page,
        pageSize: params.pageSize,
        tokenId: token.tokenId,
        contractAdd: token.contractAdd
      })
      return {
        list: res.list,
        total: res.total,
        hasMore: res.hasNextPage
      }
    },
    {},
    undefined,
    [JSON.stringify(token)],
    false
  )
  const loadMoreTokenOwner = () => {
    console.log(state)
    if (state.hasMore && state.list.length > 0 && !state.fetching) {
      action.setPagination({
        ...state.pagination,
        page: state.pagination.page + 1
      })
    }
  }

  // 全网记录列表
  const { state: activityState, action: activityAction } = useList<INetActivity>(
    async (params) => {
      if (!token.contractAdd) {
        return {
          list: [],
          total: 0,
          hasMore: false
        }
      }

      const res = await getNetActivity({
        page: params.page,
        pageSize: params.pageSize,
        tokenId: token.tokenId,
        contractAdd: token.contractAdd
      })
      return {
        list: res.list,
        total: res.total,
        hasMore: res.hasNextPage
      }
    },
    {},
    undefined,
    [JSON.stringify(token)],
    false
  )
  const loadMoreActivity = () => {
    if (activityState.hasMore && activityState.list.length > 0 && !activityState.fetching) {
      activityAction.setPagination({
        ...activityState.pagination,
        page: activityState.pagination.page + 1
      })
    }
  }

  // 是否是本人物品
  const isMine = isEqualIgnoreCase(asset.operator, account + '')

  const changePrice = async (price: string) => {
    if (!account) {
      return
    }

    setLoading(true)
    try {
      await market.changePrice(orderId, price)
      retry()
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const buy = async () => {
    setLoading(true)
    try {
      await market.buy(orderId)
      retry()
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <dataContext.Provider
      value={{
        asset,
        activities: activityState.list,
        token,
        fetching,
        holders: state.pagination.total ?? 0,
        tokenOwner: state.list,
        isMine,
        loading,
        hasMoreTokenOwner: state.hasMore,
        hasMoreActivities: activityState.hasMore,
        changePrice,
        loadMoreTokenOwner,
        loadMoreActivity,
        buy
      }}>
      {children}
    </dataContext.Provider>
  )
}

const useData = () => {
  const context = React.useContext(dataContext)

  return context
}

export { DataProvider, useData }
