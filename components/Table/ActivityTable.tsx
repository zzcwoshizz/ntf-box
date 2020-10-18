import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { useWallet } from 'use-wallet'

import { IActivity } from '@/api/types'
import Img from '@/components/Img'
import { SCAN_URLS } from '@/shared/constants'
import { useApp } from '@/shared/providers/AppProvider'
import { generateAvatar } from '@/utils'
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
              <Link
                href={{
                  pathname: '/market',
                  query: {
                    id: record.projectDO?.id
                  }
                }}>
                <a>{record.projectDO?.name}</a>
              </Link>
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
                  <Img width={24} src={generateAvatar(record.operator)} />
                  <Link href={`/user/${record.operator}/items`}>
                    <a>{shortenAddress(record.operator)}</a>
                  </Link>
                </Space>
                Buy
                <Space>
                  <Img width={24} src={generateAvatar(record?.seller)} />
                  <Link href={`/user/${record?.seller}/items`}>
                    <a>{shortenAddress(record?.seller)}</a>
                  </Link>
                </Space>
              </Space>
            ) : (
              <Space>
                <Space>
                  <Img width={24} src={generateAvatar(record.operator)} />
                  <Link href={`/user/${record.operator}/items`}>
                    <a>{shortenAddress(record.operator)}</a>
                  </Link>
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
