import { Input } from 'antd'
import React from 'react'

import Content from './Content'
import Select from './Select'

const Sales: React.FunctionComponent = () => {
  return (
    <Content title="Sales method">
      <Select value="1" options={[{ value: '1', title: 'Fix a price' }]}></Select>
      <Input
        style={{ width: '48%', marginTop: 16 }}
        prefix="Target price"
        addonAfter="ETH"
        placeholder="Numerical value"
      />
    </Content>
  )
}

export default Sales
