import React from 'react'

import { AssetFilter } from '@/components/Asset'
import useContainer from '@/shared/hooks/useContainer'

import ActivityContent from './components/ActivityContent'

const Activity: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <div className="container">
        <div className="left">
          <AssetFilter />
        </div>
        <div className="right">
          <ActivityContent />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          justify-activitycontent: space-between;
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
