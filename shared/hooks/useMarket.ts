import React from 'react';

import { buy as buyApi, getOrder, modifyPrice, verifyOrder } from '@/api';
import { AssetOrderType, IToken } from '@/api/types';

import { DEFAULT_CHAIN_ID, MARKET_ABI, MARKET_ADDRESS } from '../constants';
import { useTransaction } from '../providers/TransactionProvider';
import { useActiveWeb3React } from '.';
import useContract from './useContract';

const useMarket = (tokens: IToken[]) => {
  const { account, library, chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React();
  const { addBuyTransaction, toogleVisible } = useTransaction();

  const market = useContract(MARKET_ADDRESS[chainId], MARKET_ABI);

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
    async (
      expirationHeight: string,
      price: string,
      type: AssetOrderType,
      auctionEndTime?: number
    ) => {
      if (!account || !library) {
        return;
      }

      if (tokens.length === 0) {
        return;
      }

      const { data } = await getOrder(
        tokens.map((token) => ({
          approval: true,
          contractAdd: token.contractAdd,
          tokenId: token.tokenId
        })),
        expirationHeight,
        price,
        type,
        auctionEndTime
      );

      // const signature = await library.send('personal_sign', [data.orderHash, account])
      const signature = await library.getSigner().signMessage(data.orderHash);

      await verifyOrder({
        orderId: data.orderId,
        signature
      });

      return data.orderId;
    },
    [tokens, account, library]
  );

  const buy = React.useCallback(
    async (orderId: string) => {
      if (!account || !library) {
        return;
      }

      if (tokens.length === 0) {
        return;
      }

      const { data } = await buyApi(orderId);
      const r = data.sign.slice(0, 64);
      const s = data.sign.slice(64, 128);
      const v = data.sign.slice(128, 130);

      const { hash } = await market.functions.dealOrder(
        data.orderId,
        data.entrustInfos.map((d: any) => d.contractAdd),
        [data.buyer, data.seller],
        data.salt,
        [data.price, data.dealPrice],
        [data.platformFee + '', '0', '0'],
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
      );

      addBuyTransaction({
        transactionHash: hash,
        token: {
          tokenId: data.entrustInfos[0].tokenId,
          contractAdd: data.entrustInfos[0].contractAdd,
          type: 'ERC721'
        },
        status: 'pending',
        type: 'buy'
      });
      toogleVisible(hash);
    },
    [account, library, tokens.length, market.functions, addBuyTransaction, toogleVisible]
  );

  const changePrice = React.useCallback(
    async (orderId: string, newPrice: string) => {
      if (!account || !library) {
        return;
      }

      const signature = await library
        .getSigner()
        .signMessage(JSON.stringify({ orderId, newPrice }));

      return await modifyPrice({ orderId, price: newPrice, signature });
    },
    [account, library]
  );

  return {
    makeOrder,
    buy,
    changePrice
  };
};

export default useMarket;
