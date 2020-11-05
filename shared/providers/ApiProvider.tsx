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

import { SIGN_TEXT } from '../constants'
import { useActiveWeb3React } from '../hooks'
import useCache from '../hooks/useCache'
import { useLanguage } from './LanguageProvider'

let baseURL = ''
if (process.env.NODE_ENV === 'development') {
  baseURL = process.browser ? '/api' : API_URL
} else {
  baseURL = process.browser ? '/api' : API_URL
}

const apiContext = React.createContext<{
  token?: string
  setToken(token?: string): void
}>({} as any)

export const api = new Api(baseURL, {
  timeout: 30000
})

const ApiProvider: React.FunctionComponent = ({ children }) => {
  const { lang } = useLanguage()
  const [token, setToken] = useCache<string>('token', '')

  React.useEffect(() => {
    api.setConfig({
      headers: {
        jwt: token ?? '',
        lan: lang === 'zh-CN' ? 'zh' : 'en'
      }
    })
  }, [lang, token])

  return <apiContext.Provider value={{ token, setToken }}>{children}</apiContext.Provider>
}

const useApi = () => {
  const { token, setToken } = React.useContext(apiContext)
  const { library, account } = useActiveWeb3React()

  const login = React.useCallback(async () => {
    if (!library || !account) {
      return
    }

    const signature = (await library.getSigner(account).signMessage(SIGN_TEXT)) ?? ''
    return await api
      .post<IResponse<string>>('/login', {
        headers: {
          address: account,
          signature
        }
      })
      .then((data) => {
        setToken(data.data)
        return data
      })
  }, [library, account, setToken])

  return {
    api,
    token,
    setToken,
    getBanner() {
      return api.get<IResponse<IBanner[]>>('/home/banner')
    },
    subscribe(email: string) {
      return api.post('/email', { body: { email } })
    },
    login,
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
     * 取消订单
     */
    cancelOrder(orderId: string) {
      return api.post<IResponse<any>>(`/cannel/order/${orderId}`)
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
      return api.get<IListResponse<IRanking>>('/rank', { params })
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
  }
}

export { ApiProvider, useApi }
