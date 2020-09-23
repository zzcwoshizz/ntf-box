import { Col, Row, Select, Table, Typography } from 'antd'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import useTheme from '@/shared/hooks/useTheme'

const { Option } = Select
const { Text } = Typography
const columns = [
  {
    title: 'Time',
    dataIndex: 'time',
    render: () => 'A minute ago'
  },
  {
    title: 'Commodity',
    dataIndex: 'commodity',
    render: () => (
      <>
        <div>
          <img src="" alt="占位图" />
          <a>Willion peter</a>
        </div>
        <style jsx>{`
          div {
            display: flex;
            align-items: center;
          }
          img {
            margin-right: 5px;
          }
        `}</style>
      </>
    )
  },
  {
    title: 'Change details',
    dataIndex: 'address',
    render: () => (
      <>
        <div>
          <img src="" alt="占位图" />
          <a>Willion peter</a>
          {' Sell to '}
          <img src="" alt="占位图" />
          <a>Willion peter</a>
        </div>
        <style jsx>{`
          div {
            display: flex;
            align-items: center;
          }
          img {
            margin-right: 5px;
          }
        `}</style>
      </>
    )
  },
  {
    title: 'Price(ETH)',
    dataIndex: 'price',
    render: () => <span>0.77</span>
  },
  {
    title: 'Txid',
    key: 'txid',
    render: () => (
      <div>
        <a>0xa87512177ebeeb9d6d9fe8878c2c481bacf11be5</a>
        <style jsx>{`
          div {
            width: 120px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
]

const data = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]

const Content: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <div className="head">
          <h4>All items</h4>
          <p>On the shelf 11,271,095</p>
        </div>
        <div className="select">
          <Row align="middle">
            <Col span={8} style={{ paddingRight: 16 }}>
              <Select defaultValue="all" placeholder="Select type">
                <Option value="all">All items</Option>
                <Option value="single">Single items</Option>
                <Option value="bundles">Bundles</Option>
              </Select>
            </Col>
            <Col span={4} offset={12} style={{ textAlign: 'right' }}>
              <Text disabled style={{ cursor: 'default' }}>
                * 实时更新
              </Text>
            </Col>
          </Row>
        </div>
        <div className="list">
          <PerfectScrollbar style={{ height: '100%' }}>
            <Table columns={columns} dataSource={data} pagination={false} />
          </PerfectScrollbar>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 605px;
          border: 1px solid ${theme['@border-color-base']};
          background-color: #fff;
          border-radius: 4px;
        }
        .head {
          height: 55px;
          padding: 6px 15px;

          box-shadow: 0px 2px 8px 0px rgba(60, 77, 111, 0.1);
        }
        .head > h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 25px;
        }
        .head > p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: ${theme['@text-color-tertiary']};
          line-height: 14px;
        }

        .select {
          padding: 18px 15px 0 15px;
        }
        .select :global(.ant-select) {
          width: 100%;
          height: 32px;
        }

        .list {
          height: 500px;
          padding: 16px;
        }
      `}</style>
    </>
  )
}

export default Content
