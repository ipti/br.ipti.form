import { CreateClassroom } from "../../Context/Classroom/type";
import http from "../axios";
import { GetIdProject, getYear, logout } from "../localstorage";

export const requestCreateClassroom = (data: CreateClassroom) => {
  return http
    .post("/classroom", data)
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        logout()
        window.location.reload()
      }
      alert(err.response.message)
      throw err;
    });
};


export const requestClassroom = () => {
  let path = "/classroom-bff";
  return http
    .get(path, {
      params: {
        idProject: GetIdProject(),
        year: getYear()
      }
    })
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        logout()
        window.location.reload()
      }
      throw err;
    });
};
export const requestClassroomOne = (id: number) => {
  let path = "/classroom";
  return http
    .get(path + id, {
      params: {
        include: {
          student_pre_identification: true
        },
      }
    })
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        logout()
        window.location.reload()
      }
      throw err;
    });
};