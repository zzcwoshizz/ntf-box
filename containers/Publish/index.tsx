import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'
import useTheme from '@/shared/hooks/useTheme'

import Info from './components/Info'
import Preview from './components/Preview'
import { DataProvider } from './context'

const Publish: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const theme = useTheme()

  return (
    <>
      <Header />
      <DataProvider>
        <div className="container">
          <div className="left">
            <Info />
          </div>
          <div className="right">
            <Preview />
          </div>
        </div>
      </DataProvider>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          width: ${containerWidth}px;
          margin: 32px auto;
          padding: 24px;
          border: 1px solid ${theme['@border-color-base']};

          background: #ffffff;
          border-radius: 4px;
        }
        .left {
          flex: 0 1 auto;
          width: 63%;
        }
        .right {
          flex: 1 0 auto;
          width: calc(37% - 40px);
          margin-left: 40px;
          padding: 24px;
          border: 1px solid ${theme['@border-color-base']};

          background: #fff;
          box-shadow: 0px 2px 20px 0px rgba(60, 77, 111, 0.1);
          border-radius: 4px;
        }
      `}</style>
    </>
  )
}

export default Publish
