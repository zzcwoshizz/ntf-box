import React from 'react'
import { useWallet } from 'use-wallet'

import ActivityContent from '@/containers/Activity/components/Content'
import useContainer from '@/shared/hooks/useContainer'
import { ActivityProvider } from '@/shared/providers/ActivityProvider'
import { useApp } from '@/shared/providers/AppProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import Filter from './components/ActivityFilter'

const Activity: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const { account } = useApp()
  const wallet = useWallet()

  React.useEffect(() => {
    if (!account) {
      setTimeout(() => {
        wallet.connect('injected')
      }, 1000)
    }
  }, [account])

  return (
    <>
      <ProjectProvider address={account}>
        <ActivityProvider account={account}>
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
