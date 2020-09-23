import { Tooltip } from 'antd'
import React from 'react'

import PriceSvg from '@/icons/icon_price.svg'
import TimeSvg from '@/icons/icon_time.svg'
import TotalSvg from '@/icons/icon_total.svg'
import useTheme from '@/shared/hooks/useTheme'

const Cell: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <div className="cell">
        <img src="" alt="asset" />
        <div className="content">
          <p>
            Brave Frontier Heroes
            <span>
              <TotalSvg />
              <label style={{ marginLeft: 4 }}>22</label>
            </span>
          </p>
          <Tooltip title={'Speial Golem ID #12312319223012 30xJacka(Meteotite)'}>
            <h6>Speial Golem ID #12312319223012 30xJacka(Meteotite)</h6>
          </Tooltip>
          <div className="detail">
            <span>
              <PriceSvg />
              <label className="price">0.32E</label>
            </span>
            <span className="time">
              <TimeSvg />
              20Hour 38Min
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cell {
          width: 100%;
          height: 260px;
          border: 1px solid ${theme['@border-color-base']};

          background: #fff;
          box-shadow: 0px 2px 20px 0px rgba(60, 77, 111, 0.1);
          border-radius: 8px;

          overflow: hidden;
          cursor: pointer;
        }

        .cell > img {
          display: block;
          width: 100%;
          height: 141px;

          object-fit: cover;
          object-position: center;
          background-color: ghostwhite;
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
        .detail :global(svg) {
          margin-right: 4px;
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
  )
}

export default Cell