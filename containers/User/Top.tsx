import { Space, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import Header from '@/components/Header';
import Jdenticon from '@/components/Jdenticon';
import Container from '@/components/Layout/Container';
import { shortenAddressLast } from '@/utils/string';

const { Text } = Typography;

const AccountTop: React.FunctionComponent = () => {
  let {
    query: { address }
  } = useRouter();

  address = address as string;

  return (
    <>
      <Header />
      <div className="hero">
        <Container style={{ margin: '0 auto' }}>
          <div className="container">
            <div className="info">
              <Space>
                <Jdenticon size={64} value={address} />
                <div>
                  <h6>{shortenAddressLast(address)}</h6>
                  <Text copyable>{address}</Text>
                </div>
              </Space>
            </div>
          </div>
        </Container>
      </div>
      <style jsx>{`
        .hero {
          background: linear-gradient(225deg, #86adfb 0%, #4572cc 100%);
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
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
  );
};

export default AccountTop;
