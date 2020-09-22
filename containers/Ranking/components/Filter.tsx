import { Tabs } from 'antd'
import React from 'react'

const { TabPane } = Tabs

const Filter: React.FunctionComponent = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Hot" key="1" />
        <TabPane tab="New" key="2" />
        <TabPane tab="Domain name" key="3" />
        <TabPane tab="Game" key="4" />
        <TabPane tab="Virtual world" key="5" />
        <TabPane tab="Art" key="6" />
        <TabPane tab="Transaction card" key="7" />
        <TabPane tab="Collection" key="8" />
        <TabPane tab="Sports" key="9" />
        <TabPane tab="Application" key="10" />
      </Tabs>
      <style jsx global>{`
        .ant-tabs-nav-wrap {
          padding-bottom: 10px;
        }
      `}</style>
    </>
  )
}

export default Filter
