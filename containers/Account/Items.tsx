import { useRouter } from 'next/router';
import React from 'react';

import { AssetContent } from '@/components/Asset';
import Container from '@/components/Layout/Container';
import LRContainer from '@/components/Layout/LRContainer';
import { injected } from '@/connectors';
import { useActiveWeb3React } from '@/shared/hooks';
import useAutoLogin from '@/shared/hooks/useAutoLogin';
import { AssetProvider } from '@/shared/providers/AssetProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/AssetFilter';

const Items: React.FunctionComponent = () => {
  const { account, activate, active } = useActiveWeb3React();

  React.useEffect(() => {
    if (!active) {
      activate(injected);
    }
  }, [activate, active]);
  useAutoLogin();

  const { query } = useRouter();

  return (
    <>
      {account && (
        <ProjectProvider address={account}>
          <AssetProvider address={account}>
            <Container style={{ margin: '32px auto' }}>
              <LRContainer
                left={<Filter />}
                right={<AssetContent canSelect={!!query.selType} showHead={false} />}
              />
            </Container>
          </AssetProvider>
        </ProjectProvider>
      )}
    </>
  );
};

export default Items;
