import React from 'react'

import { IProject } from '@/api/types'
import useTheme from '@/shared/hooks/useTheme'
import { useApp } from '@/shared/providers/AppProvider'

const ProjectData: React.FunctionComponent<{ project?: IProject }> = ({ project }) => {
  const theme = useTheme()
  const { web3 } = useApp()

  if (!project) {
    return null
  }

  return (
    <>
      <div className="content">
        <div className="item">
          Holder<span>{project.owners}</span>
        </div>
        <div className="item">
          Average price<span>{web3.utils.fromWei(project.avgPrice ?? '0')}ETH</span>
        </div>
        <div className="item">
          Turnover<span>{web3.utils.fromWei(project.total ?? '0')}ETH</span>
        </div>
      </div>
      <style jsx>{`
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 48px;
          border-bottom: 1px solid ${theme['@border-color-base']};
        }
        .item > span {
          color: ${theme['@text-color-tertiary']};
        }
      `}</style>
    </>
  )
}

export default ProjectData
