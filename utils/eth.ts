import Web3 from 'web3'

import { ERC721_ABI } from '@/shared/constants'

let web3: Web3

export const getWeb3 = (provider?: any): Web3 => {
  if (!web3) {
    if (!provider) {
      throw new Error('invalid provider')
    }
    web3 = new Web3(provider)
  }

  return web3
}

export const getERC721 = (address: string) => {
  const web3 = getWeb3()

  const erc721Contract = new web3.eth.Contract(ERC721_ABI, address)

  return erc721Contract
}
