import { DatePicker, Form } from 'antd'
import React from 'react'

import { useLanguage } from '@/shared/providers/LanguageProvider'

import Content from './Content'
import Select from './Select'

const Setting: React.FunctionComponent = () => {
  const { t } = useLanguage()

  return (
    <Content title={t('publish.saleMethod')}>
      <Select value="1" options={[{ value: '1', title: t('publish.otherSetting') }]}></Select>
      <Form.Item
        style={{ width: '48%', marginTop: 16 }}
        name="expiredTime"
        label={t('publish.timeLabel')}>
        <DatePicker
          style={{ width: '100%' }}
          placeholder={t('publish.inputTime')}
          disabledDate={(date) => date.valueOf() < Date.now()}
        />
      </Form.Item>
    </Content>
  )
}

export default Setting
