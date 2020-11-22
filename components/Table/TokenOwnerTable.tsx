import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ITokenOwner } from '@/api/types';
import { shortenAddress } from '@/utils/string';

import Jdenticon from '../Jdenticon';

const TokenOwnerTable: React.FunctionComponent<{
  data: ITokenOwner[];
  address: string;
  loading?: boolean;
}> = ({ data, address, loading = false }) => {
  const router = useRouter();

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
      render: (orderId, record) =>
        orderId && (
          <Button
            onClick={() => {
              router.push(`/asset/${address}/${record.tokenId}`);
            }}
            type="primary"
          >
            BUY NOW
          </Button>
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
