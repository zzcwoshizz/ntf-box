import { Button, Col, Row, Select, Space, Spin } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { AssetCell, AssetContainer } from '@/components/Asset'
import useTheme from '@/shared/hooks/useTheme'
import { useAsset } from '@/shared/providers/AssetProvider'

const { Option } = Select

const Content: React.FunctionComponent<{ canSelect?: boolean }> = ({ canSelect = false }) => {
  const theme = useTheme()
  const [selected, setSelected] = React.useState<number[]>([])
  const router = useRouter()

  const { assets, page, fetching, filter, toogleFilter, onScrollBottom } = useAsset()

  const toogleSelected = (index: number) => {
    const hasIndex = selected.indexOf(index)
    if (hasIndex > -1) {
      setSelected(selected.slice(0, hasIndex).concat(selected.slice(hasIndex + 1)))
    } else {
      setSelected([...selected, index])
    }
  }

  return (
    <>
      <div className="container">
        <div className="head">
          <h4>All items</h4>
          <p>On the shelf {page.total}</p>
        </div>
        <div className="select">
          <Row>
            <Col xs={{ span: 12 }} lg={{ span: 8 }} style={{ paddingRight: 16 }}>
              <Select
                value={filter.orderType}
                placeholder="Select type"
                onChange={(value) => {
                  toogleFilter({
                    ...filter,
                    orderType: value
                  })
                }}>
                <Option value="0">All items</Option>
                <Option value="1">Single items</Option>
                <Option value="2">Bundles</Option>
              </Select>
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 8 }}>
              <Select
                value={filter.itemOrder}
                placeholder="Sort by"
                onChange={(value) =>
                  toogleFilter({
                    ...filter,
                    itemOrder: value
                  })
                }>
                <Option value="0">Recently Created</Option>
                <Option value="1">Expiring Soon</Option>
                <Option value="2">Lowest Price</Option>
                <Option value="3">Highest Price</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <Spin spinning={fetching && page.page === 1}>
          <div className="list">
            <PerfectScrollbar
              style={{ height: '100%' }}
              onScrollDown={(e) => {
                if (e.scrollHeight === e.scrollTop + e.clientHeight) {
                  onScrollBottom()
                }
              }}>
              <AssetContainer>
                {assets.map((asset, index) => (
                  <AssetCell
                    key={index}
                    asset={asset}
                    selected={canSelect && selected.indexOf(index) > -1}
                    onClick={() => {
                      if (canSelect) {
                        toogleSelected(index)
                      }
                    }}
                  />
                ))}
              </AssetContainer>
            </PerfectScrollbar>
            {canSelect && selected.length > 0 && (
              <div className="action">
                <span>{selected.length} item selected</span>
                <span>
                  <Space>
                    <Button onClick={() => setSelected([])}>Cancel</Button>
                    {selected.length === 1 && <Button>Transfer</Button>}
                    <Button
                      type="primary"
                      onClick={() => {
                        router.push({
                          pathname: '/publish',
                          query: {
                            address: selected.map((index) => assets[index].contractAdd),
                            tokenId: selected.map((index) => assets[index].tokenId)
                          }
                        })
                      }}>
                      Determine
                    </Button>
                  </Space>
                </span>
              </div>
            )}
          </div>
        </Spin>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 605px;
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

        .action {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;

          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 56px;
          padding: 0 16px;

          background-color: #fff;
        }
      `}</style>
    </>
  )
}

export default Content
