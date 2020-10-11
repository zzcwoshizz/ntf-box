import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import { useWallet } from 'use-wallet'

import { INetActivity } from '@/api/types'
import Img from '@/components/Img'
import { AVATAR_URL, SCAN_URLS } from '@/shared/constants'
import { useApp } from '@/shared/providers/AppProvider'
import { shortenAddress } from '@/utils/string'

const NetActivityTable: React.FunctionComponent<{ data: INetActivity[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const wallet = useWallet()

  const columns: ColumnsType<INetActivity> = [
    {
      title: 'Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value) => moment(value).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title: 'Commodity',
      dataIndex: 'contractAdd',
      key: 'contractAdd',
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
            From
            <Space>
              <Img />
              <a
                href={SCAN_URLS[wallet.chainId + ''] + '/address/' + record.fromAdd}
                target="_blank"
                rel="noopener noreferrer">
                {shortenAddress(record.fromAdd)}
              </a>
            </Space>
            to
            <Space>
              <Img />
              <a
                href={SCAN_URLS[wallet.chainId + ''] + '/address/' + record.toAdd}
                target="_blank"
                rel="noopener noreferrer">
                {shortenAddress(record.toAdd)}
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
      title: 'Txid',
      key: 'txid',
      render: (_, record) => (
        <div>
          <a
            href={SCAN_URLS[wallet.chainId + ''] + '/tx/' + record.txid}
            target="_blank"
            rel="noopener noreferrer">
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
    <Table<INetActivity> columns={columns} dataSource={data} pagination={false} loading={loading} />
  )
}

export default NetActivityTable
