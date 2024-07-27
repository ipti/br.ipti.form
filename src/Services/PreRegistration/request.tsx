import http from "../axios";
import { getYear, logout } from "../localstorage";
import { CreatePreRegistration, CreateRegistrationClassroomType } from "./types";

export const requestPreRegistration = (data: CreatePreRegistration) => {
  return http
    .post("/registration-bff", data)
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        window.location.reload()
      }
      alert(err.response.message)

      throw err;
    });
};

export const requestRegistrationClassroom = (data: CreateRegistrationClassroomType) => {
  return http
    .post("/registration-classroom-bff", data)
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        window.location.reload()
      }
      alert(err.response.message)

      throw err;
    });
};



export const requestUpdateRegistration = (data: any, id: number) => {

  const body = { ...data, color_race: data.color_race?.id, sex: data.sex?.id, deficiency: data.deficiency.id, status: data.status?.id }

  return http
    .put("/registration/" + id, body)
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        window.location.reload()
      }
      alert(err.response.message)

      throw err;
    });
};

export const requestUpdateAvatarRegistration = ( id: number, file: File) => {

  const formData = new FormData()

  formData.append("file", file)

  return http
    .put("/registration/avatar/" + id, formData)
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        window.location.reload()
      }
      alert(err.response.message)

      throw err;
    });
};

export const requestProjectsAndClassroom = () => {
  let path = "/project-bff";

  if (getYear()) {
    return http
      .get(path, { params: { year: getYear() } })
      .then(response => response.data)
      .catch(err => {
        if (err.response.status === 401) {
          window.location.reload()
        }
        throw err;
      });
  }
};


export const requestClassroomRegistration = (id: number) => {
  let path = "/registration-classroom-bff";
  return http
    .get(path, {
      params: {
        idClassroom: id
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

export const requestClassroomRegistrationOne = (id: number) => {
  let path = "/registration-classroom-bff/register-classroom-one?idRegistrationClassroom=" + id;
  return http
    .get(path)
    .then(response => response.data)
    .catch(err => {
      if (err.response.status === 401) {
        logout()
        window.location.reload()
      }
      throw err;
    });
};

export const requestRegistrationOne = (id?: string) => {
  if (id) {
    let path = "/registration-token-bff/one?idRegistration=" + id;
    return http
      .get(path)
      .then(response => response.data)
      .catch(err => {
        if (err.response.status === 401) {
          logout()
          window.location.reload()
        }
        throw err;
      });
  }
};

export const requestRegistrationOneCpf = (cpf?: string) => {
  if (cpf) {
    let path = "/registration-bff?cpf=" + cpf.replace(/[^\d]/g, '');
    return http
      .get(path)
      .then(response => response.data)
      .catch(err => {
        if (err.response.status === 401) {
          logout()
          window.location.reload()
        }
        throw err;
      });
  }
};

export const requestDeleteRegistration = (id: number) => {
  let path = "/registration-token-bff/" + id;
  return http
    .delete(path)
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

export const requestDeleteRegistrationClassroom = (id: number) => {
  let path = "/registration-classroom-bff/" + id;
  return http
    .delete(path)
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

