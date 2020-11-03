import { useRouter } from 'next/router'
import React from 'react'

import { AssetContent } from '@/components/Asset'
import { injected } from '@/connectors'
import { useActiveWeb3React } from '@/shared/hooks'
import useAutoLogin from '@/shared/hooks/useAutoLogin'
import useContainer from '@/shared/hooks/useContainer'
import { AssetProvider } from '@/shared/providers/AssetProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import Filter from './components/AssetFilter'

const Items: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const { account, activate, active } = useActiveWeb3React()

  React.useEffect(() => {
    if (!active) {
      activate(injected)
    }
  }, [active])
  useAutoLogin()

  const { query } = useRouter()

  return (
    <>
      {account && (
        <ProjectProvider address={account}>
          <AssetProvider address={account}>
            <div className="container">
              <div className="left">
                <Filter />
              </div>
              <div className="right">
                <AssetContent canSelect={!!query.selType} showHead={false} />
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
