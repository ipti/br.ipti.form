import { BeneficiariesFilterType } from "../../Context/Beneficiaries/BeneficiariesList/type";
import http from "../axios";
import { logout } from "../localstorage";
import { UpdateRegisterTerm } from "./type";

export const requestAllRegistration = ({
  page,
  limite,
  allFilter,
  filter,
}: {
  page: number;
  limite: number;
  filter?: BeneficiariesFilterType;
  allFilter?: string;
}) => {
 const params = new URLSearchParams({
    page: page.toString(),
    limit: limite.toString(),
  });

  // 2. Adicionamos o allFilter se existir (com o seu regex de limpeza)
  if (allFilter) {
    params.append("allFilter", allFilter.replace(/[^a-zA-Z0-9 ]/g, ""));
  }

  // 3. Mapeamos o objeto filter dinamicamente
  if (filter) {
    Object.entries(filter).forEach(([key, value]) => {
      // Verificamos se o valor não é nulo ou indefinido antes de adicionar
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });
  }

  const path = `/registration-token-bff/registration-all?${params.toString()}`;
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
