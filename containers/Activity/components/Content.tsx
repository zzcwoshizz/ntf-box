import { Col, Row, Select, Space, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useWallet } from 'use-wallet'

import { ActivityType } from '@/api/types'
import ActivityTable from '@/components/Table/ActivityTable'
import useTheme from '@/shared/hooks/useTheme'
import { useActivity } from '@/shared/providers/ActivityProvider'
import { useConstants } from '@/shared/providers/ContantsProvider'

const { Option } = Select
const { Text } = Typography

const Content: React.FunctionComponent = () => {
  const theme = useTheme()
  const { filter, toogleFilter } = useActivity()
  const { ACTIVITY_TYPES } = useConstants()
  const { activities, fetching, onScrollBottom } = useActivity()

  return (
    <>
      <div className="container">
        <div className="select">
          <Row align="middle">
            <Col span={8} style={{ paddingRight: 16 }}>
              <Select
                value={filter.type}
                placeholder="Select type"
                onChange={(value) => {
                  toogleFilter({ ...filter, type: value })
                }}>
                {Object.keys(ACTIVITY_TYPES).map((key) => (
                  <Option key={key} value={Number(key)}>
                    {ACTIVITY_TYPES[Number(key) as ActivityType]}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={4} offset={12} style={{ textAlign: 'right' }}>
              <Text disabled style={{ cursor: 'default' }}>
                * Realtime
              </Text>
            </Col>
          </Row>
        </div>
        <div className="list">
          <PerfectScrollbar
            style={{ height: '100%' }}
            onScrollDown={(e) => {
              if (e.scrollHeight === e.scrollTop + e.clientHeight) {
                onScrollBottom()
              }
            }}>
            <ActivityTable data={activities} loading={fetching} />
          </PerfectScrollbar>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 605px;
          border: 1px solid ${theme['@border-color-base']};
          background-color: #fff;
          border-radius: 4px;
        }

        .select {
          padding: 18px 15px 0 15px;
        }
        .select :global(.ant-select) {
          width: 100%;
          height: 32px;
        }

        .list {
          height: 555px;
          padding: 16px;
        }
      `}</style>
    </>
  )
}

export default Content
