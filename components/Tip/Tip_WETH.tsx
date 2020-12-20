import { QuestionCircleFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';

const Tip_WETH: React.FunctionComponent = () => {
  return (
    <Tooltip
      color="white"
      title={
        <div style={{ color: 'black' }}>
          <p style={{ fontSize: 16, textAlign: 'center' }}>什么是W-ETH？</p>
          <p>
            {
              'W-ETH是"包装过的ETH"，是一种加密货币。在Finannel进行拍卖时使用，您可以用WETH同时进行多笔拍卖，只有在真正拍卖交割的时候才会成功扣除WETH。'
            }
          </p>
          <p>{'W-ETH和ETH之间存在1：1交换，因此您随时自主转换。'}</p>
        </div>
      }
      trigger="hover"
    >
      <QuestionCircleFilled style={{ color: '#999' }} />
    </Tooltip>
  );
};

export default Tip_WETH;
