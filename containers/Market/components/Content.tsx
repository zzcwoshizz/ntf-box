import { Select } from 'antd'
import React from 'react'

import useTheme from '@/shared/hooks/useTheme'

const { Option } = Select

const Content: React.FunctionComponent = () => {
  const theme = useTheme()

  return (
    <>
      <div className="container">
        <div className="head">
          <h4>All items</h4>
          <p>On the shelf 11,271,095</p>
        </div>
        <div className="select">
          <Select defaultValue="all" style={{ width: 200 }} placeholder="Select type">
            <Option value="all">All items</Option>
            <Option value="single">Single items</Option>
            <Option value="bundles">Bundles</Option>
          </Select>
          <Select style={{ width: 200 }} placeholder="Sort by">
            <Option value="recent-list">Recently Listed</Option>
            <Option value="recent-create">Recently Created</Option>
            <Option value="recent-sold">Recently sold</Option>
            <Option value="expir">Expiring Soon</Option>
            <Option value="lowest">Lowest Price</Option>
            <Option value="most-view">Most Viewed</Option>
          </Select>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 605px;
          margin-left: 16px;
          border: 1px solid ${theme['@border-color-base']};
          background-color: #fff;
          border-radius: 4px;
        }
        .head {
          height: 55px;
          padding: 6px 15px;

          box-shadow: 0px 2px 8px 0px rgba(60, 77, 111, 0.1);
        }
        .head > h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 25px;
        }
        .head > p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: ${theme['@text-color-tertiary']};
          line-height: 14px;
        }

        .select {
          padding: 18px 15px 0 15px;
        }
        .select :global(.ant-select) {
          height: 32px;
          margin-right: 16px;
        }
        .select :global(.ant-select):nth-last-of-type(1) {
          margin-right: 0;
        }
      `}</style>
    </>
  )
}

export default Content
