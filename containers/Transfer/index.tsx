import { Form, Input, Spin, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useAsync } from 'react-use';

import { getToken } from '@/api';
import EnableButton from '@/components/Button/EnableButton';
import Header from '@/components/Header';
import Jdenticon from '@/components/Jdenticon';
import Container from '@/components/Layout/Container';
import useERC721 from '@/shared/hooks/useERC721';
import useServerError from '@/shared/hooks/useServerError';
import useTheme from '@/shared/hooks/useTheme';
import { useLanguage } from '@/shared/providers/LanguageProvider';

const { Title } = Typography;

const Transfer: React.FunctionComponent = () => {
  const theme = useTheme();
  const { t } = useLanguage();

  const { query } = useRouter();
  const { tokenId, address } = query as { tokenId: string; address: string };

  const { showError } = useServerError();
  const { value: token, loading } = useAsync(async () => {
    return (await getToken({ contractAdd: address, tokenId })).data;
  }, [tokenId, address]);
  const [toAddress, setToAddress] = React.useState('');

  const { safeTransferFrom } = useERC721(address);

  const [pending, setPending] = React.useState(false);

  return (
    <>
      <Header />
      <Spin spinning={loading}>
        <Container style={{ margin: '25px auto' }}>
          <div className="container">
            <Jdenticon size={156} value={token?.contractAdd} />
            <Title>{token?.name}</Title>
            <Form<{ amount?: string; address: string }>
              layout="vertical"
              onFinish={(data) => {
                if (!token) {
                  return;
                }

                setPending(true);
                safeTransferFrom(data.address, token.tokenId)
                  .catch((e) => {
                    showError(e);
                  })
                  .finally(() => {
                    setPending(false);
                  });
              }}
              onValuesChange={(values) => {
                setToAddress(values.address);
              }}
              style={{ width: '60%' }}
            >
              <Form.Item label={t('transfer.amountLabel')} name="amount">
                <Input placeholder={t('transfer.inputAmount')} />
              </Form.Item>
              <Form.Item
                label={t('transfer.addressLabel')}
                name="address"
                rules={[{ required: true }]}
              >
                <Input placeholder={t('transfer.inputAddress')} />
              </Form.Item>
              <p>{t('transfer.tip', { name: token?.name, address: toAddress })}</p>
              <Form.Item>
                <EnableButton
                  htmlType="submit"
                  loading={pending}
                  size="large"
                  style={{ width: '100%' }}
                  type="primary"
                >
                  TRANSFER
                </EnableButton>
              </Form.Item>
            </Form>
          </div>
        </Container>
      </Spin>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 66px 0;

          background-color: #fff;
        }

        p {
          width: 60%;
          margin: 0 auto 24px auto;

          text-align: center;
          font-size: 14px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }
      `}</style>
    </>
  );
};

export default Transfer;
