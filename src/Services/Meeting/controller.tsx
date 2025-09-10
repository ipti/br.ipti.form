import { useMutation } from "react-query";
import {
  CreateFouls,
  CreateMeeting,
  EditMeeting,
  EditMeetingUser,
} from "../../Context/Classroom/Meeting/Create/type";
import {
  requestArchivesMeeting,
  requestCreateMeeting,
  requestDeleteArchivesMeeting,
  requestDeleteMeeting,
  requestUpdateFouls,
  requestUpdateMeeting,
  requestUpdateMeetingUser,
} from "./request";
import Swal from "sweetalert2";
import styles from "../../Styles";
import { useNavigate, useParams } from "react-router-dom";
import queryClient from "../reactquery";

export const MeetingController = () => {
  const history = useNavigate();
  const { id } = useParams();
  const requestCreateMeetingMutation = useMutation(
    (data: CreateMeeting) => requestCreateMeeting(data),
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
          title: "Encontro criado com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            history(`/turma/${id}/encontros`);
          }
        });
      },
    }
  );

  const requestArchvesMeetingMutation = useMutation(
    ({ data, id }: { data: FormData; id: number }) =>
      requestArchivesMeeting(data, id),
    {
      onError: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        })
       },
      onSuccess: (data) => {
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Encontro Alterado com sucesso!',
        //     confirmButtonColor: styles.colors.colorsBaseProductNormal,
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         queryClient.refetchQueries("useRequestsMeetingOne")
        //     }
        // })
        queryClient.refetchQueries("useRequestsMeetingOne");
      },
    }
  );

  const requestUpdateMeetingMutation = useMutation(
    ({ data, id }: { data: EditMeeting; id: number }) =>
      requestUpdateMeeting(data, id),
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
          title: "Encontro Alterado com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsMeetingOne");
          }
          window.location.reload();
        });
      },
    }
  );

   const requestUpdateMeetinUsergMutation = useMutation(
    ({ data}: { data: EditMeetingUser }) =>
      requestUpdateMeetingUser(data),
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
          title: "Encontro Alterado com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsMeetingOne");
          }
        });
      },
    }
  );

  const requestCreateFoulsMutation = useMutation(
    (data: CreateFouls) => requestUpdateFouls(data),
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
          title: "Faltas registradas com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsMeetingOne");
          }
        });
      },
    }
  );

  const requestDeleteMeetingMutation = useMutation(
    (id: number) => requestDeleteMeeting(id),
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
          title: "Encontro excluído com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsMeetingList");
          }
        });
      },
    }
  );

  const requestDeleteArchivesMeetingMutation = useMutation(
    (id: number) => requestDeleteArchivesMeeting(id),
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
          title: "Arquivo deletado com sucesso!",
          confirmButtonColor: styles.colors.colorsBaseProductNormal,
        }).then((result) => {
          if (result.isConfirmed) {
            queryClient.refetchQueries("useRequestsMeetingOne");
          }
        });
      },
    }
  );

  return {
    requestCreateMeetingMutation,
    requestUpdateMeetingMutation,
    requestDeleteMeetingMutation,
    requestCreateFoulsMutation,
    requestArchvesMeetingMutation,
    requestDeleteArchivesMeetingMutation,
    requestUpdateMeetinUsergMutation
  };
};
