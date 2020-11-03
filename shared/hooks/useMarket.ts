import { Contract, utils } from 'ethers'
import React from 'react'

import { IToken } from '@/api/types'

import { DEFAULT_CHAIN_ID, MARKET_ABI, MARKET_ADDRESS } from '../constants'
import { useApi } from '../providers/ApiProvider'
import { useTransaction } from '../providers/TransactionProvider'
import { useActiveWeb3React } from '.'
import useERC721 from './useERC721'

const useMarket = (tokens: IToken[]) => {
  const { buy: buyApi, getOrder, modifyPrice, verifyOrder } = useApi()
  const { account, library, chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React()
  const { addBuyTransaction, toogleVisible } = useTransaction()
  const erc721 = useERC721()

  const market = React.useMemo(
    () => new Contract(MARKET_ADDRESS[chainId], MARKET_ABI, library?.getSigner()),
    [library, chainId]
  )

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
      if (!account || !library) {
        return
      }

      if (tokens.length === 0) {
        return
      }

      for (const token of tokens) {
        const { isApprovedForAll, setApprovalForAll } = erc721.getMethods(token.contractAdd)
        const approved = await isApprovedForAll(MARKET_ADDRESS[chainId])

        if (approved) {
          await setApprovalForAll(MARKET_ADDRESS[chainId])
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

      const signature = await library.getSigner().signMessage(data.orderHash)

      await verifyOrder({
        orderId: data.orderId,
        signature
      })

      return data.orderId
    }

    const buy = async (orderId: string) => {
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
        data.entrustInfos.map((d: any) => d.tokenId),
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
        { value: data.dealPrice, gasLimit: 10000000 }
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
    }

    const changePrice = async (orderId: string, newPrice: string) => {
      if (!account || !library) {
        return
      }

      const signature = await library.getSigner().signMessage(JSON.stringify({ orderId, newPrice }))

      return await modifyPrice({ orderId, price: newPrice, signature })
    }

    return { makeOrder, buy, changePrice }
  }, [library, account, market, erc721, tokens])
}

export default useMarket
