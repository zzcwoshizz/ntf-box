import { Typography } from 'antd'
import React from 'react'

import Header from '@/components/Header'
import { AVATAR_URL } from '@/shared/constants'
import useContainer from '@/shared/hooks/useContainer'

const { Text } = Typography

const AccountTop: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()

  return (
    <>
      <Header />
      <div className="hero">
        <div className="container">
          <div className="balance">3.3282ETH</div>
          <div className="info">
            <img src={AVATAR_URL + '0xfsdghq478gafgfas'} alt="account" />
            <div>
              <h6>Hunter Pena</h6>
              <Text copyable>0x131ffgaffdfdjs54378ftdsfas7843</Text>
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