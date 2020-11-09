import { useRouter } from 'next/router'
import React from 'react'
import { useAsync, useAsyncRetry } from 'react-use'

import { IAsset, INetActivity, IToken, ITokenOwner } from '@/api/types'
import { useActiveWeb3React } from '@/shared/hooks'
import { useList } from '@/shared/hooks/useList'
import useMarket from '@/shared/hooks/useMarket'
import useServerError from '@/shared/hooks/useServerError'
import { useApi } from '@/shared/providers/ApiProvider'
import { delay } from '@/utils/time'

const dataContext = React.createContext<{
  asset?: IAsset
  activities: INetActivity[]
  token: IToken
  fetching: boolean
  holders: number
  tokenOwner: ITokenOwner[]
  isMine: boolean
  hasMoreTokenOwner: boolean
  hasMoreActivities: boolean
  changePrice(price: string): Promise<void>
  cancelOrder(orderId: string): Promise<void>
  loadMoreTokenOwner(): void
  loadMoreActivity(): void
  buy(): Promise<any>
}>({} as any)

const DataProvider: React.FunctionComponent = ({ children }) => {
  const router = useRouter()
  const { token: apiToken } = useApi()
  const { account } = useActiveWeb3React()
  const {
    getToken,
    getAsset,
    getTokenOwner,
    getNetActivity,
    cancelOrder: cancelOrderApi
  } = useApi()
  const { showError } = useServerError()

  const { address, tokenId } = router.query as { address: string; tokenId: string }

  const {
    value: token = {
      contractAdd: '',
      tokenId: '0',
      type: 'ERC721'
    },
    loading: tokenLoading
  } = useAsync(async () => {
    await delay(30)
    const { data } = await getToken({ contractAdd: address, tokenId })
    return data
  }, [address, tokenId])

  const orderIds = token.orderIds?.map((id) => id) ?? []

  const { value: assets = [], loading: assetLoading, retry } = useAsyncRetry(async () => {
    let assets: IAsset[] = []
    if (orderIds.length > 0) {
      const res = await Promise.all(orderIds.map((orderId) => getAsset({ orderId })))
      assets = res.map(({ data }) => data)
    }
    return assets
  }, [...orderIds.map((id) => id), apiToken])

  const asset: IAsset | undefined = assets[0]
  const orderId = orderIds[0] ?? ''

  const market = useMarket([token])

  // 持有人列表
  const { state, action } = useList<ITokenOwner>(
    async (params) => {
      if (token.type === 'ERC721') {
        return {
          list: [],
          total: 0,
          hasMore: false
        }
      }
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
  const isMine = token.owner ?? false

  const changePrice = async (price: string) => {
    if (!account) {
      return
    }

    try {
      await market.changePrice(orderId, price)
      retry()
    } catch (e) {
      showError(e)
    }
  }

  const cancelOrder = async (orderId: string) => {
    if (!account) {
      return
    }

    try {
      await cancelOrderApi(orderId)
      retry()
    } catch (e) {
      showError(e)
    }
  }

  const buy = async () => {
    try {
      await market.buy(orderId)
      retry()
    } catch (e) {
      showError(e)
    }
  }

  return (
    <dataContext.Provider
      value={{
        asset,
        activities: activityState.list,
        token,
        fetching: tokenLoading || assetLoading,
        holders: state.pagination.total ?? 0,
        tokenOwner: state.list,
        isMine,
        hasMoreTokenOwner: state.hasMore,
        hasMoreActivities: activityState.hasMore,
        changePrice,
        cancelOrder,
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
