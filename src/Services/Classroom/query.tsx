import { useQuery } from "react-query";
import { requestClassroom, requestClassroomOne, requestClassroomReport, requestFoulsClassroomOne } from "./request";

export const useFetchRequestClassroomOne = (id: number) => {
  return useQuery(["useRequestsClassroomOne", id], () => requestClassroomOne(id));
};

export const useFetchRequestFoulsClassroomOne = (id: number) => {
  return useQuery(["useRequestsFoulsClassroomOne", id], () => requestFoulsClassroomOne(id));
};


export const useFetchRequestClassroomReport = (id: number, dateStart?: Date, dateEnd?: Date) => {
  return useQuery(
    ["useRequestsClassroomReport", id, dateStart?.toISOString(), dateEnd?.toISOString()],
    () => requestClassroomReport(id, dateStart, dateEnd),
  );
};



export const useFetchRequestClassroom = (idProject: number) => {
  return useQuery(["useRequestsClassroom", idProject],() => requestClassroom(idProject));
};