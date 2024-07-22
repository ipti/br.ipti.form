import { CreateUser } from "../../Context/Users/type";
import http from "../axios";
import { getYear, logout } from "../localstorage";

export const requestUsers = (role: string | undefined) => {
  let path = "/user-bff";

  if (role && role !== "TODOS") {
    path = path + "?role=" + role
  }

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

export const requestUsersChart = (id?: string) => {


  let path = "/user-bff/chart?year=" + getYear() ?? 2024;

  console.log(id)

  if (id) {
    return http.get("/user-bff/chart-ts?year=" + (getYear() ?? 2024) + "&tsId=" + id).then((response) => response.data)
      .catch((err) => {
        if (err.response.status === 401) {
          logout();
          window.location.reload();
        }
        throw err;
      });
  } else {


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
  }
};

export const requestCreateUsers = (data: CreateUser) => {
  let path = "/user-bff";

  console.log(data)
  return http
    .post(path, { ...data, role: data.role })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestDeleteUsers = (id: number) => {
  let path = "/users/" + id;
  return http
    .delete(path)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestUpdateUsers = (id: number, data: any) => {
  let path = "/user-bff?idUser=" + id;
  return http
    .put(path, data)
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
};

export const requestUsersLogin = (id: number) => {
  if (id) {
    let path = "/users/" + id;
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
  }
};


export const requestUsersOne = (id: number) => {
  if (id) {
    let path = "/user-bff/one?idUser=" + id;
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
  }
};
