import React from 'react'

const Container: React.FunctionComponent = ({ children }) => {
  return (
    <div className="container">
      {React.Children.map(children, (child, index) => {
        return child ? (
          <div className="cell-wrapper" key={index}>
            {child}
          </div>
        ) : null
      })}
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
        }

        .cell-wrapper {
          width: 283px;
          margin: 0 22px 22px 0;
        }
        @media screen and (min-width: 1600px) {
          .container > .cell-wrapper:nth-of-type(4n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 1600px) and (min-width: 1201px) {
          .cell-wrapper {
            width: 311px;
          }
          .container > .cell-wrapper:nth-of-type(3n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 1200px) and (min-width: 993px) {
          .cell-wrapper {
            width: 409px;
          }
          .container > .cell-wrapper:nth-of-type(2n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 992px) and (min-width: 769px) {
          .cell-wrapper {
            width: 319px;
          }
          .container > .cell-wrapper:nth-of-type(2n) {
            margin-right: 0;
          }
        }

        @media screen and (max-width: 768px) {
          .cell-wrapper {
            width: 100%;
          }
          .container > .cell-wrapper:nth-of-type(1n) {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default Container
