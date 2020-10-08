import { Col, Row, Select, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useWallet } from 'use-wallet'

import { ActivityType, IActivity } from '@/api/types'
import Img from '@/components/Img'
import { AVATAR_URL, SCAN_URLS } from '@/shared/constants'
import useTheme from '@/shared/hooks/useTheme'
import { useActivity } from '@/shared/providers/ActivityProvider'
import { useApp } from '@/shared/providers/AppProvider'
import { useConstants } from '@/shared/providers/ContantsProvider'
import { shortenAddress } from '@/utils/string'

const { Option } = Select
const { Text } = Typography

const Content: React.FunctionComponent = () => {
  const theme = useTheme()
  const { filter, toogleFilter } = useActivity()
  const { ACTIVITY_TYPES } = useConstants()
  const { web3 } = useApp()
  const wallet = useWallet()
  const { activities, fetching, onScrollBottom } = useActivity()

  const columns: ColumnsType<IActivity> = [
    {
      title: 'Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value) => moment(value).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title: 'Commodity',
      dataIndex: 'commodity',
      key: 'commodity',
      render: (_, record) => (
        <>
          <div>
            <Space>
              <Img width={24} src={AVATAR_URL + record.contractAdd} />
              <a
                href={SCAN_URLS[wallet.chainId + ''] + '/contract/' + record.contractAdd}
                target="_blank"
                rel="noopener noreferrer">
                {shortenAddress(record.contractAdd)}
              </a>
            </Space>
          </div>
          <style jsx>{`
            div {
              display: flex;
              align-items: center;
            }
          `}</style>
        </>
      )
    },
    {
      title: 'Change details',
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <>
          <div>
            {record.orderType === 9 ? null : record.side === 'BUY' ? (
              <Space>
                <Space>
                  <Img width={24} src={AVATAR_URL + record.operator} />
                  <a
                    href={SCAN_URLS[wallet.chainId + ''] + '/address/' + record.operator}
                    target="_blank"
                    rel="noopener noreferrer">
                    {shortenAddress(record.operator)}
                  </a>
                </Space>
                Buy
                <Space>
                  <Img width={24} src={AVATAR_URL + record?.seller} />
                  <a
                    href={SCAN_URLS[wallet.chainId + ''] + '/address/' + record.operator}
                    target="_blank"
                    rel="noopener noreferrer">
                    {shortenAddress(record?.seller)}
                  </a>
                </Space>
              </Space>
            ) : (
              <Space>
                <Space>
                  <Img width={24} src={AVATAR_URL + record.operator} />
                  <a
                    href={SCAN_URLS[wallet.chainId + ''] + '/address/' + record.operator}
                    target="_blank"
                    rel="noopener noreferrer">
                    {shortenAddress(record.operator)}
                  </a>
                </Space>
                Sell
              </Space>
            )}
          </div>
          <style jsx>{`
            div {
              display: flex;
              align-items: center;
            }
          `}</style>
        </>
      )
    },
    {
      title: 'Price(ETH)',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => <span>{web3.utils.fromWei(record.dealPrice + '')}</span>
    },
    {
      title: 'Txid',
      key: 'txid',
      render: (_, record) => (
        <div>
          <a href={SCAN_URLS[wallet.chainId + '']} target="_blank" rel="noopener noreferrer">
            {record.txid}
          </a>
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
  console.log(1)

  return (
    <>
      <div className="container">
        <div className="select">
          <Row align="middle">
            <Col span={8} style={{ paddingRight: 16 }}>
              <Select
                value={filter.type}
                placeholder="Select type"
                onChange={(value) => {
                  toogleFilter({ ...filter, type: value })
                }}>
                {Object.keys(ACTIVITY_TYPES).map((key) => (
                  <Option key={key} value={Number(key)}>
                    {ACTIVITY_TYPES[Number(key) as ActivityType]}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={4} offset={12} style={{ textAlign: 'right' }}>
              <Text disabled style={{ cursor: 'default' }}>
                * Realtime
              </Text>
            </Col>
          </Row>
        </div>
        <div className="list">
          <PerfectScrollbar
            style={{ height: '100%' }}
            onScrollDown={(e) => {
              if (e.scrollHeight === e.scrollTop + e.clientHeight) {
                onScrollBottom()
              }
            }}>
            <Table<IActivity>
              columns={columns}
              dataSource={activities}
              pagination={false}
              loading={fetching}
            />
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

        .select {
          padding: 18px 15px 0 15px;
        }
        .select :global(.ant-select) {
          width: 100%;
          height: 32px;
        }

        .list {
          height: 555px;
          padding: 16px;
        }
      `}</style>
    </>
  )
}

export default Content
