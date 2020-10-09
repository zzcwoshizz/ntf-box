import { Button } from 'antd'
import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'

import Desc from './components/Desc'
import Infos from './components/Infos'

const Asset: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <div className="container">
        <Desc />
        <Infos />
      </div>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
        }
      `}</style>
    </>
  )
}

export default Asset
