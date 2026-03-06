import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import http from "../../../Services/axios";
import styles from "../../../Styles";

const requestEditSocialTechnology = async ({ stId, body }: { stId: number; body: { name: string } }) => {
  const { data } = await http.patch(`/social-technology-bff?stId=${stId}`, body);
  return data;
};

export const EditTsState = () => {
  const queryClient = useQueryClient();

  const { mutate: EditTechnology, isLoading: loading } = useMutation(
    ({ stId, body }: { stId: number; body: { name: string } }) =>
      requestEditSocialTechnology({ stId, body }),
    {
      onError: (error: any) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        });
      },
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Tecnologia atualizada com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then(() => {
          queryClient.refetchQueries("useRequestSocialTechnologyList");
        });
      },
    }
  );

  return { EditTechnology, loading };
};
