import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import styles from "../../Styles";
import {
  requestChangeClassroom,
  requestCreateClassroom,
  requestDeleteClassroom,
  requestUpdateClassroom,
} from "./request";
import { ChangeClassroom, CreateClassroom } from "../../Context/Classroom/type";
import queryClient from "../reactquery";

export const ControllerClassroom = () => {
  const history = useNavigate();
  const requestCreateClassroomMutation = useMutation(
    (data: CreateClassroom) => requestCreateClassroom(data),
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
          title: "Turma criada com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history("/turma");
          }
        });
      },
    }
  );

  const requestChangeClassroomMutation = useMutation(
    (data: ChangeClassroom) => requestChangeClassroom(data),
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
          title: "Turma tranferida com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history("/turma");
          }
        });
      },
    }
  );

  const requestUpdateClassroomMutation = useMutation(
    ({ data, id }: { data: { name: string, status: string }; id: number }) =>
      requestUpdateClassroom(id, data),
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
          title: "Turma criada com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsClassroomOne");
            // history('/turmas')
          }
        });
      },
    }
  );

  const requestDeleteClassroomMutation = useMutation(
    (id: number) => requestDeleteClassroom(id),
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
          title: "Turma excluída com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsClassroom");
            queryClient.refetchQueries("requestProjectOne");
          }
        });
      },
    }
  );
  return {
    requestCreateClassroomMutation,
    requestChangeClassroomMutation,
    requestUpdateClassroomMutation,
    requestDeleteClassroomMutation,
  };
};
