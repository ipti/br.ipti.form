import { Dispatch, SetStateAction } from "react";
import { Tsone } from "../Project/ProjectList/type";

export interface ClassroomTypes {
  CreateClassroom: (body: CreateClassroom) => void;
  initialValue: any;
  classrooms: any;
  UpdateClassroom: (
    body: {
      name: string;
      status: string
    },
    id: number
  ) => void;
  DeleteClassroom: (id: number) => void;
  isLoading: boolean;
  tsOne: Tsone | undefined;
  project: number | undefined;
  setProject: Dispatch<SetStateAction<number | undefined>>;
  ChangeClassroom: (body: ChangeClassroom) => void
}

export interface CreateClassroom {
  name: string;
}

export interface ChangeClassroom {
  idProject: string;
  idClassroom: string;
}

export type Events = Event[];

export interface Event {
  id: number;
  start_date: string;
  end_date: string;
  year: number;
}

export interface CreateClassroom {
  name: string;
  project: number;
  year: number;
}

export type MediafrequencyType = Mediafrequency[]

export interface Mediafrequency {
  media: number
  id: number
}
