import { useQuery } from "react-query";
import { requestClassroom, requestClassroomOne, requestClassroomReport, requestFoulsClassroomOne } from "./request";

export const useFetchRequestClassroomOne = (id: number) => {
  return useQuery(["useRequestsClassroomOne", id], () => requestClassroomOne(id));
};

export const useFetchRequestFoulsClassroomOne = (id: number) => {
  return useQuery(["useRequestsFoulsClassroomOne", id], () => requestFoulsClassroomOne(id));
};


export const useFetchRequestClassroomReport = (id: number) => {
  return useQuery(["useRequestsClassroomReport", id], () => requestClassroomReport(id));
};



export const useFetchRequestClassroom = (idProject: number) => {
  return useQuery(["useRequestsClassroom", idProject],() => requestClassroom(idProject));
};