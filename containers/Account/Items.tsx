import { useRouter } from 'next/router'
import React from 'react'
import { useWallet } from 'use-wallet'

import { AssetContent } from '@/components/Asset'
import useContainer from '@/shared/hooks/useContainer'
import { useApp } from '@/shared/providers/AppProvider'
import { AssetProvider } from '@/shared/providers/AssetProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import Filter from './components/AssetFilter'

const Items: React.FunctionComponent = () => {
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

  const { query } = useRouter()

  return (
    <>
      {account && (
        <ProjectProvider address={account}>
          <AssetProvider account={account}>
            <div className="container">
              <div className="left">
                <Filter />
              </div>
              <div className="right">
                <AssetContent canSelect={!!query.selType} />
              </div>
            </div>
          </AssetProvider>
        </ProjectProvider>
      )}
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
