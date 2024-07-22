import { useQuery } from "react-query";
import { requestUsers, requestUsersChart, requestUsersLogin, requestUsersOne } from "./request";

export const useFetchRequestUsers = () => {
    return useQuery(["useRequestsUsers"], () => requestUsers());
  };

  export const useFetchRequestUsersChart = () => {
    return useQuery(["useRequestsUsersChart"], () => requestUsersChart());
  };

  export const useFetchRequestUsersOne = (id: number) => {
    return useQuery(["useRequestsUsersOne"], () => requestUsersOne(id));
  };


  export const useFetchRequestUsersLogin = (id: number) => {
    return useQuery(["useRequestsUsersLogin"], () => requestUsersLogin(id));
  };
