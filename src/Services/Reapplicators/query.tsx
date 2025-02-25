import { useQuery } from "react-query";
import { requestReapplicatorsList } from "./request";

export const useFetchRequestReapplicatorsLists = () => {
    return useQuery(["useRequestSocialTechnologyList"], () => requestReapplicatorsList());
};