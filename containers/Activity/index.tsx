import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'
import { ActivityProvider } from '@/shared/providers/ActivityProvider'
import { ProjectProvider } from '@/shared/providers/ProjectProvider'

import Content from './components/Content'
import Filter from './components/Filter'

const Activity: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <ProjectProvider>
        <ActivityProvider>
          <div className="container">
            <div className="left">
              <Filter />
            </div>
            <div className="right">
              <Content />
            </div>
          </div>
        </ActivityProvider>
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

export default Activity
