import { useRouter } from 'next/router';
import React from 'react';
import { useAsync } from 'react-use';

import { getToken } from '@/api';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Container from '@/components/Layout/Container';
import { delay } from '@/utils/time';

import Desc from './components/Desc';
import Infos from './components/Infos';
import { DataProvider } from './context';

const Asset: React.FunctionComponent = () => {
  const router = useRouter();

  const { address, tokenId } = router.query as { address: string; tokenId: string };

  const {
    value: token = {
      contractAdd: '',
      tokenId: '0',
      type: 'ERC721'
    }
  } = useAsync(async () => {
    await delay(30);
    const { data } = await getToken({ contractAdd: address, tokenId });

    return data;
  }, [address, tokenId]);

  const orderId = React.useMemo(() => {
    if (token.orderIds) {
      return token.orderIds[0];
    } else {
      return undefined;
    }
  }, [token]);

  return (
    <>
      <Header />
      {token && (
        <DataProvider orderId={orderId} token={token}>
          <Container style={{ margin: '32px auto' }}>
            <Desc />
            <Infos />
          </Container>
        </DataProvider>
      )}
      <Footer />
    </>
  );
};

export default Asset;
