import React from 'react'

import { getProjectList } from '@/api'
import { IProject } from '@/api/types'

const projectContext = React.createContext<{
  projects: IProject[]
  project?: IProject
  selectProject(id?: number): void
}>({} as any)

const ProjectProvider: React.FunctionComponent<{ address?: string }> = ({ children, address }) => {
  const [projects, setProjects] = React.useState<IProject[]>([])
  const [projectId, setProjectId] = React.useState<number>()

  React.useEffect(() => {
    getProjectList({ address }).then(({ data }) => {
      setProjects(data)
    })
  }, [address])

  const project = React.useMemo(() => {
    for (const project of projects) {
      if (project.id === projectId) {
        return project
      }
    }

    return undefined
  }, [projectId, projects])

  const selectProject = (id?: number) => {
    setProjectId(id)
  }

  return (
    <projectContext.Provider
      value={{
        projects,
        project,
        selectProject
      }}>
      {children}
    </projectContext.Provider>
  )
}

const useProject = () => {
  const context = React.useContext(projectContext)

  return context
}

export { ProjectProvider, useProject }
