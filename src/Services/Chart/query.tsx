import { useQuery } from "react-query";
import {
    requestChartMatriculated,
    requestChartStatusClasses,
    requestChartCard,
    requestChartTSCard
} from "./request";

export const useRequestChartMatriculated = (start_time: string, end_time: string, ts:number) => {
  return useQuery(["requestChartMatriculated"], () => requestChartMatriculated(start_time, end_time, ts));  
};

export const useRequestChartStatusClasses = (start_time: string, end_time: string, socialTech: []) => {
  return useQuery(["requestChartStatusClasses"], () => requestChartStatusClasses(start_time, end_time, socialTech));  
}

export const useRequestChartCard = (year: number, idTs: []) => {
  return useQuery(["requestChartCard"], () => requestChartCard(year, idTs));
}

export const useRequestChartTsCard = (year: number, idTs: []) => {
  return useQuery(["requestChartTsCard"], () => requestChartTSCard(year, idTs));
}





