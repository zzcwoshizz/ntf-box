import React from 'react'
import { useWallet } from 'use-wallet'

import Content from '@/containers/Market/components/Content'
import useContainer from '@/shared/hooks/useContainer'
import { useApp } from '@/shared/providers/AppProvider'
import { AssetProvider } from '@/shared/providers/AssetProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import Filter from './components/AssetFilter'

const Items: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const { connect, account } = useApp()
  const wallet = useWallet()

  React.useEffect(() => {
    if (wallet.status !== 'connected') {
      connect('injected')
    }
  }, [])

  return (
    <>
      <ProjectProvider>
        {wallet.status === 'connected' && (
          <AssetProvider account={account}>
            <div className="container">
              <div className="left">
                <Filter />
              </div>
              <div className="right">
                <Content />
              </div>
            </div>
          </AssetProvider>
        )}
      </ProjectProvider>
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

export default Items
