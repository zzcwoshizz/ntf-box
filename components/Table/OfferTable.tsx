import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { utils } from 'ethers';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

import { cancelOffer } from '@/api';
import { IOffer } from '@/api/types';
import { useActiveWeb3React } from '@/shared/hooks';
import useOffer from '@/shared/hooks/useOffer';
import { shortenAddress } from '@/utils/string';

import EnableButton from '../Button/EnableButton';
import Jdenticon from '../Jdenticon';
import TimeLeft from '../TimeLeft';

const OfferTable: React.FunctionComponent<{
  isMine: boolean;
  data: IOffer[];
  loading?: boolean;
}> = ({ isMine, data, loading = false }) => {
  const { account } = useActiveWeb3React();
  const { dealOffer } = useOffer();

  const columns: ColumnsType<IOffer> = [
    {
      title: 'Offerer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (_, record) => (
        <Link href={`/user/${record.buyer}/items`}>
          <a>
            <Space>
              <Jdenticon size={24} value={record.buyer} />
              {shortenAddress(record.buyer)}
            </Space>
          </a>
        </Link>
      ),
      fixed: 'left'
    },
    {
      title: 'Offer',
      dataIndex: 'price',
      key: 'price',
      render: (_, record) => utils.formatEther(record.price) + 'ETH'
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (_, record) => <TimeLeft left={moment(record.updateTime).valueOf()} />
    },
    {
      title: 'Operation',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => (
        <Space>
          {isMine && (
            <EnableButton
              onClick={() => {
                dealOffer(record.entrustOrderId);
              }}
              size="small"
              type="primary"
            >
              DEAL
            </EnableButton>
          )}
          {record.buyer === account && (
            <EnableButton
              onClick={() => {
                cancelOffer(record.entrustOrderId);
              }}
              size="small"
              type="primary"
            >
              CANCEL OFFER
            </EnableButton>
          )}
        </Space>
      )
    }
  ];

  return (
    <Table<IOffer>
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={false}
      scroll={{ x: 800 }}
    />
  );
};

export default OfferTable;
