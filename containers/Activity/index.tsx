import React from 'react'

import { AssetFilter } from '@/components/Asset'
import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'

import Content from './components/Content'

const Activity: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <div className="container">
        <div className="left">
          <AssetFilter />
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
          margin-left: 16px;
        }
      `}</style>
    </>
  )
}

export default Activity
