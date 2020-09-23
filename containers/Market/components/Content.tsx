import { Col, Row, Select } from 'antd'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { AssetCell, AssetContainer } from '@/components/Asset'
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
          <Row>
            <Col xs={{ span: 12 }} lg={{ span: 8 }} style={{ paddingRight: 16 }}>
              <Select defaultValue="all" placeholder="Select type">
                <Option value="all">All items</Option>
                <Option value="single">Single items</Option>
                <Option value="bundles">Bundles</Option>
              </Select>
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 8 }}>
              <Select placeholder="Sort by">
                <Option value="recent-list">Recently Listed</Option>
                <Option value="recent-create">Recently Created</Option>
                <Option value="recent-sold">Recently sold</Option>
                <Option value="expir">Expiring Soon</Option>
                <Option value="lowest">Lowest Price</Option>
                <Option value="most-view">Most Viewed</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div className="list">
          <PerfectScrollbar style={{ height: '100%' }}>
            <AssetContainer>
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
              <AssetCell />
            </AssetContainer>
          </PerfectScrollbar>
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
          width: 100%;
          height: 32px;
        }

        .list {
          height: 500px;
          padding: 16px;
        }
      `}</style>
    </>
  )
}

export default Content
