import {
  ActivityType,
  AssetType,
  IActivity,
  IAsset,
  IBanner,
  IListResponse,
  IProject,
  IRanking,
  IResponse,
  IUser,
  IUserPayload,
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
 * @param entrustInfos
 * @param expirationHeight 过期高度
 * @param price 价格
 * @param type //0 单个商品，直接出售挂单 不可还价,1 单个商品，直接出售挂单 可还价, 2 单个商品，拍卖,3 捆绑商品，直接出售挂单 不可还价,4 捆绑商品，直接出售挂单 可还价,5 捆绑商品，进行拍卖,6 转赠,可用值:SINGLE_ENTRUST_NO_PRICE,SINGLE_ENTRUST_PRICE,SINGLE_AUCTION_PRICE,MULTIPLE__ENTRUST_NO_PRICE,MULTIPLE__ENTRUST_PRICE,MULTIPLE__AUCTION_PRICE
 */
export const getOrder = (
  entrustInfos: { approval: boolean; contractAdd: string; tokenId: number }[],
  expirationHeight: string,
  price: string,
  type: 0 | 1 | 2 | 3 | 4 | 5 | 6
) => {
  return api.post<any>('/order', {
    body: {
      entrustInfos,
      expirationHeight,
      price,
      type
    }
  })
}

/**
 * 获取购买订单信息
 * @param sha3 string
 */
export const buy = (sha3: string) => {
  return api.post<any>(`/order/${sha3}`)
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
  params: PageParam & { projectId?: number; orderType: string; itemOrder: string; address?: string }
) => {
  return api.get<IListResponse<IAsset>>('/asset', {
    params
  })
}

export const getProjectList = () => {
  return api.get<IResponse<IProject[]>>('/projects')
}

// 排行榜
export const getRanking = (
  params: PageParam & {
    type: AssetType
    itemOrder: string
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
