import React from 'react';

import AverageSvg from '@/icons/icon_average.svg';
import ItemsSvg from '@/icons/icon_items.svg';
import NumberSvg from '@/icons/icon_number.svg';
import TurnoverSvg from '@/icons/icon_turnover.svg';

const Data: React.FunctionComponent = () => {
  return (
    <>
      <div className="container">
        <div className="cell">
          <div className="info">
            <p>Number of transactions</p>
            <h4>233,894</h4>
          </div>
          <div className="icon">
            <NumberSvg />
          </div>
        </div>
        <div className="cell">
          <div className="info">
            <p>Number of transactions</p>
            <h4>233,894</h4>
          </div>
          <div className="icon">
            <ItemsSvg />
          </div>
        </div>
        <div className="cell">
          <div className="info">
            <p>Number of transactions</p>
            <h4>233,894</h4>
          </div>
          <div className="icon">
            <TurnoverSvg />
          </div>
        </div>
        <div className="cell">
          <div className="info">
            <p>Number of transactions</p>
            <h4>233,894</h4>
          </div>
          <div className="icon">
            <AverageSvg />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 288px;
          height: 102px;
          margin: 0 16px 16px 0;
          padding-left: 24px;

          border-radius: 4px;
        }
        .cell:nth-of-type(1) {
          background: linear-gradient(225deg, #67a8ff 0%, #2078e7 99%);
        }
        .cell:nth-of-type(2) {
          background: linear-gradient(225deg, #4c88ff 0%, #4572cc 100%);
        }
        .cell:nth-of-type(3) {
          background: linear-gradient(225deg, #605ddc 0%, #3e3d93 100%);
        }
        .cell:nth-of-type(4) {
          background: linear-gradient(225deg, #9fa1f1 0%, #696bcd 100%);
        }

        .info p {
          margin: 0;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          line-height: 14px;
        }
        .info h4 {
          margin: 8px 0 0 0;
          font-size: 32px;
          font-weight: bold;
          color: #fff;
          line-height: 32px;
        }

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 100%;

          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.2) 0%,
            rgba(255, 255, 255, 0) 100%
          );
        }

        @media screen and (min-width: 1600px) {
          .container > .cell:nth-of-type(4n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 1600px) and (min-width: 1201px) {
          .cell {
            width: 233px;
            height: 88px;
            padding-left: 12px;
          }
          .container > .cell:nth-of-type(4n) {
            margin-right: 0;
          }

          .info p {
            font-size: 12px;
          }
          .info h4 {
            font-size: 26px;
          }

          .icon {
            width: 60px;

            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.2) 0%,
              rgba(255, 255, 255, 0) 100%
            );
          }
        }

        @media screen and (max-width: 1200px) and (min-width: 769px) {
          .cell {
            width: 49%;
            margin-right: 2%;
          }
          .container > .cell:nth-of-type(2n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 768px) {
          .cell {
            width: 100%;
          }
          .container > .cell:nth-of-type(1n) {
            margin-right: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Data;
