import { Col, Row } from 'antd'
import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'

import BundleList from './components/BundleList'
import Info from './components/Info'
import { DataProvider } from './context'

const Publish: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <DataProvider>
        <div className="container">
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 12 }}>
              <Info />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 10, offset: 2 }}>
              <BundleList />
            </Col>
          </Row>
        </div>
      </DataProvider>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 32px auto;
          padding: 24px;
        }
      `}</style>
    </>
  )
}

export default Publish
