import { Col, Row, Select, Typography } from 'antd'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { ActivityType } from '@/api/types'
import ActivityTable from '@/components/Table/ActivityTable'
import useTheme from '@/shared/hooks/useTheme'
import { useActivity } from '@/shared/providers/ActivityProvider'
import { useConstants } from '@/shared/providers/ConstantsProvider'
import { useLanguage } from '@/shared/providers/LanguageProvider'
import { useProject } from '@/shared/providers/ProjectProvider'

const { Option } = Select
const { Text } = Typography

const Content: React.FunctionComponent<{ showHead?: boolean }> = ({ showHead = true }) => {
  const theme = useTheme()
  const { t } = useLanguage()
  const { project } = useProject()
  const { filter, toogleFilter } = useActivity()
  const { ACTIVITY_TYPES } = useConstants()
  const { activities, fetching, onScrollBottom } = useActivity()

  return (
    <>
      <div className="container">
        {showHead && (
          <div className="head">
            <h4>{project ? project.name : 'Real time activity recording'}</h4>
          </div>
        )}
        <div className="select">
          <Row align="middle">
            <Col span={8} style={{ paddingRight: 16 }}>
              <Select
                value={filter.type}
                placeholder={t('activity.selectType')}
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
                {t('activity.realtime')}
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
          border: 1px solid ${theme['@border-color-base']};
          background-color: #fff;
          border-radius: 4px;
        }

        .head {
          position: relative;
          display: flex;
          align-items: center;
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
