import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UpdateRegister } from "../../Context/Classroom/Registration/type";
import styles from "../../Styles";
import queryClient from "../reactquery";
import {
  requestDeleteRegistration,
  requestDeleteRegistrationClassroom,
  requestPreRegistration,
  requestRegistrationClassroom,
  requestUpdateAvatarRegistration,
  requestUpdateRegistration,
} from "./request";
import {
  CreatePreRegistration,
  CreateRegistrationClassroomType,
} from "./types";

export const ControllerPreRegistration = () => {
  const history = useNavigate();
  const requestPreRegistrationMutation = useMutation(
    (data: CreatePreRegistration) => requestPreRegistration(data),
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
          title: "Registro feito com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history("/");
          }
        });
      },
    }
  );

  const requestRegistrationMutation = useMutation(
    (data: CreatePreRegistration) => requestPreRegistration(data),
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
          title: "Registro feito com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            if (data?.user?.id) {
              history("/beneficiarios/" + data?.user?.id);
            } else {
              history("/beneficiarios");
            }
          }
        });
      },
    }
  );

  return { requestPreRegistrationMutation, requestRegistrationMutation };
};

export const ControllerUpdateRegistration = () => {

  const requestPreRegistrationMutation = useMutation(
    ({ data, id }: { data: UpdateRegister; id: number }) =>
      requestUpdateRegistration(data, id),
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
          title: "Alteração realizada com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        });
      },
    }
  );

  const requestCHangeAvatarRegistrationMutation = useMutation(
    ({  id, file }: { id: number, file: File }) =>
      requestUpdateAvatarRegistration(id, file),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Alteração realizada com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        });
      },
    }
  );

  const requestRegistrationClassroomMutation = useMutation(
    (data: CreateRegistrationClassroomType) =>
      requestRegistrationClassroom(data),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Registro feito com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            // history("/");
            queryClient.refetchQueries("useRequestsRegistrationOne");
          }
        });
      },
    }
  );

  const requestDeleteRegistrationClassroomMutation = useMutation(
    (id: number) => requestDeleteRegistrationClassroom(id),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: " Matricula excluida com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            // history("/");
            queryClient.refetchQueries("useRequestsClassroomRegistration");
            queryClient.refetchQueries("useRequestsRegistrationOne");
          }
        });
      },
    }
  );

  const requestDeleteRegistrationMutation = useMutation(
    (id: number) => requestDeleteRegistration(id),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: " Beneficiario excluido com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            // history("/");
            queryClient.refetchQueries("useRequestAllRegistration");
          }
        });
      },
    }
  );

  return {
    requestPreRegistrationMutation,
    requestDeleteRegistrationClassroomMutation,
    requestRegistrationClassroomMutation,
    requestDeleteRegistrationMutation,
    requestCHangeAvatarRegistrationMutation
  };
};
