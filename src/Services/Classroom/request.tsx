import { CreateClassroom } from "../../Context/Classroom/type";
import http from "../axios";
import { getYear, logout } from "../localstorage";

export const requestCreateClassroom = (data: CreateClassroom) => {
  return http
    .post("/classroom", data)
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

export const requestClassroom = (idProject: number) => {
  let path = "/classroom-bff";
  if (idProject) {
    return http
      .get(path, {
        params: {
          idProject: idProject,
          year: getYear(),
        },
      })
      .then((response) => response.data)
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
          window.location.reload();
        }
        throw err;
      });
  }
};

export const requestClassroomOne = (id: number) => {
  let path = "/classroom-bff/one";
  return http
    .get(path, { params: { idClassroom: id } })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestUpdateClassroom = (id: number, data: { name: string }) => {
  let path = "/classroom/";
  return http
    .put(path + id, data)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestClassroomRegistration = (id: number) => {
  let path = "/registration-classroom-bff";
  return http
    .get(path, {
      params: {
        idClassroom: id,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestClassroomRegistrationOne = (id: number) => {
  let path = "/registration/" + id;
  return http
    .get(path)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestDeleteClassroom = (id: number) => {
  let path = "/classroom/" + id;
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
