import React from 'react'

import { ActivityContent } from '@/components/Activity'
import { injected } from '@/connectors'
import { useActiveWeb3React } from '@/shared/hooks'
import useContainer from '@/shared/hooks/useContainer'
import { ActivityProvider } from '@/shared/providers/ActivityProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import Filter from './components/ActivityFilter'

const Activity: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const { account, activate, active } = useActiveWeb3React()

  React.useEffect(() => {
    if (!active) {
      activate(injected)
    }
  }, [active])

  return (
    <>
      {account && (
        <ProjectProvider address={account}>
          <ActivityProvider address={account}>
            <div className="container">
              <div className="left">
                <Filter />
              </div>
              <div className="right">
                <ActivityContent />
              </div>
            </div>
          </ActivityProvider>
        </ProjectProvider>
      )}
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
