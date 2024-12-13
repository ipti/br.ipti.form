import { useEffect, useState } from "react";
import { useFetchRequestProjectOne } from "../../../Services/Project/query";
import { useParams } from "react-router-dom";
import { ProjectController } from "../../../Services/Project/controller";
import { UpdateProject } from "../CreateList/type";

export const ProjectOneState = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchRequestProjectOne(parseInt(id!));
  const [project, setProject] = useState();
  const { requestUpdateprojectMutation, requestRulerprojectMutation, requestDeleteprojectMutation } =
    ProjectController();

  useEffect(() => {
    if (data) {
      setProject(data);
    }
  }, [data]);

  const updateProject = (data: UpdateProject, id: number) => {
    requestUpdateprojectMutation.mutate({ data: data, id: id });
  };

  const deleteProject = (id: number) => {
    requestDeleteprojectMutation.mutate({ id: id });
  };

  const rulerProject = (file: File, id: number) => {
    const formData = new FormData();

    formData.append("file", file);
    requestRulerprojectMutation.mutate({ data: formData, id: id });
  };

  return {
    project,
    isLoading,
    updateProject,
    rulerProject,
    deleteProject
  };
};
