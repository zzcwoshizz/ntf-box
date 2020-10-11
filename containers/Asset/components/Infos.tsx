import { Button, Space, Spin } from 'antd'
import React from 'react'

import NetActivityTable from '@/components/Table/NetActivityTable'
import TokenOwnerTable from '@/components/Table/TokenOwnerTable'
import ActivitySvg from '@/icons/icon_acticity.svg'
import useTheme from '@/shared/hooks/useTheme'

import { useData } from '../context'

const Title: React.FunctionComponent<{ icon: React.ReactNode }> = ({ icon, children }) => {
  const theme = useTheme()

  return (
    <div>
      <Space align="center">
        {icon}
        {children}
      </Space>
      <style jsx>{`
        div {
          margin-bottom: 16px;

          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 20px;
        }
      `}</style>
    </div>
  )
}

const Infos: React.FunctionComponent = () => {
  const {
    fetching,
    tokenOwner,
    activities,
    hasMoreTokenOwner,
    hasMoreActivities,
    loadMoreTokenOwner,
    loadMoreActivity
  } = useData()

  return (
    <>
      <Spin spinning={fetching}>
        <div className="container">
          <div className="content">
            <Title icon={<ActivitySvg />}>Holding address</Title>
            <TokenOwnerTable data={tokenOwner} />
            {hasMoreTokenOwner && (
              <Button
                style={{ display: 'block', margin: '24px auto 0 auto' }}
                onClick={loadMoreTokenOwner}>
                MORE
              </Button>
            )}
          </div>
          <div className="content">
            <Title icon={<ActivitySvg />}>Activity record</Title>
            <NetActivityTable data={activities} />
            {hasMoreActivities && (
              <Button
                style={{ display: 'block', margin: '24px auto 0 auto' }}
                onClick={loadMoreActivity}>
                MORE
              </Button>
            )}
          </div>
        </div>
      </Spin>
      <style jsx>{`
        .container {
          margin-top: 16px;
          padding: 24px;
          background-color: #fff;
        }

        .content {
          margin-bottom: 20px;
        }
        .content:nth-last-of-type(1) {
          margin-bottom: 0;
        }
      `}</style>
    </>
  )
}

export default Infos
