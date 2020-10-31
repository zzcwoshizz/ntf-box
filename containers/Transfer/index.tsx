import { Form, Input, Spin, Typography } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { useAsync } from 'react-use'

import EnableButton from '@/components/Button/EnableButton'
import Header from '@/components/Header'
import Jdenticon from '@/components/Jdenticon'
import useContainer from '@/shared/hooks/useContainer'
import useERC721 from '@/shared/hooks/useERC721'
import useTheme from '@/shared/hooks/useTheme'
import { useApi } from '@/shared/providers/ApiProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'

const { Title } = Typography

const Transfer: React.FunctionComponent = () => {
  const { getToken } = useApi()
  const { containerWidth } = useContainer()
  const theme = useTheme()
  const { t } = useLanguage()

  const { query } = useRouter()
  const { tokenId, address } = query as { tokenId: string; address: string }

  const { value: token, loading } = useAsync(async () => {
    return (await getToken({ contractAdd: address, tokenId })).data
  }, [tokenId, address])
  const [toAddress, setToAddress] = React.useState('')

  const { getMethods } = useERC721()

  const [pending, setPending] = React.useState(false)

  return (
    <>
      <Header />
      <Spin spinning={loading}>
        <div className="container">
          <Jdenticon size={156} value={token?.contractAdd} />
          <Title>{token?.name}</Title>
          <Form<{ amount?: string; address: string }>
            onValuesChange={(values) => {
              setToAddress(values.address)
            }}
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
            <Form.Item name="amount" label={t('transfer.amountLabel')}>
              <Input placeholder={t('transfer.inputAmount')} />
            </Form.Item>
            <Form.Item
              name="address"
              label={t('transfer.addressLabel')}
              rules={[{ required: true }]}>
              <Input placeholder={t('transfer.inputAddress')} />
            </Form.Item>
            <p>{t('transfer.tip', { name: token?.name, address: toAddress })}</p>
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

        p {
          width: 60%;
          margin: 0 auto 24px auto;

          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }
      `}</style>
    </>
  )
}

export default Transfer
