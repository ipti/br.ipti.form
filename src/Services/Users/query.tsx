import { useQuery } from "react-query";
import { requestUsers, requestUsersChart, requestUsersOne } from "./request";

export const useFetchRequestUsers = (role: string | undefined) => {
    return useQuery(["useRequestsUsers", role], () => requestUsers(role));
  };

  export const useFetchRequestUsersChart = (id?: string) => {
    return useQuery(["useRequestsUsersChart", id], () => requestUsersChart(id));
  };

  export const useFetchRequestUsersOne = (id: number) => {
    return useQuery(["useRequestsUsersOne"], () => requestUsersOne(id));
  };
