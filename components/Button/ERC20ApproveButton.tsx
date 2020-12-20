import { ButtonProps } from 'antd/lib/button';
import { BigNumber } from 'ethers';
import React from 'react';
import { useAsyncRetry } from 'react-use';

import { APPROVE_ADDRESS, DEFAULT_CHAIN_ID, MAX_VALUE } from '@/shared/constants';
import { useActiveWeb3React } from '@/shared/hooks';
import useERC20 from '@/shared/hooks/useERC20';
import useServerError from '@/shared/hooks/useServerError';
import { useTransaction } from '@/shared/providers/TransactionProvider';

import EnableButton from './EnableButton';

interface Props extends ButtonProps {
  name: string;
  address: string;
  approveAddress: string;
}

const ERC20ApproveButton: React.FunctionComponent<Props> = ({
  name,
  address,
  approveAddress,
  ...props
}) => {
  const { account, chainId, library } = useActiveWeb3React();
  const { addApproveTransaction } = useTransaction();
  const { allowance, approve } = useERC20(address);
  const { showError } = useServerError();
  const [loading, setLoading] = React.useState(false);

  const { value: isApproved, retry } = useAsyncRetry(async () => {
    if (account) {
      const value = await allowance(approveAddress);

      return BigNumber.from(value).gt(BigNumber.from('0'));
    }
  }, [account, allowance]);

  let text;

  if (isApproved) {
    text = props.children;
  } else {
    text = `Approve ${name}`;
  }

  const approveToken = React.useCallback(async () => {
    try {
      const to = APPROVE_ADDRESS[chainId || DEFAULT_CHAIN_ID];
      const hash = await approve(to, MAX_VALUE);

      if (hash) {
        addApproveTransaction({
          transactionHash: hash,
          contract: address,
          to,
          type: 'approve',
          status: 'pending'
        });
        await library?.waitForTransaction(hash);
        await retry();
      }
    } catch (error) {
      showError(error);
    }
  }, [addApproveTransaction, address, approve, chainId, library, retry, showError]);

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      if (isApproved) {
        return props.onClick?.(e);
      } else {
        e.preventDefault();
        setLoading(true);
        approveToken().finally(() => {
          setLoading(false);
        });
      }
    },
    [approveToken, isApproved, props]
  );

  return (
    <EnableButton {...props} loading={isApproved ? props.loading : loading} onClick={onClick}>
      {text}
    </EnableButton>
  );
};

export default ERC20ApproveButton;
