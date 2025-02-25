import { useQuery } from "react-query";
import { requestHelp } from "./request";

export const useFetchRequestHelp = () => {
    return useQuery(["useRequestsHelp"], () => requestHelp());
  };
  