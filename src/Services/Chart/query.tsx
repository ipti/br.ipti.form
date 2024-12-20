import { useQuery } from "react-query";
import {
    requestChartMatriculated,
    requestChartMeetingFrequency
} from "./request";

export const useRequestChartMatriculated = (start_time: String, end_time: String) => {
  return useQuery(["requestChartMatriculated"], () => requestChartMatriculated(start_time, end_time));  
};

export const useRequestChartMeetingFrequency = (socialTechnologyId: String, start_time: String, end_time: String) => {
  return useQuery(["requestChartMeetingFrequency"], () => requestChartMeetingFrequency(socialTechnologyId, start_time, end_time));  
}