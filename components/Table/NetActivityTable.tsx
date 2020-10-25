import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { useWallet } from 'use-wallet'

import { INetActivity } from '@/api/types'
import Img from '@/components/Img'
import { SCAN_URLS } from '@/shared/constants'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { generateAvatar } from '@/utils'
import { shortenAddress } from '@/utils/string'

import TimeLeft from '../TimeLeft'

const NetActivityTable: React.FunctionComponent<{ data: INetActivity[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const wallet = useWallet()
  const { t } = useLanguage()

  const columns: ColumnsType<INetActivity> = [
    {
      title: t('activity.columns.time'),
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value) => (
        <>
          <TimeLeft left={Date.now() - moment(value).valueOf()} /> ago
        </>
      )
    },
    {
      title: t('activity.columns.commodity'),
      dataIndex: 'contractAdd',
      key: 'contractAdd',
      render: (_, record) => (
        <>
          <div>
            <Space>
              <Img width={24} src={record.nftProjectDO?.logoUrl} />
              <Link
                href={{
                  pathname: '/market',
                  query: {
                    id: record.nftProjectDO?.id
                  }
                }}>
                <a>{record.nftProjectDO?.name}</a>
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
      title: t('activity.columns.changeDetail'),
      dataIndex: 'address',
      key: 'address',
      render: (_, record) => (
        <>
          <div>
            From
            <Space>
              <Img width={24} src={generateAvatar(record.fromAdd)} />
              <Link href={`/user/${record.fromAdd}/items`}>
                <a>{shortenAddress(record.fromAdd)}</a>
              </Link>
            </Space>
            to
            <Space>
              <Img width={24} src={generateAvatar(record.toAdd)} />
              <Link href={`/user/${record.toAdd}/items`}>
                <a>{shortenAddress(record.toAdd)}</a>
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
      title: t('activity.columns.txid'),
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
