import { Table } from 'antd'
import React from 'react'

const List: React.FunctionComponent = () => {
  const columns = [
    {
      title: '',
      dataIndex: 'ranking',
      key: 'ranking'
    },
    {
      title: 'DAPP',
      dataIndex: 'dapp',
      key: 'dapp'
    },
    {
      title: 'Transactions',
      dataIndex: 'transactions',
      key: 'transactions'
    },
    {
      title: 'Avg price(ETH)',
      dataIndex: 'price',
      key: 'price'
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
      key: 'rate',
      dataIndex: 'rate'
    }
  ]

  const data = Array.from({ length: 10 }).map((_, index) => ({
    ranking: index + 1,
    dapp: 'Rarible',
    transactions: 434,
    price: '234.354',
    assets: '4351',
    owners: 43242,
    total: 543656235,
    rate: 24.43
  }))
  console.log(data)

  return <Table columns={columns} dataSource={data} pagination={false} />
}

export default List
