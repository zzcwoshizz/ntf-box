import { Typography } from 'antd'
import React from 'react'

import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'
import { useApp } from '@/shared/providers/AppProvider'
import { generateAvatar } from '@/utils'
import { shortenAddress } from '@/utils/string'

const { Text } = Typography

const AccountTop: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const { account, user, balance, web3 } = useApp()

  return (
    <>
      <Header />
      <div className="hero">
        <div className="container">
          <div className="balance">{web3.utils.fromWei(balance)}ETH</div>
          <div className="info">
            <img src={generateAvatar(user?.nickName ?? user?.address ?? account)} alt="account" />
            <div>
              <h6>{user?.nickName ? user?.nickName : shortenAddress(user?.address ?? account)}</h6>
              <Text copyable>{user?.address ?? account}</Text>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero {
          background: linear-gradient(225deg, #86adfb 0%, #4572cc 100%);
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: ${containerWidth}px;
          height: 120px;
          margin: 0 auto;
        }

        .balance {
          font-size: 32px;
          font-weight: bold;
          color: #fff;
          line-height: 32px;
        }

        .info {
          display: flex;
          align-items: center;
          padding: 8px 32px;
        }
        .info > img {
          width: 64px;
        }
        .info h6 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          line-height: 20px;
        }
        .info :global(.ant-typography) {
          margin: 0;
          padding: 5px 8px;

          font-size: 12px;
          color: #fff;
          line-height: 14px;
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  )
}

export default AccountTop
