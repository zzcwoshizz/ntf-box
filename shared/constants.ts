import { AssetType } from '@/api/types'

export const ERC721_ABI = JSON.parse(
  '[{"constant":false,"inputs":[{"name":"_owner","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"generateGoods","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_tokenId","type":"uint256"}],"name":"safetransferFrom","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_operator","type":"address"},{"name":"_approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getGoods","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]'
)

export const ERC20_ABI = JSON.parse(
  '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]'
)

export const SIGN_TEXT = 'Welcome to NftBox!'

export const AVATAR_URL = 'https://robohash.org/'

export const RPC_URLS: { [key: string]: string } = {
  '1': 'https://mainnet.eth.aragon.network',
  '4': 'https://rinkeby.eth.aragon.network'
}

export const SCAN_URLS: { [key: string]: string } = {
  '1': 'https://etherscan.io',
  '4': 'https://rinkeby.etherscan.io'
}

export const MAX_VALUE = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'

export const MARKET_ABI = JSON.parse(
  '[{"constant":true,"inputs":[{"name":"orderHash","type":"bytes32"}],"name":"orderExist","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orderId","type":"uint256"},{"name":"contractAdds","type":"address[]"},{"name":"operator","type":"address[]"},{"name":"expirationHeight","type":"uint256"},{"name":"price","type":"uint256[]"},{"name":"goodsIds","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"createHeight","type":"uint256"},{"name":"orderType","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"dealOrder","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"orderId","type":"uint256"},{"name":"contractAdds","type":"address[]"},{"name":"operator","type":"address[]"},{"name":"expirationHeight","type":"uint256"},{"name":"price","type":"uint256[]"},{"name":"goodsIds","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"orderType","type":"uint256"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"createOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"orderId","type":"uint256"},{"name":"contractAdds","type":"address[]"},{"name":"operator","type":"address[]"},{"name":"expirationHeight","type":"uint256"},{"name":"price","type":"uint256[]"},{"name":"goodsIds","type":"uint256[]"},{"name":"fee","type":"uint256[]"},{"name":"orderType","type":"uint256"},{"name":"createHeight","type":"uint8"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"cannelOrder","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hashOrder","type":"bytes32"},{"indexed":false,"name":"orderId","type":"uint256"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"ordertype","type":"uint256"},{"indexed":false,"name":"platformFee","type":"uint256"},{"indexed":false,"name":"createHeight","type":"uint256"},{"indexed":false,"name":"expirationHeight","type":"uint256"}],"name":"entrust_order_info","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"contractAdds","type":"address[]"}],"name":"entrust_order_contractadd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"goodsIds","type":"uint256[]"}],"name":"entrust_order_goods","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hashOrder","type":"bytes32"},{"indexed":false,"name":"contractAdds","type":"address[]"},{"indexed":false,"name":"goodsIds","type":"uint256[]"},{"indexed":false,"name":"orderId","type":"uint256"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"salt","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"},{"indexed":false,"name":"ordertype","type":"uint256"},{"indexed":false,"name":"platformFee","type":"uint256"},{"indexed":false,"name":"createHeight","type":"uint256"},{"indexed":false,"name":"expirationHeight","type":"uint256"}],"name":"cannel_order","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"hashOrderSeller","type":"bytes32"},{"indexed":false,"name":"hashOrderBuy","type":"bytes32"},{"indexed":false,"name":"orderId","type":"uint256"},{"indexed":false,"name":"seller","type":"address"},{"indexed":false,"name":"buyer","type":"address"}],"name":"deal_order","type":"event"}]'
)

export const ASSET_TYPES: { [key in AssetType]: string } = {
  HOT: 'Hot',
  NEW: 'New',
  VIRTUAL_WORLDS: 'Virtual worlds',
  DOMAIN_NAMES: 'Domain names',
  BLOCKCHAIN_ART: 'Blockchain art',
  TRADING_CARDS: 'Trading cards',
  COLLECTIBLES: 'Collectibles',
  SPORTS: 'Sports',
  UTILITY: 'Utility',
  GAME: 'Game'
}
