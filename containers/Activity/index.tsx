import React from 'react';

import { ActivityContent } from '@/components/Activity';
import Header from '@/components/Header';
import Container from '@/components/Layout/Container';
import LRContainer from '@/components/Layout/LRContainer';
import { ActivityProvider } from '@/shared/providers/ActivityProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/Filter';

const Activity: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <ProjectProvider>
        <ActivityProvider>
          <Container style={{ margin: '32px auto' }}>
            <LRContainer left={<Filter />} right={<ActivityContent />} />
          </Container>
        </ActivityProvider>
      </ProjectProvider>
    </>
  );
};

export default Activity;
