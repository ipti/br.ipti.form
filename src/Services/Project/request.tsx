import { CreateProject, UpdateProject } from "../../Context/Project/CreateList/type";
import http from "../axios";
import { GetIdTs, GetIdUser, getYear, logout } from "../localstorage";

export const requestCreateProject = (data: CreateProject) => {
  return http
    .post("/project", data)
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

export const requestUpdateProject = (data: UpdateProject, id: number) => {
  return http
    .put("/project/"+ id, data)
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

export const requestProjectList = async () => {
  if (GetIdUser()) {
    return await http
      .get("/project-user-bff", { params: { userId: GetIdUser() } })
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

export const requestTsList = async (id: number | undefined) => {
  if (GetIdTs()) {
    return await http
      .get("/social-technology-bff/one", { params: { stId: id ?? GetIdTs() } })
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

export const requestProjectOne = async (id: number) => {
  return await http
    .get("/project-bff/one", { params: { idProject: id ?? GetIdTs(), year: getYear() } })
    .then((response) => response.data)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }

      throw err;
    });
};
