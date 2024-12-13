import { useQuery } from "react-query";
import {
    requestChartMatriculated
} from "./request";

export const useRequestChartMatriculated = (start_time: String, end_time: String) => {
  return useQuery(["requestChartMatriculated"], () => requestChartMatriculated(start_time, end_time));  
};

