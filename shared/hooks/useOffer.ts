import React from 'react';

import { dealOffer as dealOfferApi } from '@/api';

import { DEFAULT_CHAIN_ID, OFFER_ABI, OFFER_ADDRESS } from '../constants';
import { useActiveWeb3React } from '.';
import useContract from './useContract';

const useOffer = () => {
  const { chainId = DEFAULT_CHAIN_ID } = useActiveWeb3React();

  const offer = useContract(OFFER_ADDRESS[chainId], OFFER_ABI);

  // TODO transaction loading
  const dealOffer = React.useCallback(
    async (orderId: string): Promise<string> => {
      const { data } = await dealOfferApi(orderId);

      const r = data.sign.slice(0, 64);
      const s = data.sign.slice(64, 128);
      const v = data.sign.slice(128, 130);

      const { hash } = await offer.functions.dealOrder(
        data.orderId,
        data.entrustInfos.map((d) => d.contractAdd),
        [data.buyer, data.seller],
        data.auctionEndTime,
        [data.price, data.dealPrice],
        [data.platformFee, '0', '0'],
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
        data.erc20FuncEncodes,
        data.erc20ContractAdd
      );

      return hash;
    },
    [offer.functions]
  );

  return {
    dealOffer
  };
};

export default useOffer;
