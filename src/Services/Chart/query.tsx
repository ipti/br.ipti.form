import { useQuery } from "react-query";
import {
    requestChartMatriculated
} from "./request";

export const useRequestChartMatriculated = () => {
  return useQuery(["requestChartMatriculated"], () => requestChartMatriculated());
};

