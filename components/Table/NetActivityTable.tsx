import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { INetActivity } from '@/api/types';
import Img from '@/components/Img';
import { DEFAULT_CHAIN_ID, SCAN_URLS } from '@/shared/constants';
import { useActiveWeb3React } from '@/shared/hooks';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { shortenAddressLast } from '@/utils/string';

import Jdenticon from '../Jdenticon';
import TimeLeft from '../TimeLeft';

const NetActivityTable: React.FunctionComponent<{ data: INetActivity[]; loading?: boolean }> = ({
  data,
  loading = false
}) => {
  const { chainId } = useActiveWeb3React();
  const { t } = useLanguage();

  const columns: ColumnsType<INetActivity> = [
    {
      title: t('activity.columns.time'),
      dataIndex: 'time',
      key: 'time',
      render: (value) => (
        <>
          <TimeLeft left={Date.now() - moment(value).valueOf()} /> ago
        </>
      ),
      width: 120,
      fixed: 'left'
    },
    {
      title: t('activity.columns.commodity'),
      dataIndex: 'contractAdd',
      key: 'contractAdd',
      render: (_, record) => (
        <>
          <div>
            <Space>
              <Img src={record.nftProjectDO?.logoUrl} width={24} />
              <Link
                href={{
                  pathname: '/market',
                  query: {
                    id: record.nftProjectDO?.id
                  }
                }}
              >
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
              <Jdenticon size={24} value={record.fromAdd} />
              <Link href={`/user/${record.fromAdd}/items`}>
                <a>{shortenAddressLast(record.fromAdd)}</a>
              </Link>
            </Space>
            to
            <Space>
              <Jdenticon size={24} value={record.toAdd} />
              <Link href={`/user/${record.toAdd}/items`}>
                <a>{shortenAddressLast(record.toAdd)}</a>
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
            href={SCAN_URLS[chainId ?? DEFAULT_CHAIN_ID] + '/tx/' + record.txid}
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
    <Table<INetActivity>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 800 }}
    />
  );
};

export default NetActivityTable;
