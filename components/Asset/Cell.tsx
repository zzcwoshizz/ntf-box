import { Space, Tooltip } from 'antd';
import { utils } from 'ethers';
import React from 'react';

import { IAsset } from '@/api/types';
import PriceSvg from '@/icons/icon_price.svg';
import TimeSvg from '@/icons/icon_time.svg';
import TotalSvg from '@/icons/icon_total.svg';
import SelectSvg from '@/icons/icon_xz.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useChain } from '@/shared/providers/ChainProvier';
import { hex2rgba } from '@/utils/color';

import BlockLeft from '../Chain/BlockLeft';
import Img from '../Img';

interface Props {
  showSelect?: boolean; // 是否显示选择框
  selected?: boolean; // 选中状态
  asset: IAsset;
  onClick?(): void;
  onSelect?(): void;
}

const Cell: React.FunctionComponent<Props> = ({
  asset,
  showSelect = false,
  selected = false,
  onClick,
  onSelect
}) => {
  const theme = useTheme();
  const { block } = useChain();

  if (!asset) {
    return null;
  }

  return (
    <>
      <div
        className={'cell' + (showSelect && selected ? ' cell-select' : '')}
        onClick={() => onClick?.()}
      >
        {showSelect && (
          <div
            className="cell__select"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            style={{ display: selected ? 'block' : undefined }}
          >
            <SelectSvg />
          </div>
        )}
        <Img src={asset.tokens?.[0]?.images?.[0]} />
        <div className="content">
          <p>
            {asset.tokens?.[0]?.name ?? '- -'}
            <span>
              <TotalSvg />
              <label style={{ marginLeft: 4 }}>{asset.num}</label>
            </span>
          </p>
          <Tooltip title={asset.tokens?.[0].des ?? '--'}>
            <h6>{asset.tokens?.[0].des ?? '--'}</h6>
          </Tooltip>
          <div className="detail">
            {asset.dealPrice && (
              <span>
                <Space>
                  <PriceSvg />
                  <label className="price">{utils.formatEther(asset.dealPrice)}E</label>
                </Space>
              </span>
            )}
            {asset.expirationHeight && block && (
              <span className="time">
                <Space>
                  <TimeSvg />
                  <BlockLeft block={Number(asset.expirationHeight)} formatType="time" />
                </Space>
              </span>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .cell {
          position: relative;

          width: 100%;
          height: 260px;
          border: 1px solid ${theme['@border-color-base']};

          background: #fff;
          box-shadow: 0px 2px 20px 0px rgba(60, 77, 111, 0.1);
          border-radius: 4px;

          overflow: hidden;
          cursor: ${onClick ? 'pointer' : 'default'};
        }
        .cell-select {
          border: 2px solid #99bbff;
          background: rgba(69, 114, 204, 0.2);
        }

        .cell__select {
          position: absolute;
          right: 0;
          top: 0;
          display: none;
          cursor: pointer;
        }
        .cell__select > :global(svg rect) {
          fill: ${selected ? theme['@primary-color'] + ' !important' : theme['@primary-color']};
          stroke-width: ${selected ? undefined : '1px'};
          stroke: ${selected ? undefined : '#000'};
          opacity: ${selected ? 1 + ' !important' : 0.15};
        }
        .cell__select > :global(svg:hover rect) {
          opacity: 0.5;
        }
        .cell:hover .cell__select {
          display: block;
        }

        .cell :global(.ant-image-img) {
          display: block;
          width: 100%;
          height: 141px;

          object-fit: contain;
          object-position: center;
          background-color: ${hex2rgba(theme['@primary-color'], 0.06)};
        }

        .content {
          padding: 10px;
        }
        .content > p {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 0 0 6px 0;

          color: ${theme['@disabled-color']};
          font-size: 12px;
        }
        .content > p > span {
          display: inline-flex;
          align-items: center;
        }
        .content > h6 {
          margin: 0 0 12px 0;
          height: 40px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
          line-height: 20px;
        }

        .detail {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .detail > span {
          display: inline-flex;
          align-items: center;
        }
        .price {
          font-size: 20px;
          font-weight: bold;
          color: ${theme['@primary-color']};
          line-height: 20px;
        }
        .time {
          padding: 0 10px;

          color: ${theme['@disabled-color']};
          line-height: 16px;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;

          background: rgba(69, 114, 204, 0.06);
        }
      `}</style>
    </>
  );
};

export default Cell;
