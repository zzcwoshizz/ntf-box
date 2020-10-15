import { DatePicker, Form } from 'antd'
import React from 'react'

import Content from './Content'
import Select from './Select'

const Setting: React.FunctionComponent = () => {
  return (
    <Content title="Sales method">
      <Select value="1" options={[{ value: '1', title: 'Other settings' }]}></Select>
      <Form.Item style={{ width: '48%', marginTop: 16 }} name="expiredTime" label="Time of bill">
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Expired date (default all time)"
          disabledDate={(date) => date.valueOf() < Date.now()}
        />
      </Form.Item>
    </Content>
  )
}

export default Setting
