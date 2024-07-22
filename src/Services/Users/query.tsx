import { useQuery } from "react-query";
import { requestUsers, requestUsersChart, requestUsersLogin, requestUsersOne } from "./request";

export const useFetchRequestUsers = (role: string | undefined) => {
    return useQuery(["useRequestsUsers", role], () => requestUsers(role));
  };

  export const useFetchRequestUsersChart = (id?: string) => {
    return useQuery(["useRequestsUsersChart", id], () => requestUsersChart(id));
  };

  export const useFetchRequestUsersOne = (id: number) => {
    return useQuery(["useRequestsUsersOne"], () => requestUsersOne(id));
  };


  export const useFetchRequestUsersLogin = (id: number) => {
    return useQuery(["useRequestsUsersLogin"], () => requestUsersLogin(id));
  };
