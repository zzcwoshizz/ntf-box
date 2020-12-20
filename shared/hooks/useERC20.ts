import { BigNumber } from 'ethers';
import React from 'react';

import { ERC20_ABI } from '../constants';
import { useActiveWeb3React } from '.';
import useContract from './useContract';

const useERC20 = (contractAddress: string) => {
  const { account } = useActiveWeb3React();
  const contract = useContract(contractAddress, ERC20_ABI);

  const allowance = React.useCallback(
    async (address: string): Promise<string> => {
      if (!account) {
        return '0';
      }

      return (await contract.functions.allowance(account, address))[0];
    },
    [account, contract]
  );

  const transfer = React.useCallback(
    async (address: string, amount: string) => {
      if (!account) {
        return;
      }

      const { hash } = await contract.functions.transfer(address, amount);

      return hash as string;
    },
    [account, contract]
  );

  const approve = React.useCallback(
    async (address: string, value: string): Promise<string | undefined> => {
      if (!account) {
        return;
      }

      const { hash } = await contract.functions.approve(address, value);

      return hash;
    },
    [account, contract]
  );

  const totalSupply = React.useCallback(async (): Promise<BigNumber> => {
    return (await contract.functions.totalSupply())[0];
  }, [contract]);

  const balanceOf = React.useCallback(
    async (address: string): Promise<BigNumber> => {
      return (await contract.functions.balanceOf(address))[0];
    },
    [contract]
  );

  return { allowance, approve, transfer, totalSupply, balanceOf };
};

export default useERC20;
