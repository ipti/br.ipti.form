import http from "../axios";
import { logout } from "../localstorage";
import { UpdateRegisterTerm } from "./type";

export const requestAllRegistration = ({
  page,
  limite,
  cpf,
  name,
  allFilter,
  idTs,
}: {
  page: number;
  limite: number;
  name?: string;
  idTs?: string;
  cpf?: string;
  allFilter?: string;
}) => {
  const nameFilter = name ? "&nameFilter=" + name : "";
  const cpfFilter = cpf ? "&cpfFilter=" + cpf : "";
  const idTsFilter = idTs ? "&idTs=" + idTs : "";
  const allFilterRequest = allFilter
    ? "&allFilter=" + allFilter.replace(/[^a-zA-Z0-9 ]/g, "")
    : "";

  let path =
    "/registration-token-bff/registration-all?page=" +
    page +
    "&limit=" +
    limite +
    idTsFilter +
    nameFilter +
    cpfFilter +
    allFilterRequest;
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

export const requestDeleteTermRegister = (id: number) => {
  let path = "/registration-term-bff/" + id;
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

export const requestUpdateTermRegister = (
  body: UpdateRegisterTerm,
  id: number
) => {
  let path = "/registration-term-bff/" + id;
  return http
    .put(path, body)
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
