import { Typography } from 'antd'
import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'

import Filter from './components/Filter'
import List from './components/List'

const { Title } = Typography

const Ranking: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <div className="container">
        <Title level={2} style={{ textIndent: 24 }}>
          DAPP Ranking
        </Title>
        <div className="content">
          <Filter />
          <div className="list">
            <List />
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
        }

        .content {
          padding: 24px;
          background-color: #fff;
        }
      `}</style>
    </>
  )
}

export default Ranking
