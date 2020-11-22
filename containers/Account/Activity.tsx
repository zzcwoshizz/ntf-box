import React from 'react';

import { ActivityContent } from '@/components/Activity';
import Container from '@/components/Layout/Container';
import LRContainer from '@/components/Layout/LRContainer';
import { injected } from '@/connectors';
import { useActiveWeb3React } from '@/shared/hooks';
import useAutoLogin from '@/shared/hooks/useAutoLogin';
import { ActivityProvider } from '@/shared/providers/ActivityProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/ActivityFilter';

const Activity: React.FunctionComponent = () => {
  const { account, activate, active } = useActiveWeb3React();

  React.useEffect(() => {
    if (!active) {
      activate(injected);
    }
  }, [activate, active]);
  useAutoLogin();

  return (
    <>
      {account && (
        <ProjectProvider address={account}>
          <ActivityProvider address={account}>
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
