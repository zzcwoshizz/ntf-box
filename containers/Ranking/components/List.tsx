import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

import { IRanking } from '@/api/types'
import Img from '@/components/Img'

import { useData } from '../context'

const List: React.FunctionComponent = () => {
  const { ranking } = useData()

  const columns: ColumnsType<IRanking> = [
    {
      title: '',
      dataIndex: 'ranking',
      key: 'ranking'
    },
    {
      title: 'DAPP',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Img src={record.logoUrl} />
          {record.name}
        </Space>
      )
    },
    {
      title: 'Transactions',
      dataIndex: 'transactions',
      key: 'transactions'
    },
    {
      title: 'Avg price(ETH)',
      dataIndex: 'avgPrice',
      key: 'avgPrice'
    },
    {
      title: 'Assets',
      key: 'assets',
      dataIndex: 'assets'
    },
    {
      title: 'Owners',
      key: 'owners',
      dataIndex: 'owners'
    },
    {
      title: 'Total(USDT)',
      key: 'total',
      dataIndex: 'total'
    },
    {
      title: 'Turnover rate',
      key: 'turnoverRate',
      dataIndex: 'turnoverRate'
    }
  ]

  return <Table<IRanking> columns={columns} dataSource={ranking} pagination={false} />
}

export default List
