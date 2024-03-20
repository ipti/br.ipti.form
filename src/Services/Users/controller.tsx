import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../Context/Users/type";
import { requestCreateUsers, requestDeleteUsers, requestUpdateUsers } from "./request";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import styles from "../../Styles";
import queryClient from "../reactquery";

export const ControllerUser = () => {
  const history = useNavigate();
  const requestUserMutation = useMutation(
    (data: CreateUser) => requestCreateUsers(data),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Registro feito com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history("/users");
          }
        });
      },
    }
  );

  const requestUpdateUserMutation = useMutation(
    ({data, id}: {data: CreateUser, id: number}) => requestUpdateUsers(id, data),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Registro feito com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history("/users");
            queryClient.refetchQueries("useRequestsUsers")
          }
        });
      },
    }
  );

  const requestDeleteUserMutation = useMutation(
    (id: number) => requestDeleteUsers(id),
    {
      onError: (error) => { },
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: "Registro feito com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          queryClient.refetchQueries("useRequestsUsers")
        });
      },
    }
  );

  return { requestUserMutation, requestDeleteUserMutation, requestUpdateUserMutation };
};