import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'

import Content from './components/Content'
import Filter from './components/Filter'

const Market: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <div className="container">
        <div className="left">
          <Filter />
        </div>
        <div className="right">
          <Content />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          width: ${containerWidth}px;
          margin: 32px auto;
        }
        .left {
          flex: 0 0 auto;
        }
        .right {
          flex: 1 1 auto;
        }
      `}</style>
    </>
  )
}

export default Market
