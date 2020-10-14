import { Form, Input, Spin, Typography } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

import { getToken } from '@/api'
import EnableButton from '@/components/Button/EnableButton'
import Header from '@/components/Header'
import Img from '@/components/Img'
import { AVATAR_URL } from '@/shared/constants'
import useContainer from '@/shared/hooks/useContainer'
import useERC721 from '@/shared/hooks/useERC721'

const { Title } = Typography

const Transfer: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  const { query } = useRouter()
  const { tokenId, address } = query as { tokenId: string; address: string }

  const { value: token, loading } = useAsync(async () => {
    return (await getToken({ contractAdd: address, tokenId })).data
  }, [tokenId, address])

  const { getMethods } = useERC721()

  const [pending, setPending] = React.useState(false)

  return (
    <>
      <Header />
      <Spin spinning={loading}>
        <div className="container">
          <Img width={156} src={AVATAR_URL + token?.contractAdd} />
          <Title>{token?.name}</Title>
          <Form<{ amount?: string; address: string }>
            style={{ width: '60%' }}
            onFinish={(data) => {
              if (!token) {
                return
              }

              const { safeTransferFrom } = getMethods(token.contractAdd)
              setPending(true)
              safeTransferFrom(data.address, token.tokenId).finally(() => {
                setPending(false)
              })
            }}
            layout="vertical">
            <Form.Item name="amount" label="QUANTITY">
              <Input placeholder="Please input amount" />
            </Form.Item>
            <Form.Item
              name="address"
              label="WALLET ADDRESS OR ENS NAME"
              rules={[{ required: true }]}>
              <Input placeholder="Please input address" />
            </Form.Item>
            <Form.Item>
              <EnableButton
                style={{ width: '100%' }}
                htmlType="submit"
                type="primary"
                size="large"
                loading={pending}>
                TRANSFER
              </EnableButton>
            </Form.Item>
          </Form>
        </div>
      </Spin>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .container {
          width: ${containerWidth}px;
          margin: 25px auto;
          padding: 66px 0;

          background-color: #fff;
        }
      `}</style>
    </>
  )
}

export default Transfer
