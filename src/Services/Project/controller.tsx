import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../../Styles";
import {
  CreateProject,
  UpdateProject,
} from "../../Context/Project/CreateList/type";
import {
  requestCreateProject,
  requestRemoveRulerProject,
  requestRulerProject,
  requestUpdateProject,
} from "./request";
import queryClient from "../reactquery";

export const ProjectController = () => {
  const history = useNavigate();

  const requestCreateprojectMutation = useMutation(
    (data: CreateProject) => requestCreateProject(data),
    {
      onError: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        })
       },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Projeto criado com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history("/projetos");
          }
        });
      },
    }
  );

  const requestUpdateprojectMutation = useMutation(
    ({ data, id }: { data: UpdateProject; id: number }) =>
      requestUpdateProject(data, id),
    {
      onError: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        })
       },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Projeto editado com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("requestProjectOne");
          }
        });
      },
    }
  );

  const requestRulerprojectMutation = useMutation(
    ({ data, id }: { data: FormData; id: number }) =>
      requestRulerProject(data, id),
    {
      onError: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        })
       },
      onSuccess: (data) => {},
    }
  );
  const requestRemoveRulerprojectMutation = useMutation(
    ({ id }: { id: number }) => requestRemoveRulerProject(id),
    {
      onError: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        })
       },
      onSuccess: (data) => {},
    }
  );
  return {
    requestCreateprojectMutation,
    requestUpdateprojectMutation,
    requestRulerprojectMutation,
    requestRemoveRulerprojectMutation,
  };
};
