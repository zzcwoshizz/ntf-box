import React from 'react';

const Container: React.FunctionComponent<{ size?: 'lg' | 'sm' }> = ({ children, size = 'lg' }) => {
  return (
    <div className={'container' + ' container-' + size}>
      {React.Children.map(children, (child, index) => {
        return child ? (
          <div className="cell-wrapper" key={index}>
            {child}
          </div>
        ) : null;
      })}
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
        }

        .container-lg .cell-wrapper {
          width: calc((100% - 66px) / 4);
          margin: 0 22px 22px 0;
        }
        .container-sm .cell-wrapper {
          width: calc((100% - 48px) / 4);
          margin: 0 16px 16px 0;
        }
        @media screen and (min-width: 1601px) {
          .container-lg > .cell-wrapper:nth-of-type(4n) {
            margin-right: 0;
          }

          .container-sm > .cell-wrapper:nth-of-type(4n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 1600px) and (min-width: 1201px) {
          .container-lg > .cell-wrapper {
            width: calc((100% - 44px) / 3);
          }
          .container-lg > .cell-wrapper:nth-of-type(3n) {
            margin-right: 0;
          }

          .container-sm > .cell-wrapper {
            width: calc((100% - 32px) / 3);
          }
          .container-sm > .cell-wrapper:nth-of-type(3n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 1200px) and (min-width: 769px) {
          .container-lg > .cell-wrapper {
            width: calc((100% - 22px) / 2);
          }
          .container-lg > .cell-wrapper:nth-of-type(2n) {
            margin-right: 0;
          }

          .container-sm > .cell-wrapper {
            width: 100%;
          }
          .container-sm > .cell-wrapper:nth-of-type(1n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 768px) {
          .container-lg > .cell-wrapper {
            width: 100%;
          }
          .container-lg > .cell-wrapper:nth-of-type(1n) {
            margin-right: 0;
          }

          .container-sm > .cell-wrapper {
            width: 100%;
          }
          .container-sm > .cell-wrapper:nth-of-type(1n) {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Container;
