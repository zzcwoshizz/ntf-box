import { useRouter } from 'next/router';
import React from 'react';

import { ActivityContent } from '@/components/Activity';
import Container from '@/components/Layout/Container';
import LRContainer from '@/components/Layout/LRContainer';
import { ActivityProvider } from '@/shared/providers/ActivityProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/ActivityFilter';
import UserTop from './Top';

const Activity: React.FunctionComponent = () => {
  let {
    query: { address }
  } = useRouter();

  address = address as string;

  return (
    <>
      <UserTop />
      {address && (
        <ProjectProvider address={address}>
          <ActivityProvider address={address}>
            <Container style={{ margin: '32px auto' }}>
              <LRContainer left={<Filter />} right={<ActivityContent showHead={false} />} />
            </Container>
          </ActivityProvider>
        </ProjectProvider>
      )}
    </>
  );
};

export default Activity;
