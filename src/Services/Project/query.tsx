import { useQuery } from "react-query";
import { requestProjectList, requestProjectOne, requestTsList } from "./request";

export const useFetchRequestProjectLists = () => {
    return useQuery(["useRequestProjectList"], () => requestProjectList());
};

export const useFetchRequestTsLists = (id: number | undefined) => {
    return useQuery(["requestTsList", id], () => requestTsList(id));
};

export const useFetchRequestProjectOne = (id: number) => {
    return useQuery(["requestProjectOne", id], () => requestProjectOne(id));
};