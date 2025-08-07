import { CreateFouls, CreateMeeting, EditMeeting, EditMeetingUser } from "../../Context/Classroom/Meeting/Create/type";
import http from "../axios";
import { logout } from "../localstorage";

export const requestCreateMeeting = (data: CreateMeeting) => {
    return http
        .post("/meeting", { ...data })
        .then((response) => response.data)
        .catch((err) => {
            if (err.response.status === 401) {
                logout();
                window.location.reload();
            }
            alert(err.response.message);
            throw err;
        });
}

export const requestUpdateMeeting = (data: EditMeeting, id: number) => {
  return http
      .put("/meeting/"+id, { ...data, status: data.status?.id })
      .then((response) => response.data)
      .catch((err) => {
          if (err.response.status === 401) {
              logout();
              window.location.reload();
          }
          alert(err.response.message);
          throw err;
      });
}

export const requestUpdateMeetingUser = (data: EditMeetingUser) => {
  return http
      .put("/meeting-bff/update-members", { ...data})
      .then((response) => response.data)
      .catch((err) => {
          if (err.response.status === 401) {
              logout();
              window.location.reload();
          }
          alert(err.response.message);
          throw err;
      });
}

export const requestUpdateFouls = (data: CreateFouls,) => {
  return http
      .post("/fouls-bff", data)
      .then((response) => response.data)
      .catch((err) => {
          if (err.response.status === 401) {
              logout();
              window.location.reload();
          }
          alert(err.response.message);
          throw err;
      });
}


export const requestArchivesMeeting = (data: FormData, id: number) => {

  return http
      .post("/archive-meeting-bff?meetingId="+id, data)
      .then((response) => response.data)
      .catch((err) => {
          if (err.response.status === 401) {
              logout();
              window.location.reload();
          }
          alert(err.response.message);
          throw err;
      });
}

export const requestDeleteArchivesMeeting = (id: number) => {

  return http
      .delete("/archive-meeting-bff/"+id)
      .then((response) => response.data)
      .catch((err) => {
          if (err.response.status === 401) {
              logout();
              window.location.reload();
          }
          alert(err.response.message);
          throw err;
      });
}





export const requestMeetingList = async (id: string) => {
    if (id) {
      return await http
        .get("/meeting-bff", { params: { idClassroom : id } })
        .then((response) => response.data)
        .catch((err) => {
          // if(err.response.status === 401){
          //   logout()
          //   window.location.reload()
          // }
          throw err;
        });
    }
  };

  export const requestMeetingOne = async (id: string) => {
    if (id) {
      return await http
        .get("/meeting-bff/one", { params: { idMeeting  : id } })
        .then((response) => response.data)
        .catch((err) => {
          // if(err.response.status === 401){
          //   logout()
          //   window.location.reload()
          // }
          throw err;
        });
    }
  };

  export const requestDeleteMeeting = (id: number) => {
    let path = "/meeting/" + id;
    return http
      .delete(path)
      .then((response) => response.data)
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
          window.location.reload();
        }
        alert(err.response.message);
        throw err;
      });
  };