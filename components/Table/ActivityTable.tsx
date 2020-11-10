import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { IActivity } from '@/api/types';
import Img from '@/components/Img';
import { DEFAULT_CHAIN_ID, SCAN_URLS } from '@/shared/constants';
import { useActiveWeb3React } from '@/shared/hooks';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { shortenAddress } from '@/utils/string';

import Jdenticon from '../Jdenticon';
import TimeLeft from '../TimeLeft';

const ActivityTable: React.FunctionComponent<{ data: IActivity[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const { chainId } = useActiveWeb3React();
  const { t, tc } = useLanguage();

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
              <Img src={record.projectDO?.logoUrl} width={24} />
              <Link
                href={{
                  pathname: '/market',
                  query: {
                    id: record.projectDO?.id
                  }
                }}
              >
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
            {(record.type === 0 || record.type === 1 || record.type === 2) && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{shortenAddress(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.sell')}
                {record.tokens[0] && (
                  <Space>
                    <Img src={record.tokens[0].images?.[0] ?? ''} width={24} />
                    <Link
                      href={`/asset/${record.tokens[0].contractAdd}/${record.tokens[0].tokenId}`}
                    >
                      <a>{record.tokens[0].name}</a>
                    </Link>
                  </Space>
                )}
              </Space>
            )}
            {(record.type === 3 || record.type === 4 || record.type === 5) && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{shortenAddress(record.fromAdd)}</a>
                  </Link>
                </Space>
                <Link href={`/bundle/${record.orderId}`}>
                  <a>{t('activity.bundle')}</a>
                </Link>
              </Space>
            )}
            {record.type === 6 && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{shortenAddress(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.transfer')}
                {record.toAdd && (
                  <Space>
                    <Jdenticon size={24} value={record.toAdd} />
                    <Link href={`/user/${record.toAdd}/items`}>
                      <a>{shortenAddress(record.toAdd)}</a>
                    </Link>
                  </Space>
                )}
              </Space>
            )}
            {record.type === 7 && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{shortenAddress(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.offShelf')}
                {record.tokens[0] && (
                  <Space>
                    <Img src={record.tokens[0].images?.[0]} width={24} />
                    <Link
                      href={`/asset/${record.tokens[0].contractAdd}/${record.tokens[0].tokenId}`}
                    >
                      <a>{record.projectDO?.name}</a>
                    </Link>
                  </Space>
                )}
              </Space>
            )}
            {record.type === 8 &&
              tc('activity.modifyPrice', {
                address: (
                  <Space>
                    <Jdenticon size={24} value={record.fromAdd} />
                    <Link href={`/user/${record.fromAdd}/items`}>
                      <a>{shortenAddress(record.fromAdd)}</a>
                    </Link>
                  </Space>
                )
              })}
            {record.type === 9 && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{shortenAddress(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.buy')}
                {record.tokens[0] && (
                  <Space>
                    <Img src={record.tokens[0].images?.[0]} width={24} />
                    <Link
                      href={`/asset/${record.tokens[0].contractAdd}/${record.tokens[0].tokenId}`}
                    >
                      <a>{record.projectDO?.name}</a>
                    </Link>
                  </Space>
                )}
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
      render: (_, record) => <span>{utils.formatEther(record.price + '')}</span>
    },
    {
      title: t('activity.columns.txid'),
      key: 'txid',
      render: (_, record) =>
        record.txid && (
          <div>
            <a
              href={SCAN_URLS[chainId ?? DEFAULT_CHAIN_ID]}
              rel="noopener noreferrer"
              target="_blank"
            >
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
  ];

  return (
    <Table<IActivity> columns={columns} dataSource={data} loading={loading} pagination={false} />
  );
};

export default ActivityTable;
