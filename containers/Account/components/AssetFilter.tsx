import React from 'react'

import { AssetFilter } from '@/components/Asset'
import { useAsset } from '@/shared/providers/AssetProvider'
import { useProject } from '@/shared/providers/ProjectProvider'

const Filter: React.FunctionComponent = () => {
  const { projects } = useProject()
  const { filter, toogleFilter } = useAsset()

  return (
    <>
      <AssetFilter projects={projects} filter={filter} toogleFilter={toogleFilter} />
    </>
  )
}

export default Filter
