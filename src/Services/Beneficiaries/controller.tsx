import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { requestDeleteTermRegister, requestUpdateTermRegister } from "./request";
import styles from "../../Styles";
import queryClient from "../reactquery";
import { UpdateRegisterTerm } from "./type";

export const BeneficiariesController = () => {
  const requestDeleteTermRegisterMutation = useMutation(
    (id: number) => requestDeleteTermRegister(id),
    {
      onError: (error) => {},
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: " Termo excluida com sucesso!",
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

    const requestUpdateTermRegisterMutation = useMutation(
    ({body, id}:{id: number, body: UpdateRegisterTerm}) => requestUpdateTermRegister(body, id),
    {
      onError: (error) => {},
      onSuccess: (data) => {
        Swal.fire({
          icon: "success",
          title: " Termo alterado com sucesso!",
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

  return {
    requestDeleteTermRegisterMutation,
    requestUpdateTermRegisterMutation
  };
};
