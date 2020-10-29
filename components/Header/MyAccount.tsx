import { DownOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Space, Tag } from 'antd'
import Link from 'next/link'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'
import { useApi } from '@/shared/providers/ApiProvider'
import { useApp } from '@/shared/providers/AppProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import {
  BuyTransactionInfo,
  TransferTransactionInfo,
  useTransaction
} from '@/shared/providers/TransactionProvider'
import { shortenAddress } from '@/utils/string'

import EnableButton from '../Button/EnableButton'

const Transaction: React.FunctionComponent = () => {
  const { user } = useApp()
  const { login } = useApi()
  const { t } = useLanguage()
  const theme = useTheme()
  const { allTransaction, toogleVisible } = useTransaction()

  const pendingTransaction = React.useMemo(() => {
    return allTransaction.filter((transaction) => transaction.status === 'pending')
  }, [allTransaction])

  const pending = pendingTransaction.length

  const userMenu = (
    <Menu className="account-dropdown">
      {pendingTransaction.length > 0 && (
        <Menu.ItemGroup key="buy" title={<div className="title">Buy</div>}>
          {pendingTransaction.map((transaction) => {
            return (
              <Menu.Item
                key={transaction.transactionHash}
                onClick={() => {
                  toogleVisible(transaction.transactionHash)
                }}>
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
                      }>
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
                      }>
                      {transaction.status}
                    </Tag>
                  </Space>
                )}
              </Menu.Item>
            )
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
  )
  return (
    <>
      <div className="container">
        {user ? (
          <Dropdown overlay={userMenu}>
            <Button
              size="small"
              type={pending > 0 ? 'primary' : 'text'}
              shape={pending > 0 ? 'round' : undefined}
              icon={pending > 0 ? <LoadingOutlined /> : null}>
              {pending === 0 && (
                <>
                  {user.nickName ?? shortenAddress(user.address)} <DownOutlined />
                </>
              )}
              {pending > 0 && pending + ' Pending'}
            </Button>
          </Dropdown>
        ) : (
          <EnableButton type="text" onClick={login}>
            {t('header.myAccount')}
          </EnableButton>
        )}
      </div>
      <style jsx global>{`
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
  )
}

export default Transaction
