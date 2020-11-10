import React from 'react';

import useContainer from '@/shared/hooks/useContainer';
import useTheme from '@/shared/hooks/useTheme';

interface Props {
  title: React.ReactNode;
  extra: React.ReactNode;
}

const AssetList: React.FunctionComponent<Props> = ({ title, extra, children }) => {
  const { containerWidth } = useContainer();
  const theme = useTheme();

  return (
    <>
      <div className="container">
        <div className="head">
          <span>{title}</span>
          <span>{extra}</span>
        </div>
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 60px auto 0 auto;
        }

        .container:nth-of-type(1) {
          margin-top: 0;
        }

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
