import React from 'react';

import Header from '@/components/Header';
import Container from '@/components/Layout/Container';
import LRContainer from '@/components/Layout/LRContainer';
import { AssetProvider } from '@/shared/providers/AssetProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import { AssetContent } from '../../components/Asset';
import Filter from './components/Filter';

const Market: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <ProjectProvider>
        <AssetProvider>
          <Container style={{ margin: '32px auto' }}>
            <LRContainer left={<Filter />} right={<AssetContent />} />
          </Container>
        </AssetProvider>
      </ProjectProvider>
    </>
  );
};

export default Market;
