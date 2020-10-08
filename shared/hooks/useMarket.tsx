import React from 'react'

import { buy as buyApi, getOrder } from '@/api'

import { MARKET_ABI } from '../constants'
import { useApp } from '../providers/AppProvider'
import useERC721 from './useERC721'

const useMarket = (marketAddress: string, erc721Address: string) => {
  const { web3, account } = useApp()
  const { isApprovedForAll, setApprovalForAll } = useERC721(erc721Address)

  const market = React.useMemo(() => {
    return new web3.eth.Contract(MARKET_ABI, marketAddress)
  }, [web3, marketAddress])

  const makeOrder = async (
    entrustInfos: { approval: boolean; contractAdd: string; tokenId: number }[],
    expirationHeight: string,
    price: string,
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6
  ): Promise<any> => {
    if (!account) {
      return
    }

    const approved = await isApprovedForAll(marketAddress)
    if (!approved) {
      await setApprovalForAll(marketAddress)
    }

    const data = await getOrder(entrustInfos, expirationHeight, price, type)

    const signature = await web3.eth.personal.sign(data.orderHash, account, '')
    const r = signature.slice(0, 66)
    const s = '0x' + signature.slice(66, 130)
    const v = '0x' + signature.slice(130, 132)

    return market.methods
      .createOrder(
        data.orderId,
        data.entrustInfos.map((d: { contractAdd: any }) => d.contractAdd),
        ['0x0000000000000000000000000000000000000000', data.seller],
        data.salt,
        [data.price + '', data.price + ''],
        data.entrustInfos.map((d: { tokenId: any }) => d.tokenId),
        [data.platformFee + '', '0', '0'],
        data.orderType,
        v,
        r,
        s
      )
      .send({ from: account })
  }

  const buy = async (sha3: string) => {
    const { data } = await buyApi(sha3)
    const r = ('0x' + data.sign).slice(0, 66)
    const s = '0x' + ('0x' + data.sign).slice(66, 130)
    const v = '0x' + ('0x' + data.sign).slice(130, 132)

    return market.methods
      .dealOrder(
        data.orderId,
        data.entrustInfos.map((d: any) => d.contractAdd),
        [data.buyer, data.seller],
        data.salt,
        [data.price, data.dealPrice],
        data.entrustInfos.map((d: any) => d.tokenId),
        [data.platformFee + '', '0', '0'],
        data.createHeight,
        data.orderType,
        v,
        r,
        s
      )
      .send({ from: account, value: data.dealPrice })
  }

  return { makeOrder, buy }
}

export default useMarket
