import { Col, Row, Typography } from 'antd'
import React from 'react'

import useContainer from '@/shared/hooks/useContainer'

const { Title, Text } = Typography

const Intro: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <div className="intro">
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: 10 }}>
            <img className="desc" src="/imgs/home/intro.png" alt="ntf box" />
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 11, offset: 1 }} style={{ padding: 10 }}>
            <Title level={3}>Introduce the original intention and vision of the platform</Title>
            <Text type="secondary">
              You should know how much wealth you idle. You should know how much wealth you idle.
              You should know how much wealth you idle. You should know how much wealth you idle
            </Text>
          </Col>
        </Row>
      </div>
      <style jsx>{`
        .intro {
          width: ${containerWidth}px;
          margin: 0 auto;
          padding: 100px 0;
        }

        img {
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Intro
