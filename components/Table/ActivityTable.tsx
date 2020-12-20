import { Space, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { IActivity } from '@/api/types';
import Img from '@/components/Img';
import ArrowRight from '@/icons/arrow-right.svg';
import { DEFAULT_CHAIN_ID, SCAN_URLS } from '@/shared/constants';
import { useActiveWeb3React } from '@/shared/hooks';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { shortenAddressLast } from '@/utils/string';

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
          <span>
            <TimeLeft left={Date.now() - moment(value).valueOf()} /> ago
          </span>
          <style jsx>{`
            span {
              white-space: nowrap;
            }
          `}</style>
        </>
      ),
      width: 100,
      fixed: 'left'
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
      title: t('activity.columns.asset'),
      dataIndex: 'tokens',
      key: 'tokens',
      render: (_, record) => (
        <>
          <div>
            {[0, 1, 2, 6, 7, 8, 9].includes(record.type) && record.tokens[0] && (
              <Space>
                <Img src={record.tokens[0].images?.[0] ?? ''} width={24} />
                <Link href={`/asset/${record.tokens[0].contractAdd}/${record.tokens[0].tokenId}`}>
                  <a>{record.tokens[0].name}</a>
                </Link>
              </Space>
            )}
            {(record.type === 3 || record.type === 4 || record.type === 5) && (
              <Space>
                <Img src={record.tokens[0].images?.[0] ?? ''} width={24} />
                <Link href={`/asset/${record.tokens[0].contractAdd}/${record.tokens[0].tokenId}`}>
                  <a>{record.tokens[0].name}</a>
                </Link>{' '}
                ... {record.tokens.length} items
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
      title: t('activity.columns.changeDetail'),
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (_, record) => (
        <>
          <div>
            {(record.type === 0 || record.type === 1 || record.type === 2) && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{record.fromName ? record.fromName : shortenAddressLast(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.onShelf')}
              </Space>
            )}
            {(record.type === 3 || record.type === 4 || record.type === 5) && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{record.fromName ? record.fromName : shortenAddressLast(record.fromAdd)}</a>
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
                    <a>{record.fromName ? record.fromName : shortenAddressLast(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.transfer')}
                {record.toAdd && (
                  <Space>
                    <Jdenticon size={24} value={record.toAdd} />
                    <Link href={`/user/${record.toAdd}/items`}>
                      <a>{record.toName ? record.toName : shortenAddressLast(record.toAdd)}</a>
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
                    <a>{record.fromName ? record.fromName : shortenAddressLast(record.fromAdd)}</a>
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
                      <a>
                        {record.fromName ? record.fromName : shortenAddressLast(record.fromAdd)}
                      </a>
                    </Link>
                  </Space>
                )
              })}
            {record.type === 9 && (
              <Space>
                <Space>
                  <Jdenticon size={24} value={record.fromAdd} />
                  <Link href={`/user/${record.fromAdd}/items`}>
                    <a>{record.fromName ? record.fromName : shortenAddressLast(record.fromAdd)}</a>
                  </Link>
                </Space>
                {t('activity.sell')}
                {record.toAdd && (
                  <Space>
                    <Jdenticon size={24} value={record.toAdd} />
                    <Link href={`/user/${record.toAdd}/items`}>
                      <a>{record.toName ? record.toName : shortenAddressLast(record.toAdd)}</a>
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
      render: (_, record) =>
        record.type === 8 ? (
          <Space>
            {utils.formatEther(record.price + '')}
            <ArrowRight />
            {utils.formatEther(record.dealPrice + '')}
          </Space>
        ) : (
          utils.formatEther(record.price + '')
        )
    },
    {
      title: t('activity.columns.txid'),
      key: 'txid',
      render: (_, record) =>
        record.txid && (
          <Tooltip title={record.txid}>
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
                  width: 88px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }
              `}</style>
            </div>
          </Tooltip>
        )
    }
  ];

  return (
    <Table<IActivity>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 800 }}
    />
  );
};

export default ActivityTable;
