import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import { useWallet } from 'use-wallet'

import { IActivity } from '@/api/types'
import Img from '@/components/Img'
import { AVATAR_URL, SCAN_URLS } from '@/shared/constants'
import { useApp } from '@/shared/providers/AppProvider'
import { shortenAddress } from '@/utils/string'

const ActivityTable: React.FunctionComponent<{ data: IActivity[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const { web3 } = useApp()
  const wallet = useWallet()

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
              <Img width={24} src={record.projectDO?.logoUrl} />
              <a href={record.projectDO?.website} target="_blank" rel="noopener noreferrer">
                {record.projectDO?.name}
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
            {record.orderType === '9' ? null : record.side === 'BUY' ? (
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

  return (
    <Table<IActivity> columns={columns} dataSource={data} pagination={false} loading={loading} />
  )
}

export default ActivityTable
