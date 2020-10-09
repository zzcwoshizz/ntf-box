import { Space } from 'antd'
import React from 'react'

import ActivityTable from '@/components/Table/ActivityTable'
import ActivitySvg from '@/icons/icon_acticity.svg'
import useTheme from '@/shared/hooks/useTheme'
import { ActivityProvider } from '@/shared/providers/ActivityProvider'

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
  return (
    <>
      <div className="container">
        <Title icon={<ActivitySvg />}>Activity record</Title>
        <ActivityTable data={[]} />
      </div>
      <style jsx>{`
        .container {
          margin-top: 16px;
          padding: 24px;
          background-color: #fff;
        }
      `}</style>
    </>
  )
}

export default Infos
