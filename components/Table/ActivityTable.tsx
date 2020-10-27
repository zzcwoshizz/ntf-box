import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { utils } from 'ethers'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

import { IActivity } from '@/api/types'
import Img from '@/components/Img'
import { DEFAULT_CHAIN_ID, SCAN_URLS } from '@/shared/constants'
import { useActiveWeb3React } from '@/shared/hooks'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { generateAvatar } from '@/utils'
import { shortenAddress } from '@/utils/string'

import TimeLeft from '../TimeLeft'

const ActivityTable: React.FunctionComponent<{ data: IActivity[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useLanguage()

  const columns: ColumnsType<IActivity> = [
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
      title: t('activity.columns.changeDetail'),
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
                {t('activity.buy')}
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
                {t('activity.sell')}
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
      title: t('activity.columns.price'),
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => <span>{utils.formatEther(record.dealPrice + '')}</span>
    },
    {
      title: t('activity.columns.txid'),
      key: 'txid',
      render: (_, record) => (
        <div>
          <a
            href={SCAN_URLS[chainId ?? DEFAULT_CHAIN_ID]}
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
    <Table<IActivity> columns={columns} dataSource={data} pagination={false} loading={loading} />
  )
}

export default ActivityTable
