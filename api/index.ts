import Cookie from 'js-cookie';

import { API_URL } from '@/api/config';
import {
  ActivityType,
  AssetOrderType,
  AssetType,
  IActivity,
  IAsset,
  IBanner,
  IDealOffer,
  IHelp,
  IListResponse,
  INetActivity,
  IOffer,
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
} from '@/api/types';
import { Api } from '@/api/util';
import { getCache } from '@/utils/cache';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = process.browser ? '/api' : API_URL;
} else {
  baseURL = process.browser ? '/api' : API_URL;
}

export const getApi = (): Api => {
  return new Api(baseURL, {
    timeout: 30000,
    headers: {
      jwt: process.browser ? getCache('token') ?? '' : ''
    }
  });
};

export const getBanner = () => {
  return getApi().get<IResponse<IBanner[]>>('/home/banner');
};

export const subscribe = (email: string) => {
  return getApi().post('/email', { body: { email } });
};

// 获取用户登录信息
export const getUser = (headers: { address: string; token: string }) => {
  return getApi().get<IResponse<IUser>>('/user', {
    headers: {
      address: headers.address,
      jwt: headers.token
    }
  });
};

export const putUser = (body: IUserPayload) => {
  return getApi().put<IResponse<any>>('/user', {
    body
  });
};

/**
 * 获取订单信息
 */
export const getOrder = (
  entrustInfos: { approval: boolean; contractAdd: string; tokenId: string }[],
  expirationHeight: string,
  price: string,
  type: AssetOrderType,
  auctionEndTime?: number
) => {
  return getApi().post<IResponse<any>>('/order', {
    body: {
      entrustInfos,
      expirationHeight,
      price,
      type,
      auctionEndTime
    }
  });
};

/**
 * 下单校验
 */
export const verifyOrder = (body: { orderId: string; signature: string }) => {
  return getApi().post<IResponse<any>>('/verify/order', {
    body
  });
};

/**
 * 取消订单
 */
export const cancelOrder = (orderId: string) => {
  return getApi().post<IResponse<any>>(`/cancel/order/${orderId}`);
};

/**
 * 获取购买订单信息
 */
export const buy = (orderId: string) => {
  return getApi().post<IResponse<any>>(`/order/${orderId}`);
};

/**
 * 获取主页热门商品
 */
export const getHotGoods = () => {
  return getApi().get<IResponse<IAsset[]>>('/home/hot');
};

/**
 * 获取主页最新商品
 */
export const getLatestGoods = () => {
  return getApi().get<IResponse<IAsset[]>>('/home/news');
};

/**
 * 获取商品
 */
export const getAssetList = (
  params: PageParam & {
    projectId?: number;
    orderType: OrderType;
    itemOrder: ItemOrder;
    address?: string;
  }
) => {
  return getApi().get<IListResponse<IAsset>>('/asset', {
    params
  });
};

export const getProjectList = (params: { address?: string }) => {
  return getApi().get<IResponse<IProject[]>>('/projects', { params });
};

export const getProject = (id: number) => {
  return getApi().get<IResponse<IProject>>(`/project/${id}`);
};

// 排行榜
export const getRanking = (
  params: PageParam & {
    type: AssetType;
    itemOrder: ItemOrder;
    order: 'desc' | 'asc';
  }
) => {
  return getApi().get<IListResponse<IRanking>>('/rank', { params });
};

export const getActivity = (
  params: PageParam & {
    projectId?: number;
    type: ActivityType;
    address?: string;
  }
) => {
  return getApi().get<IListResponse<IActivity>>('/activity', {
    params
  });
};

export const getToken = (params: { contractAdd: string; tokenId: string }) => {
  return getApi().get<IResponse<IToken>>('/token/detail', { params });
};

// 修改价钱
export const modifyPrice = (body: { orderId: string; price: string; signature: string }) => {
  return getApi().put('/order/price', { body });
};

export const getAsset = (params: { orderId: string }) => {
  return getApi().get<IResponse<IAsset>>('/order/detail', { params });
};

// 获取物品的拥有者
export const getTokenOwner = (
  params: PageParam & {
    tokenId: string;
    contractAdd: string;
  }
) => {
  return getApi().get<IListResponse<ITokenOwner>>('/token/owner', { params });
};

// 获取Token全网交易记录
export const getNetActivity = (
  params: PageParam & {
    tokenId: string;
    contractAdd: string;
  }
) => {
  return getApi().get<IListResponse<INetActivity>>('/token/activity', { params });
};

export const getHelp = (params: PageParam & { search?: string }, headers: { lan: 'zh' | 'en' }) => {
  return getApi().get<IListResponse<IHelp>>('/help', {
    params,
    headers
  });
};

export const getTransfer = (params: { contractAdd: string; to: string; tokenId: string }) => {
  return getApi().get<IResponse<any>>('/gift', { params });
};

// 获取竞价列表
export const getOfferList = (orderId: string, params: PageParam) => {
  return getApi().get<IListResponse<IOffer>>(`/auction/${orderId}`, {
    params
  });
};

// 竞价
export const offer = (orderId: string, body: { price: string }) => {
  return getApi().post(`/bidding/${orderId}`, {
    body
  });
};

// 取消竞价
export const cancelOffer = (orderId: string) => {
  return getApi().post(`/cancel/Bidding/${orderId}`);
};

// 拍卖，卖房主动成交
export const dealOffer = (orderId: string) => {
  return getApi().post<IResponse<IDealOffer>>(`/auction/deal/${orderId}`);
};
