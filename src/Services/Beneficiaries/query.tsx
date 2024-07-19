import { useQuery } from "react-query";
import { requestAllRegistration } from "./request";

export const useFetchRequestAllRegistration = ({
  page,
  limite,
  cpf,
  name,
  allFilter,
  idTs
}: {
  page: number;
  limite: number;
  name?: string;
  cpf?: string;
  allFilter?: string,
  idTs?: string,
}) => {
  return useQuery(["useRequestAllRegistration", page, limite, cpf, name, allFilter, idTs], () =>
    requestAllRegistration({ limite: limite, page: page, cpf: cpf, name: name, allFilter: allFilter, idTs: idTs })
  );
};
