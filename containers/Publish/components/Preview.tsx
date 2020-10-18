import { Form, Space, Typography } from 'antd'
import React from 'react'

import EnableButton from '@/components/Button/EnableButton'
import FhSvg from '@/icons/icon_fh.svg'
import useTheme from '@/shared/hooks/useTheme'
import { useLanguage } from '@/shared/providers/LanguageProvider'

import { useData } from '../context'

const { Text, Title } = Typography

const Preview: React.FunctionComponent = () => {
  const theme = useTheme()
  const { t } = useLanguage()
  const { loading, disabled, tokens, price } = useData()

  return (
    <>
      <div className="container">
        <div className="title">
          <Space align="center">
            <FhSvg />
            {t('publish.preview.title')}
          </Space>
        </div>
        <div className="list">
          <div className="item">
            <span>{t('publish.preview.goods')}:</span>
            <span>{t('publish.preview.count', { count: tokens.length })}</span>
          </div>
          <div className="item">
            <span>{t('publish.preview.price')}:</span>
            <span>{price} ETH</span>
          </div>
          <div className="item">
            <span>{t('publish.preview.end')}:</span>
            <span>{t('publish.preview.endDesc')}</span>
          </div>
        </div>
        <Form.Item>
          <EnableButton
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            disabled={disabled}>
            {t('publish.preview.submit')}
          </EnableButton>
        </Form.Item>
        <div className="tip">
          <Title level={5}>{t('publish.preview.tipTitle')}:</Title>
          <Text type="secondary">
            <span dangerouslySetInnerHTML={{ __html: t('publish.preview.tipHtml') }}></span>
          </Text>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          height: 100%;
        }

        .title {
          display: flex;
          align-items: center;
          margin-bottom: 16px;

          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color-secondary']};
          line-height: 25px;
        }

        .list {
          border: 1px solid ${theme['@border-color-base']};
          border-radius: 4px 4px 0 0;
        }
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 56px;
          padding: 0 16px;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .item:nth-last-of-type(1) {
          border-bottom: none;
        }

        :global(.ant-btn) {
          width: 100%;
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        }

        .tip {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 16px;

          background-color: ${theme['@body-background']};
        }
      `}</style>
    </>
  )
}

export default Preview
