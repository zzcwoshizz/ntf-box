import { Button, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

import { ITokenOwner } from '@/api/types'
import Img from '@/components/Img'
import { AVATAR_URL } from '@/shared/constants'
import { useApp } from '@/shared/providers/AppProvider'
import { shortenAddress } from '@/utils/string'

const TokenOwnerTable: React.FunctionComponent<{ data: ITokenOwner[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const { web3 } = useApp()
  const router = useRouter()

  const columns: ColumnsType<ITokenOwner> = [
    {
      title: 'Token',
      dataIndex: 'userName',
      key: 'userName',
      render: (value, record) => (
        <Space>
          <Img width={24} src={AVATAR_URL + value} />
          {value ?? shortenAddress(record.owner)}
        </Space>
      )
    },
    {
      title: 'Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_, record) => moment(record.createTime).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: 'Unit Price(ETH)',
      dataIndex: 'dealPrice',
      key: 'dealPrice',
      render: (value) => web3.utils.fromWei(value ?? '0')
    },
    {
      title: 'Operation',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (orderId) =>
        orderId && (
          <Button
            type="primary"
            onClick={() => {
              router.push({
                pathname: '/asset',
                query: {
                  orderId
                }
              })
            }}>
            BUY NOW
          </Button>
        )
    }
  ]

  return (
    <Table<ITokenOwner> columns={columns} dataSource={data} pagination={false} loading={loading} />
  )
}

export default TokenOwnerTable
