import { useQuery } from "react-query";
import { requestCity, requestState } from "./request";

export const useFetchRequestState = () => {
    return useQuery(["useRequestState"], () => requestState());
};

export const useFetchRequestCity = (id?: number) => {
    return useQuery(["useRequestsCity", id], () => requestCity(id));
  };
  