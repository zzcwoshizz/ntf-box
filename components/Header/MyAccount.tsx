import { DownOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, Space, Tag } from 'antd';
import Link from 'next/link';
import React from 'react';

import useTheme from '@/shared/hooks/useTheme';
import { useApp } from '@/shared/providers/AppProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import {
  ApproveTransactionInfo,
  BuyTransactionInfo,
  TransferTransactionInfo,
  useTransaction
} from '@/shared/providers/TransactionProvider';
import { shortenAddress } from '@/utils/string';

import EnableButton from '../Button/EnableButton';
import Jdenticon from '../Jdenticon';

const Transaction: React.FunctionComponent = () => {
  const { user, login } = useApp();
  const { t } = useLanguage();
  const theme = useTheme();
  const { allTransaction, toogleVisible } = useTransaction();

  const pendingTransaction = React.useMemo(() => {
    return allTransaction.filter((transaction) => transaction.status === 'pending');
  }, [allTransaction]);

  const pending = pendingTransaction.length;

  const userMenu = (
    <Menu className="account-dropdown">
      {pendingTransaction.length > 0 && (
        <Menu.ItemGroup key="transaction" title={<div className="title">Transaction</div>}>
          {pendingTransaction.map((transaction) => {
            return (
              <Menu.Item
                key={transaction.transactionHash}
                onClick={() => {
                  toogleVisible(transaction.transactionHash);
                }}
              >
                {transaction.type === 'transfer' && (
                  <Space>
                    <span>
                      Transfer to {shortenAddress((transaction as TransferTransactionInfo).to)}
                    </span>
                    <Tag
                      color={
                        transaction.status === 'success'
                          ? 'success'
                          : transaction.status === 'fail'
                          ? 'error'
                          : 'blue'
                      }
                    >
                      {transaction.status}
                    </Tag>
                  </Space>
                )}
                {transaction.type === 'buy' && (
                  <Space>
                    <span>
                      Buy{' '}
                      {(transaction as BuyTransactionInfo).token.name ||
                        shortenAddress((transaction as BuyTransactionInfo).token.contractAdd)}
                    </span>
                    <Tag
                      color={
                        transaction.status === 'success'
                          ? 'success'
                          : transaction.status === 'fail'
                          ? 'error'
                          : 'blue'
                      }
                    >
                      {transaction.status}
                    </Tag>
                  </Space>
                )}
                {transaction.type === 'approve' && (
                  <Space>
                    <span>
                      Approve to {shortenAddress((transaction as ApproveTransactionInfo).to)}
                    </span>
                    <Tag
                      color={
                        transaction.status === 'success'
                          ? 'success'
                          : transaction.status === 'fail'
                          ? 'error'
                          : 'blue'
                      }
                    >
                      {transaction.status}
                    </Tag>
                  </Space>
                )}
              </Menu.Item>
            );
          })}
        </Menu.ItemGroup>
      )}
      <Menu.ItemGroup key="setting" title={<div className="title">User Center</div>}>
        <Menu.Item>
          <Link href="/account/items">
            <a>{t('header.items')}</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/account/activity">
            <a>{t('header.activity')}</a>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link href="/account/items/sell">
            <a>{t('header.sell')}</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/account/items/transfer">
            <a>{t('header.transfer')}</a>
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <Link href="/account/setting">
            <a>{t('header.setting')}</a>
          </Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <>
      <div className="container">
        {user ? (
          <Dropdown overlay={userMenu}>
            <Button
              icon={pending > 0 ? <LoadingOutlined /> : null}
              shape={pending > 0 ? 'round' : undefined}
              size="small"
              type={pending > 0 ? 'primary' : 'text'}
            >
              {pending === 0 && (
                <>
                  {user.nickName ? (
                    <Space>
                      <Jdenticon size={24} value={user.nickName} />
                      {user.nickName}
                      <DownOutlined />
                    </Space>
                  ) : (
                    <>
                      {shortenAddress(user.address)}
                      <DownOutlined />
                    </>
                  )}
                </>
              )}
              {pending > 0 && pending + ' Pending'}
            </Button>
          </Dropdown>
        ) : (
          <EnableButton onClick={login} type="link">
            {t('header.myAccount')}
          </EnableButton>
        )}
      </div>
      <style global jsx>{`
        .account-dropdown .title {
          padding: 5px 8px;

          font-size: 14px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 17px;

          background-color: ${theme['@body-background']};
        }
      `}</style>
    </>
  );
};

export default Transaction;
