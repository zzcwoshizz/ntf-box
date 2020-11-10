import React from 'react';

import { useChain } from '@/shared/providers/ChainProvier';

import TimeLeft from '../TimeLeft';

type Props = {
  block: number;
  currentBlock?: number;
  formatType?: 'block' | 'time';
};

const BlockLeft: React.FunctionComponent<Props> = (props) => {
  const { block: _currentBlock } = useChain();
  const { block, currentBlock = _currentBlock, formatType = 'block' } = props;

  if (!currentBlock) {
    return <></>;
  }

  const left = block - currentBlock;
  const timestamp = left * 13 * 1000;

  if (left < 0) {
    return <>{formatType === 'block' ? 'Expired' : <TimeLeft left={timestamp} />}</>;
  } else {
    return <>{formatType === 'block' ? left : <TimeLeft left={timestamp} />}</>;
  }
};

export default BlockLeft;
