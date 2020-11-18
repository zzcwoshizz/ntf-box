// Api response
export interface IResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface IListResponse<T> {
  endRow: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  list: T[];
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatePages: number;
  navigatepageNums: number[];
  nextPage: number;
  pageNum: number;
  pageSize: number;
  pages: number;
  prePage: number;
  size: number;
  startRow: number;
  total: number;
}

export interface IUser {
  address: string;
  createTime?: string;
  email?: string;
  id?: number;
  newAlert?: number;
  nickName?: string;
  tradeAlert?: number;
  updateTime?: string;
  userId?: number;
  userLevel?: number;
}

export interface IUserPayload {
  email?: string;
  newAlert?: number;
  tradeAlert?: number;
  userName?: string;
}

export interface IBanner {
  id: number;
  imageUrl: string;
  officialWebsite: string;
}

export type ItemOrder = '0' | '1' | '2' | '3' | '4';

export type OrderType = '0' | '1' | '2';

export interface IToken {
  contractAdd: string;
  des?: string;
  images?: string[];
  name?: string;
  orderIds?: [];
  propertys?: any;
  tokenId: string;
  birth?: string;
  type: 'ERC1155' | 'ERC721';
  projectDO?: IProject;
  owner?: boolean;
  owners?: string[];
}

export interface IAsset {
  dealPrice?: string;
  operator: string;
  expirationHeight?: string;
  orderId?: string;
  orderType: string;
  tokens: IToken[];
  viewNum: number;
  num: number;
}

export interface PageParam {
  page: number;
  pageSize: number;
}

export interface IProject {
  alias: string;
  contractAdds?: string[];
  createTime?: string;
  des?: string;
  id: number;
  num: number;
  imageUrl: string;
  images?: string[];
  logoUrl: string;
  name: string;
  status: number;
  type: string;
  telegram: string;
  twitter: string;
  discord: string;
  website: string;
  weight: number;
  avgPrice?: string;
  owners?: string;
  total?: string;
  ranking?: number;
}

export type AssetType =
  | 'HOT'
  | 'NEW'
  | 'VIRTUAL_WORLDS'
  | 'DOMAIN_NAMES'
  | 'BLOCKCHAIN_ART'
  | 'TRADING_CARDS'
  | 'COLLECTIBLES'
  | 'SPORTS'
  | 'UTILITY'
  | 'GAME';

export interface IRanking {
  assets: number;
  avgPrice: string;
  createTime: string;
  id: number;
  logoUrl: string;
  name: string;
  owners: number;
  projectId: number;
  total: number;
  transactions: number;
  turnoverRate: number;
  type: string;
  types: AssetType[];
}

/**
 * 0 单个商品，直接出售挂单 不可还价
 * 1 单个商品，直接出售挂单 可还价
 * 2 单个商品，拍卖
 * 3 捆绑商品，直接出售挂单 不可还价
 * 4 捆绑商品，直接出售挂单 可还价
 * 5 捆绑商品，进行拍卖
 * 6 转赠
 * 7 下架
 * 8 修改价钱
 * 9 购买
 */
export type ActivityType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
/**
 * 0全部 1上架物品 2出售 3拍卖 4转赠 5下架 6修改价钱 7购买
 */
export type ReqActivityType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 平台实时成交记录
 */
export interface IActivity {
  /**
   * 订单id
   */
  orderId: string;
  /**
   * @description 合约地址
   */
  contractAdd: string;
  /**
   * @description 时间
   */
  createTime: string;
  /**
   * @description 来源地址
   */
  fromAdd: string;
  /**
   * @description 来源用户昵称
   */
  fromName?: string;
  id: number;
  /**
   * @description 初始价格
   */
  price: string;
  /**
   * @description 出售价格
   */
  dealPrice: string;
  /**
   * @description 项目信息
   */
  projectDO?: IProject;
  /**
   * @description 类型
   */
  type: ActivityType;
  /**
   * @description 交易hash
   */
  txid?: string;
  /**
   * @description to address
   */
  toAdd?: string;
  /**
   * @description to name
   */
  toName?: string;
  tokens: IToken[];
}

export interface INetActivity {
  time: string;
  contractAdd: string;
  data: string;
  fromAdd: string;
  height: string;
  id: number;
  logJson: string;
  toAdd: string;
  tokenId: string;
  txid: string;
  nftProjectDO?: IProject;
}

export interface ITokenOwner {
  createTime: string;
  dealPrice: string;
  orderId: string;
  owner: string;
  tokenId: string;
  userName: string;
}

export interface IHelp {
  createTime: string;
  des: string;
  id: number;
  title: string;
}
