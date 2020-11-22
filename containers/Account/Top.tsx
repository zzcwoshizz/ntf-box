import { LogoutOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import { utils } from 'ethers';
import { useRouter } from 'next/router';
import React from 'react';

import Header from '@/components/Header';
import Jdenticon from '@/components/Jdenticon';
import Container from '@/components/Layout/Container';
import { useActiveWeb3React } from '@/shared/hooks';
import { useApp } from '@/shared/providers/AppProvider';
import { shortenAddressLast } from '@/utils/string';

const { Text } = Typography;

const AccountTop: React.FunctionComponent = () => {
  const { user, balance, setUser, setToken } = useApp();
  const { account } = useActiveWeb3React();
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="hero">
        <Container style={{ margin: '0 auto', padding: '20px 0' }}>
          <Row align="middle">
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <div className="balance" style={{ padding: 12 }}>
                {Number(utils.formatEther(balance)).toFixed(4)}ETH
              </div>
            </Col>
            <Col lg={{ span: 12 }} xs={{ span: 24 }}>
              <div className="info" style={{ padding: 12 }}>
                <Space>
                  <Jdenticon
                    size={64}
                    value={user?.nickName ?? user?.address ?? account ?? 'default'}
                  />
                  <div>
                    <h6>
                      {user?.nickName
                        ? user?.nickName
                        : shortenAddressLast(user?.address ?? account)}
                      <Button
                        icon={<LogoutOutlined />}
                        onClick={() => {
                          router.push('/');
                          setTimeout(() => {
                            setUser(undefined);
                            setToken('');
                          }, 1000);
                        }}
                        style={{ color: 'white' }}
                        type="text"
                      >
                        Logout
                      </Button>
                    </h6>
                    <Text copyable>{user?.address ?? account}</Text>
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <style jsx>{`
        .hero {
          background: linear-gradient(225deg, #86adfb 0%, #4572cc 100%);
        }

        .balance {
          font-size: 32px;
          font-weight: bold;
          color: #fff;
          line-height: 32px;
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
          word-break: break-all;
        }
        .info :global(.ant-typography) {
          margin: 0;
          padding: 5px 8px;

          font-size: 12px;
          color: #fff;
          line-height: 14px;
          background-color: rgba(255, 255, 255, 0.2);

          word-break: break-all;
        }
      `}</style>
    </>
  );
};

export default AccountTop;
