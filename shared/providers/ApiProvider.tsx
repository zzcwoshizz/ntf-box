import React from 'react'

import { API_URL } from '@/api/config'
import {
  ActivityType,
  AssetType,
  IActivity,
  IAsset,
  IBanner,
  IHelp,
  IListResponse,
  INetActivity,
  IProject,
  IRanking,
  IResponse,
  ItemOrder,
  IToken,
  ITokenOwner,
  IUser,
  IUserPayload,
  OrderType,
  PageParam
} from '@/api/types'
import { Api } from '@/api/util'

import useCache from '../hooks/useCache'
import { useLanguage } from './LanguageProvider'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = process.browser ? '/api' : API_URL
} else {
  baseURL = process.browser ? '/api' : API_URL
}

const apiContext = React.createContext<{
  api: Api
}>({} as any)

const ApiProvider: React.FunctionComponent = ({ children }) => {
  const { lang } = useLanguage()
  const [token] = useCache<string>('token', '')

  const api = React.useMemo(() => {
    const api = new Api(baseURL, {
      timeout: 30000,
      headers: {
        jwt: token ?? '',
        lan: lang
      }
    })
    return api
  }, [lang, token])

  return <apiContext.Provider value={{ api }}>{children}</apiContext.Provider>
}

const useApi = () => {
  const { api } = React.useContext(apiContext)

  return React.useMemo(
    () => ({
      api,
      getBanner() {
        return api.get<IResponse<IBanner[]>>('/home/banner')
      },
      subscribe(email: string) {
        return api.post('/email', { body: { email } })
      },
      // 登录
      login(headers: { address: string; signature: string }) {
        return api.post<IResponse<string>>('/login', {
          headers
        })
      },
      // 获取用户登录信息
      getUser(headers: { address: string }) {
        return api.get<IResponse<IUser>>('/user', {
          headers
        })
      },
      putUser(body: IUserPayload) {
        return api.put<IResponse<any>>('/user', {
          body
        })
      },
      /**
       * 获取订单信息
       */
      getOrder(
        entrustInfos: { approval: boolean; contractAdd: string; tokenId: string }[],
        expirationHeight: string,
        price: string,
        type: 0 | 1 | 2 | 3 | 4 | 5 | 6
      ) {
        return api.post<IResponse<any>>('/order', {
          body: {
            entrustInfos,
            expirationHeight,
            price,
            type
          }
        })
      },
      /**
       * 下单校验
       */
      verifyOrder(body: { orderId: string; signature: string }) {
        return api.post<IResponse<any>>('/verify/order', {
          body
        })
      },
      /**
       * 获取购买订单信息
       */
      buy(orderId: string) {
        return api.post<IResponse<any>>(`/order/${orderId}`)
      },
      /**
       * 获取主页热门商品
       */
      getHotGoods() {
        return api.get<IResponse<IAsset[]>>('/home/hot')
      },
      /**
       * 获取主页最新商品
       */
      getLatestGoods() {
        return api.get<IResponse<IAsset[]>>('/home/news')
      },
      /**
       * 获取商品
       */
      getAssetList(
        params: PageParam & {
          projectId?: number
          orderType: OrderType
          itemOrder: ItemOrder
          address?: string
        }
      ) {
        return api.get<IListResponse<IAsset>>('/asset', {
          params
        })
      },
      getProjectList(params: { address?: string }) {
        return api.get<IResponse<IProject[]>>('/projects', { params })
      },
      getProject(id: number) {
        return api.get<IResponse<IProject>>(`/project/${id}`)
      },
      // 排行榜
      getRanking(
        params: PageParam & {
          type: AssetType
          itemOrder: ItemOrder
          order: 'desc' | 'asc'
        }
      ) {
        return api.get<IListResponse<IRanking>>('/rank', { params, headers: { lan: 'zh' } })
      },
      getActivity(
        params: PageParam & {
          projectId?: number
          type: ActivityType
          address?: string
        }
      ) {
        return api.get<IListResponse<IActivity>>('/activity', {
          params
        })
      },
      getToken(params: { contractAdd: string; tokenId: string }) {
        return api.get<IResponse<IToken>>('/token/detail', { params })
      },
      // 修改价钱
      modifyPrice(body: { orderId: string; price: string; signature: string }) {
        return api.put('/order/price', { body })
      },
      getAsset(params: { orderId: string }) {
        return api.get<IResponse<IAsset>>('/order/detail', { params })
      },
      // 获取物品的拥有者
      getTokenOwner(
        params: PageParam & {
          tokenId: string
          contractAdd: string
        }
      ) {
        return api.get<IListResponse<ITokenOwner>>('/token/owner', { params })
      },
      // 获取Token全网交易记录
      getNetActivity(
        params: PageParam & {
          tokenId: string
          contractAdd: string
        }
      ) {
        return api.get<IListResponse<INetActivity>>('/token/activity', { params })
      },
      getHelp(params: PageParam & { search?: string }) {
        return api.get<IListResponse<IHelp>>('/help', {
          params
        })
      }
    }),
    [api]
  )
}

export { ApiProvider, useApi }
