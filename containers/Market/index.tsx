import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'
import { AssetProvider } from '@/shared/providers/AssetProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import { AssetContent } from '../../components/Asset'
import Filter from './components/Filter'

const Market: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <ProjectProvider>
        <AssetProvider>
          <div className="container">
            <div className="left">
              <Filter />
            </div>
            <div className="right">
              <AssetContent />
            </div>
          </div>
        </AssetProvider>
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

export default Market
