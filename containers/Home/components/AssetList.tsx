import React from 'react';

import Container from '@/components/Layout/Container';
import useTheme from '@/shared/hooks/useTheme';

interface Props {
  title: React.ReactNode;
  extra: React.ReactNode;
}

const AssetList: React.FunctionComponent<Props> = ({ title, extra, children }) => {
  const theme = useTheme();

  return (
    <>
      <Container style={{ margin: '60px auto 0 auto' }}>
        <div className="head">
          <span>{title}</span>
          <span>{extra}</span>
        </div>
        <div className="content">{children}</div>
      </Container>
      <style jsx>{`
        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .head > span {
          display: flex;
          align-items: center;
        }

        .content {
          padding: 14px 0;
        }
      `}</style>
    </>
  );
};

export default AssetList;
