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
} from './types'
import api from './util'

export const getBanner = () => {
  return api.get<IResponse<IBanner[]>>('/home/banner')
}

export const subscribe = (email: string) => {
  return api.post('/email', { body: { email } })
}

// 登录
export const login = (headers: { address: string; signature: string }) => {
  return api.post<IResponse<string>>('/login', {
    headers
  })
}

// 获取用户登录信息
export const getUser = (headers: { address: string }) => {
  return api.get<IResponse<IUser>>('/user', {
    headers
  })
}

export const putUser = (body: IUserPayload) => {
  return api.put<IResponse<any>>('/user', {
    body
  })
}

/**
 * 获取订单信息
 */
export const getOrder = (
  entrustInfos: { approval: boolean; contractAdd: string; tokenId: string }[],
  expirationHeight: string,
  price: string,
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6
) => {
  return api.post<IResponse<any>>('/order', {
    body: {
      entrustInfos,
      expirationHeight,
      price,
      type
    }
  })
}

/**
 * 下单校验
 */
export const verifyOrder = (body: { orderId: string; signature: string }) => {
  return api.post<IResponse<any>>('/verify/order', {
    body
  })
}

/**
 * 获取购买订单信息
 */
export const buy = (orderId: string) => {
  return api.post<IResponse<any>>(`/order/${orderId}`)
}

/**
 * 获取主页热门商品
 */
export const getHotGoods = () => {
  return api.get<IResponse<IAsset[]>>('/home/hot')
}

/**
 * 获取主页最新商品
 */
export const getLatestGoods = () => {
  return api.get<IResponse<IAsset[]>>('/home/news')
}

/**
 * 获取商品
 */
export const getAssetList = (
  params: PageParam & {
    projectId?: number
    orderType: OrderType
    itemOrder: ItemOrder
    address?: string
  }
) => {
  return api.get<IListResponse<IAsset>>('/asset', {
    params
  })
}

export const getProjectList = (params: { address?: string }) => {
  return api.get<IResponse<IProject[]>>('/projects', { params })
}

export const getProject = (id: number) => {
  return api.get<IResponse<IProject>>(`/project/${id}`)
}

// 排行榜
export const getRanking = (
  params: PageParam & {
    type: AssetType
    itemOrder: ItemOrder
    order: 'desc' | 'asc'
  }
) => {
  return api.get<IListResponse<IRanking>>('/rank', { params, headers: { lan: 'zh' } })
}

export const getActivity = (
  params: PageParam & {
    projectId?: number
    type: ActivityType
    address?: string
  }
) => {
  return api.get<IListResponse<IActivity>>('/activity', {
    params
  })
}

export const getToken = (params: { contractAdd: string; tokenId: string }) => {
  return api.get<IResponse<IToken>>('/token/detail', { params })
}

// 修改价钱
export const modifyPrice = (body: { orderId: string; price: string; signature: string }) => {
  return api.put('/order/price', { body })
}

export const getAsset = (params: { orderId: string }) => {
  return api.get<IResponse<IAsset>>('/order/detail', { params })
}

// 获取物品的拥有者
export const getTokenOwner = (
  params: PageParam & {
    tokenId: string
    contractAdd: string
  }
) => {
  return api.get<IListResponse<ITokenOwner>>('/token/owner', { params })
}

// 获取Token全网交易记录
export const getNetActivity = (
  params: PageParam & {
    tokenId: string
    contractAdd: string
  }
) => {
  return api.get<IListResponse<INetActivity>>('/token/activity', { params })
}

export const getHelp = (params: PageParam & { search?: string }) => {
  return api.get<IListResponse<IHelp>>('/help', {
    params
  })
}
