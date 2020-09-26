import { Space } from 'antd'
import React from 'react'

import FhSvg from '@/icons/icon_fh.svg'
import useTheme from '@/shared/hooks/useTheme'

const Content: React.FunctionComponent<{ title: React.ReactNode; extra?: React.ReactNode }> = ({
  title,
  extra,
  children
}) => {
  const theme = useTheme()

  return (
    <>
      <div className="wrapper">
        <div className="title">
          <Space>
            <FhSvg />
            {title}
          </Space>
          <span className="right">{extra}</span>
        </div>
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .wrapper {
          padding-bottom: 32px;
          border-bottom: 1px solid ${theme['@border-color-base']};
          margin-bottom: 32px;
        }
        .wrapper:nth-last-of-type(1) {
          border-bottom: none;
          margin-bottom: 0;
        }

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;

          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }

        .right {
          font-size: 14px;
          color: ${theme['@text-color-secondary']};
          line-height: 20px;
        }
      `}</style>
    </>
  )
}

export default Content
