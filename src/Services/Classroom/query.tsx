import { useQuery } from "react-query";
import { requestClassroom, requestClassroomOne, requestClassroomReport } from "./request";

export const useFetchRequestClassroomOne = (id: number) => {
  return useQuery(["useRequestsClassroomOne", id], () => requestClassroomOne(id));
};

export const useFetchRequestClassroomReport = (id: number) => {
  return useQuery(["useRequestsClassroomReport", id], () => requestClassroomReport(id));
};



export const useFetchRequestClassroom = (idProject: number) => {
  return useQuery(["useRequestsClassroom", idProject],() => requestClassroom(idProject));
};