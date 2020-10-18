import { Form, Input } from 'antd'
import React from 'react'

import { useLanguage } from '@/shared/providers/LanguageProvider'

import Content from './Content'
import Select from './Select'

const Sales: React.FunctionComponent = () => {
  const { t } = useLanguage()

  return (
    <Content title={t('publish.saleMethod')}>
      <Select value="1" options={[{ value: '1', title: t('publish.fixPrice') }]}></Select>
      <Form.Item
        style={{ width: '48%', marginTop: 16 }}
        name="price"
        label={t('publish.priceLabel')}
        rules={[{ required: true }]}>
        <Input addonAfter="ETH" placeholder={t('publish.inputPrice')} />
      </Form.Item>
    </Content>
  )
}

export default Sales
