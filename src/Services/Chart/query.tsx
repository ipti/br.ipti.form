import { useQuery } from "react-query";
import {
    requestChartMatriculated,
    requestChartStatusClasses,
    requestChartCard,
    requestChartTSCard,
    requestChartFrequency
} from "./request";

export const useRequestChartMatriculated = (start_time: string, end_time: string, socialTech:[]) => {
  return useQuery(["requestChartMatriculated"], () => requestChartMatriculated(start_time, end_time, socialTech));  
};

export const useRequestChartStatusClasses = (start_time: string, end_time: string, socialTech: []) => {
  return useQuery(["requestChartStatusClasses"], () => requestChartStatusClasses(start_time, end_time, socialTech));  
}

export const useRequestChartCard = (year: number) => {
  return useQuery(["requestChartCard"], () => requestChartCard(year));
}

export const useRequestChartTsCard = (start_time: string, end_time: string, socialTech: number []) => {
  return useQuery(["requestChartTsCard"], () => requestChartTSCard(start_time, end_time, socialTech));
}

export const useRequestChartFrequency = (classroom: number) => {
  return useQuery(["requestChartFrequency"], () => requestChartFrequency(classroom));
}





