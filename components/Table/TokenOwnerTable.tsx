import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { ITokenOwner } from '@/api/types';
import { shortenAddress } from '@/utils/string';

import AsyncButton from '../Button/AsyncButton';
import Jdenticon from '../Jdenticon';

const TokenOwnerTable: React.FunctionComponent<{
  data: ITokenOwner[];
  loading?: boolean;
  onSee?(orderId: string): Promise<void>;
}> = ({ data, onSee, loading = false }) => {
  const columns: ColumnsType<ITokenOwner> = [
    {
      title: 'Owner',
      dataIndex: 'userName',
      key: 'userName',
      render: (value, record) => (
        <Link href={`/user/${record.owner}/items`}>
          <a>
            <Space>
              <Jdenticon size={24} value={record.owner} />
              {value ?? shortenAddress(record.owner)}
            </Space>
          </a>
        </Link>
      ),
      fixed: 'left'
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
      render: (value) => utils.formatEther(value ?? '0')
    },
    {
      title: 'Operation',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (_, record) =>
        record.orderId && (
          <AsyncButton
            onClick={async () => {
              await onSee?.(record.orderId);
            }}
            type="primary"
          >
            SEE DETAIL
          </AsyncButton>
        )
    }
  ];

  return (
    <Table<ITokenOwner>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 800 }}
    />
  );
};

export default TokenOwnerTable;
