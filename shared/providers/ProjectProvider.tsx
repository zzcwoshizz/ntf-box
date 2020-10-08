import React from 'react'

import { getProjectList } from '@/api'
import { IProject } from '@/api/types'

const projectContext = React.createContext<{
  projects: IProject[]
}>({} as any)

const ProjectProvider: React.FunctionComponent = ({ children }) => {
  const [projects, setProjects] = React.useState<IProject[]>([])

  React.useEffect(() => {
    getProjectList().then(({ data }) => {
      setProjects(data)
    })
  }, [])

  return (
    <projectContext.Provider
      value={{
        projects
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
