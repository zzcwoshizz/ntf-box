import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'

import Filter from './components/Filter'

const Market: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <div className="container">
        <Filter />
        <div></div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          width: ${containerWidth}px;
          margin: 32px auto;
        }
      `}</style>
    </>
  )
}

export default Market
