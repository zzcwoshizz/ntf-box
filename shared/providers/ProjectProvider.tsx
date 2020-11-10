import React from 'react';
import { useAsync } from 'react-use';

import { getProject, getProjectList } from '@/api';
import { IProject } from '@/api/types';

const projectContext = React.createContext<{
  projects: IProject[];
  project?: IProject;
  selectProject(id?: number): void;
}>({} as any);

const ProjectProvider: React.FunctionComponent<{ address?: string | null }> = ({
  children,
  address
}) => {
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [projectId, setProjectId] = React.useState<number>();

  React.useEffect(() => {
    getProjectList({ address: address ?? undefined }).then(({ data }) => {
      setProjects(data);
    });
  }, [address]);

  const { value: project } = useAsync(async () => {
    if (!projectId) {
      return;
    }

    const { data } = await getProject(projectId);

    return data;
  }, [projectId]);

  const selectProject = (id?: number) => {
    setProjectId(id);
  };

  return (
    <projectContext.Provider
      value={{
        projects,
        project,
        selectProject
      }}
    >
      {children}
    </projectContext.Provider>
  );
};

const useProject = () => {
  const context = React.useContext(projectContext);

  return context;
};

export { ProjectProvider, useProject };
