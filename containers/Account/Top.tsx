import { LogoutOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import { utils } from 'ethers'
import React from 'react'

import Header from '@/components/Header'
import Jdenticon from '@/components/Jdenticon'
import { useActiveWeb3React } from '@/shared/hooks'
import useContainer from '@/shared/hooks/useContainer'
import { useApi } from '@/shared/providers/ApiProvider'
import { useApp } from '@/shared/providers/AppProvider'
import { shortenAddress } from '@/utils/string'

const { Text } = Typography

const AccountTop: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const { user, balance } = useApp()
  const { account } = useActiveWeb3React()
  const { setToken } = useApi()

  return (
    <>
      <Header />
      <div className="hero">
        <div className="container">
          <div className="balance">{Number(utils.formatEther(balance)).toFixed(4)}ETH</div>
          <div className="info">
            <Space>
              <Jdenticon
                size={64}
                value={user?.nickName ?? user?.address ?? account ?? 'default'}
              />
              <div>
                <h6>
                  {user?.nickName ? user?.nickName : shortenAddress(user?.address ?? account)}
                  <Button
                    style={{ color: 'white' }}
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={() => setToken('')}>
                    Logout
                  </Button>
                </h6>
                <Text copyable>{user?.address ?? account}</Text>
              </div>
            </Space>
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
        .info h6 {
          display: flex;
          justify-content: space-between;
          align-items: center;
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
