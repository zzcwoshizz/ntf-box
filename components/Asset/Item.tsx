import { Space } from 'antd'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

interface Props {
  icon?: React.ReactNode
  title: React.ReactNode
  extra?: React.ReactNode
}

const Item: React.FunctionComponent<Props> = ({ icon, title, extra }) => {
  const theme = useTheme()

  return (
    <>
      <div className="item">
        <div className="meta">
          <Space>
            {typeof icon === 'string' ? <img src={icon} alt={title?.toString() + ''} /> : icon}
            {title}
          </Space>
        </div>
        <div className="extra">{extra}</div>
      </div>
      <style jsx>{`
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0;
          padding: 5px 15px;

          cursor: pointer;
        }
        .item:hover .meta {
          color: ${theme['@primary-color']};
        }

        .meta {
          display: flex;
          align-items: center;
        }
        .meta > img {
          width: 24px;
          height: 24px;
          object-fit: cover;
          object-position: center;

          font-size: 14px;
          color: ${theme['@text-color-secondary']};
          line-height: 16px;

          overflow: hidden;
        }

        .extra {
          font-size: 14px;
          color: ${theme['@text-color-tertiary']};
          line-height: 16px;
        }
      `}</style>
    </>
  )
}

export default Item
