import { Button } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { AssetFilter } from '@/components/Asset'
import ProjectData from '@/components/Project/ProjectData'
import useTheme from '@/shared/hooks/useTheme'
// import GoSvg from '@/icons/go.svg'
import { useActivity } from '@/shared/providers/ActivityProvider'
import { useProject } from '@/shared/providers/ProjectProvider'

const ActivityFilter: React.FunctionComponent = () => {
  const theme = useTheme()
  const router = useRouter()
  const { projects, project } = useProject()
  const { filter, toogleFilter } = useActivity()

  return (
    <>
      <AssetFilter
        projects={projects}
        showItemExtra={false}
        project={project}
        onSelectProject={(project) => {
          if (project) {
            toogleFilter({ ...filter, id: project.id, name: project.name })
          } else {
            toogleFilter({ ...filter, id: undefined, name: undefined })
          }
        }}
        renderDetail={() => (
          <>
            <div className="content">
              <div className="item">
                <Button
                  onClick={() => {
                    router.push(`/market?id=${filter.id}`)
                  }}>
                  Go to the market
                </Button>
              </div>
              <ProjectData project={project} />
            </div>
            <style jsx>{`
              .content {
                padding: 0 16px;
              }
              .item {
                padding: 16px 0;
                border-bottom: 1px solid ${theme['@border-color-base']};
              }
              .item > :global(button) {
                width: 100%;
              }
            `}</style>
          </>
        )}
      />
    </>
  )
}

export default ActivityFilter
