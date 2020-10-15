import { Form, Input } from 'antd'
import React from 'react'

import Content from './Content'
import Select from './Select'

const Sales: React.FunctionComponent = () => {
  return (
    <Content title="Sales method">
      <Select value="1" options={[{ value: '1', title: 'Fix a price' }]}></Select>
      <Form.Item
        style={{ width: '48%', marginTop: 16 }}
        name="price"
        label="Price"
        rules={[{ required: true }]}>
        <Input addonAfter="ETH" placeholder="Please input price" />
      </Form.Item>
    </Content>
  )
}

export default Sales
