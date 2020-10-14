import { Card, Collapse, Input, Typography } from 'antd'
import React from 'react'

import { getHelp } from '@/api'
import { IHelp } from '@/api/types'
import Header from '@/components/Header'
import useContainer from '@/shared/hooks/useContainer'
import { useList } from '@/shared/hooks/useList'
import useTheme from '@/shared/hooks/useTheme'
import { hex2rgba } from '@/utils/color'

const { Title } = Typography
const { Panel } = Collapse

const Help: React.FunctionComponent = () => {
  const { containerWidth } = useContainer()
  const theme = useTheme()

  const { state } = useList<IHelp>(
    async (params) => {
      const { list, hasNextPage, total } = await getHelp({
        page: params.page,
        pageSize: params.pageSize
      })

      return {
        list,
        hasMore: hasNextPage,
        total
      }
    },
    {},
    { page: 1, pageSize: 20 }
  )

  return (
    <>
      <Header />
      <div className="container">
        <Title>Help</Title>
        <div className="content">
          <Card
            title={<div className="title">{state.pagination.total} messages</div>}
            extra={<Input placeholder="Search" />}>
            <Collapse>
              {state.list.map((help) => (
                <Panel header={help.title} showArrow={false} key={help.id}>
                  <p>{help.des}</p>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: ${containerWidth}px;
          margin: 25px auto;
        }
        .title {
          display: inline-block;
          padding: 0 16px;
          border-radius: 16px;
          line-height: 32px;
          color: ${theme['@disabled-color']};
          background-color: ${hex2rgba(theme['@primary-color'], 0.06)};
        }
        .content {
          background-color: #fff;
        }

        p {
          margin: 0;
          padding: 16px;

          font-size: 14px;
          color: ${theme['@text-color-tertiary']};
          line-height: 22px;
        }
      `}</style>
    </>
  )
}

export default Help
