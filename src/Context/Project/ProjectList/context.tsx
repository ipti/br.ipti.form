import { createContext } from "react";
import { ProjectListTypes } from "./type";
import { ProjectListState } from "./state";

export const ProjectListContext = createContext<ProjectListTypes | null>(null);

const ProjectListProvider = ({ children }: { children: React.ReactNode }) => {
  const { tsOne, isLoading } = ProjectListState();

  return (
    <ProjectListContext.Provider value={{ tsOne, isLoading }}>
      {children}
    </ProjectListContext.Provider>
  );
};

export default ProjectListProvider;
