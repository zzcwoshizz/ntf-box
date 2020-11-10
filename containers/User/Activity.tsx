import { useRouter } from 'next/router';
import React from 'react';

import { ActivityContent } from '@/components/Activity';
import useContainer from '@/shared/hooks/useContainer';
import { ActivityProvider } from '@/shared/providers/ActivityProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/ActivityFilter';
import UserTop from './Top';

const Activity: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();

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
            <div className="container">
              <div className="left">
                <Filter />
              </div>
              <div className="right">
                <ActivityContent showHead={false} />
              </div>
            </div>
          </ActivityProvider>
        </ProjectProvider>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-activitycontent: space-between;
          width: ${containerWidth}px;
          margin: 32px auto;
        }
        .left {
          flex: 0 0 auto;
        }
        .right {
          flex: 1 1 auto;
          margin-left: 16px;
        }
      `}</style>
    </>
  );
};

export default Activity;
