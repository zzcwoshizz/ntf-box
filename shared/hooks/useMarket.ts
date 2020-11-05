import { BigNumber, utils } from 'ethers'
import React from 'react'

import { IToken } from '@/api/types'

import { DEFAULT_CHAIN_ID, MARKET_ABI, MARKET_ADDRESS } from '../constants'
import { useApi } from '../providers/ApiProvider'
import { useTransaction } from '../providers/TransactionProvider'
import { useActiveWeb3React } from '.'
import useContract from './useContract'

const useMarket = (tokens: IToken[]) => {
  const { buy: buyApi, getOrder, modifyPrice, verifyOrder } = useApi()
  const { account, library, chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React()
  const { addBuyTransaction, toogleVisible } = useTransaction()

  const market = useContract(MARKET_ADDRESS[chainId], MARKET_ABI)

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
  const makeOrder = React.useCallback(
    async (expirationHeight: string, price: string, type: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
      if (!account || !library) {
        return
      }

      if (tokens.length === 0) {
        return
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

      const signature = await library.send('personal_sign', [data.orderHash, account])

      await verifyOrder({
        orderId: data.orderId,
        signature
      })

      return data.orderId
    },
    [tokens, account, library, chainId, market, getOrder, verifyOrder]
  )

  const buy = React.useCallback(
    async (orderId: string) => {
      if (!account || !library) {
        return
      }

      if (tokens.length === 0) {
        return
      }

      const { data } = await buyApi(orderId)
      const r = data.sign.slice(0, 64)
      const s = data.sign.slice(64, 128)
      const v = data.sign.slice(128, 130)

      const { hash } = await market.functions.dealOrder(
        data.orderId,
        data.entrustInfos.map((d: any) => d.contractAdd),
        [data.buyer, data.seller],
        data.salt,
        [data.price, data.dealPrice],
        data.entrustInfos.map((d: any) => utils.hexlify(BigNumber.from(d.tokenId))),
        [data.platformFee + '', '0', '0'],
        data.createHeight,
        data.orderType,
        [
          '0x' +
            Array.from({ length: 64 - v.length })
              .map(() => '0')
              .join('') +
            v,
          '0x' + r,
          '0x' + s
        ],
        data.transferFuncEncodes,
        { value: data.dealPrice }
      )
      addBuyTransaction({
        transactionHash: hash,
        token: {
          tokenId: data.entrustInfos[0].tokenId,
          contractAdd: data.entrustInfos[0].contractAdd,
          type: 'ERC721'
        },
        status: 'pending',
        type: 'buy'
      })
      toogleVisible(hash)
    },
    [tokens, account, library, chainId, market, buyApi, addBuyTransaction]
  )

  const changePrice = React.useCallback(
    async (orderId: string, newPrice: string) => {
      if (!account || !library) {
        return
      }

      const signature = await library.getSigner().signMessage(JSON.stringify({ orderId, newPrice }))

      return await modifyPrice({ orderId, price: newPrice, signature })
    },
    [account, library, modifyPrice]
  )

  return {
    makeOrder,
    buy,
    changePrice
  }
}

export default useMarket
