import { Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React from 'react';

import { IRanking } from '@/api/types';
import Img from '@/components/Img';
import { useLanguage } from '@/shared/providers/LanguageProvider';

import { useData } from '../context';

const List: React.FunctionComponent = () => {
  const { t } = useLanguage();

  const { ranking, fetching } = useData();

  const columns: ColumnsType<IRanking> = [
    {
      title: t('ranking.columns.dapp'),
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Img src={record.logoUrl} width={24} />
          {record.name}
        </Space>
      ),
      responsive: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
    },
    {
      title: t('ranking.columns.transactions'),
      dataIndex: 'transactions',
      key: 'transactions',
      responsive: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
    },
    {
      title: t('ranking.columns.avgPrice'),
      dataIndex: 'avgPrice',
      key: 'avgPrice',
      responsive: ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
    },
    {
      title: t('ranking.columns.assets'),
      key: 'assets',
      dataIndex: 'assets',
      responsive: ['xxl', 'xl', 'lg', 'md']
    },
    {
      title: t('ranking.columns.owners'),
      key: 'owners',
      dataIndex: 'owners',
      responsive: ['xxl', 'xl', 'lg', 'md']
    },
    {
      title: t('ranking.columns.total'),
      key: 'total',
      dataIndex: 'total',
      responsive: ['xxl', 'xl', 'lg', 'md']
    },
    {
      title: t('ranking.columns.rate'),
      key: 'turnoverRate',
      dataIndex: 'turnoverRate',
      render: (_, record) => (record.turnoverRate * 100).toFixed(2) + '%',
      responsive: ['xxl', 'xl', 'lg', 'md']
    }
  ];

  return (
    <Table<IRanking> columns={columns} dataSource={ranking} loading={fetching} pagination={false} />
  );
};

export default List;
