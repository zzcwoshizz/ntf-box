import { useRouter } from 'next/router';
import React from 'react';

import { AssetContent } from '@/components/Asset';
import Container from '@/components/Layout/Container';
import LRContainer from '@/components/Layout/LRContainer';
import { AssetProvider } from '@/shared/providers/AssetProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/AssetFilter';
import UserTop from './Top';

const Items: React.FunctionComponent = () => {
  let {
    query: { address }
  } = useRouter();

  address = address as string;

  return (
    <>
      <UserTop />
      {address && (
        <ProjectProvider address={address}>
          <AssetProvider address={address}>
            <Container style={{ margin: '32px auto' }}>
              <LRContainer left={<Filter />} right={<AssetContent showHead={false} />} />
            </Container>
          </AssetProvider>
        </ProjectProvider>
      )}
    </>
  );
};

export default Items;
