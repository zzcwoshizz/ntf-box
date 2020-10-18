import React from 'react'

import { buy as buyApi, getOrder, modifyPrice, verifyOrder } from '@/api'
import { IToken } from '@/api/types'

import { MARKET_ABI } from '../constants'
import { useApp } from '../providers/AppProvider'
import useERC721 from './useERC721'

const useMarket = (
  tokens: IToken[],
  marketAddress = '0x4eB7c32b63345240b11A42dD3F421bf5Ecfdab1C'
) => {
  const { web3, account } = useApp()
  const erc721 = useERC721()

  const market = React.useMemo(() => {
    return new web3.eth.Contract(MARKET_ABI, marketAddress)
  }, [web3, marketAddress])

  return React.useMemo(() => {
    /**
     * type
     * 0  单个商品，直接出售挂单 不可还价
     * 1  单个商品，直接出售挂单 可还价
     * 2  单个商品，拍卖
     * 3 捆绑商品，直接出售挂单 不可还价
     * 4 捆绑商品，直接出售挂单 可还价
     * 5 捆绑商品，进行拍卖
     * 6 转赠
     */
    const makeOrder = async (
      expirationHeight: string,
      price: string,
      type: 0 | 1 | 2 | 3 | 4 | 5 | 6
    ): Promise<any> => {
      if (!account) {
        return
      }

      if (tokens.length === 0) {
        return
      }

      for (const token of tokens) {
        const { isApprovedForAll, setApprovalForAll } = erc721.getMethods(token.contractAdd)
        const approved = await isApprovedForAll(marketAddress)

        if (!approved) {
          await setApprovalForAll(marketAddress)
        }
      }

      const { data } = await getOrder(
        tokens.map((token) => ({
          approval: true,
          contractAdd: token.contractAdd,
          tokenId: token.tokenId
        })),
        expirationHeight,
        price,
        type
      )

      const signature = await web3.eth.personal.sign(data.orderHash, account, '')

      await verifyOrder({
        orderId: data.orderId,
        signature
      })

      return data.orderId
    }

    const buy = async (orderId: string) => {
      if (!account) {
        return
      }

      if (tokens.length === 0) {
        return
      }

      const { data } = await buyApi(orderId)
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

    const changePrice = async (orderId: string, newPrice: string) => {
      if (!account) {
        return
      }

      const signature = await web3.eth.personal.sign(
        JSON.stringify({ orderId, newPrice }),
        account,
        ''
      )

      return await modifyPrice({ orderId, price: newPrice, signature })
    }

    return { makeOrder, buy, changePrice }
  }, [web3, account, market, erc721, tokens])
}

export default useMarket
