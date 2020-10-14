import { Button, Col, Input, Row, Typography } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import useContainer from '@/shared/hooks/useContainer'

const { Title, Text } = Typography

const Help: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const router = useRouter()

  const [keys, setKeys] = React.useState('')

  return (
    <>
      <div className="help">
        <div className="content">
          <Title level={3}>Novice help - help you solve problems faster</Title>
          <p>
            <Text>You should know how much wealth you have left unused</Text>
          </p>
          <Row>
            <Col xs={{ span: 24 }} lg={{ span: 16 }} style={{ padding: 10 }}>
              <Input
                size="large"
                placeholder="Search for keywords for questions"
                value={keys}
                onChange={(e) => setKeys(e.target.value)}
              />
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 8 }} style={{ padding: 10 }}>
              <Button size="large" type="primary" onClick={() => router.push(`/help?keys=${keys}`)}>
                Ask for help
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <style jsx>{`
        .help {
          padding: 100px 0;

          background: url(/imgs/home/bg_help.png) no-repeat;
          background-size: cover;
          background-position: center;
        }
        .content {
          width: ${containerWidth * 0.53}px;
          margin: 0 auto;

          text-align: center;
        }

        .content :global(.ant-typography) {
          color: #fff;
        }
        p {
          opacity: 0.8;
        }

        .content :global(.ant-btn) {
          width: 100%;
          background-color: #699bff;
        }

        @media screen and (max-width: 992px) {
          .content {
            width: ${containerWidth}px;
          }
        }
      `}</style>
    </>
  )
}

export default Help
