import { createContext } from "react";
import { ProjectOneState } from "./state";
import { ProjectOneTypes } from "./type";

export const ProjectOneContext = createContext<ProjectOneTypes | null>(null);

const ProjectOneProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, project, updateProject, rulerProject, deleteProject } = ProjectOneState();

  return (
    <ProjectOneContext.Provider
      value={{ isLoading, project, updateProject, rulerProject, deleteProject }}
    >
      {children}
    </ProjectOneContext.Provider>
  );
};

export default ProjectOneProvider;
