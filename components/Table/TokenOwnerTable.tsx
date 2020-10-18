import { Button, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import { useRouter } from 'next/router'
import React from 'react'

import { ITokenOwner } from '@/api/types'
import Img from '@/components/Img'
import { useApp } from '@/shared/providers/AppProvider'
import { generateAvatar } from '@/utils'
import { shortenAddress } from '@/utils/string'

const TokenOwnerTable: React.FunctionComponent<{
  data: ITokenOwner[]
  address: string
  loading?: boolean
}> = ({ data, address, loading = false }) => {
  const { web3 } = useApp()
  const router = useRouter()

  const columns: ColumnsType<ITokenOwner> = [
    {
      title: 'Token',
      dataIndex: 'userName',
      key: 'userName',
      render: (value, record) => (
        <Space>
          <Img width={24} src={generateAvatar(value)} />
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
      render: (orderId, record) =>
        orderId && (
          <Button
            type="primary"
            onClick={() => {
              // TODO 捆绑
              router.push(`/asset/${address}/${record.tokenId}`)
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
