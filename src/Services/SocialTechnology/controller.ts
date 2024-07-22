import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styles from "../../Styles";
import { requestCreateSocialTechnology } from "./request";
import queryClient from "../reactquery";

export const TechnologySocialController = () => {

    const history = useNavigate()

    const requestCreateprojectMutation = useMutation(
        (data: {name: string}) => requestCreateSocialTechnology(data),
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
                    icon: 'success',
                    title: 'Tecnologia criada com sucesso!',
                    confirmButtonColor: styles.colors.colorsBaseProductNormal,
                }).then((result) => {
                    queryClient.refetchQueries("useRequestSocialTechnologyList")
                    if (result.isConfirmed) {
                        history('/tecnologias')
                    }
                })
            },
        }
    );

    return{
        requestCreateprojectMutation
    }
}