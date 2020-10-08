import React from 'react'

import { AssetFilter } from '@/components/Asset'
import { useActivity } from '@/shared/providers/ActivityProvider'
import { useProject } from '@/shared/providers/ProjectProvider'

const ActivityFilter: React.FunctionComponent = () => {
  const { projects } = useProject()
  const { filter, toogleFilter } = useActivity()

  return (
    <>
      <AssetFilter projects={projects} filter={filter} toogleFilter={toogleFilter} />
    </>
  )
}

export default ActivityFilter
