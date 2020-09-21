import React from 'react'

const Container: React.FunctionComponent = ({ children }) => {
  return (
    <div className="container">
      {children}
      <style jsx>{`
        .container {
          display: flex;
          flex-wrap: wrap;
        }

        .container > :global(.cell):nth-of-type(4n) {
          margin-right: 0;
        }
      `}</style>
    </div>
  )
}

export default Container
