import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React from 'react'

import { IRanking } from '@/api/types'
import Img from '@/components/Img'
import { useLanguage } from '@/shared/providers/LanguageProvider'

import { useData } from '../context'

const List: React.FunctionComponent = () => {
  const { t } = useLanguage()

  const { ranking, fetching } = useData()

  const columns: ColumnsType<IRanking> = [
    {
      title: '',
      dataIndex: 'ranking',
      key: 'ranking'
    },
    {
      title: t('ranking.columns.dapp'),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Img width={24} src={record.logoUrl} />
          {record.name}
        </Space>
      )
    },
    {
      title: t('ranking.columns.transactions'),
      dataIndex: 'transactions',
      key: 'transactions'
    },
    {
      title: t('ranking.columns.avgPrice'),
      dataIndex: 'avgPrice',
      key: 'avgPrice'
    },
    {
      title: t('ranking.columns.assets'),
      key: 'assets',
      dataIndex: 'assets'
    },
    {
      title: t('ranking.columns.owners'),
      key: 'owners',
      dataIndex: 'owners'
    },
    {
      title: t('ranking.columns.total'),
      key: 'total',
      dataIndex: 'total'
    },
    {
      title: t('ranking.columns.rate'),
      key: 'turnoverRate',
      dataIndex: 'turnoverRate',
      render: (_, record) => (record.turnoverRate * 100).toFixed(2) + '%'
    }
  ]

  return (
    <Table<IRanking> loading={fetching} columns={columns} dataSource={ranking} pagination={false} />
  )
}

export default List
