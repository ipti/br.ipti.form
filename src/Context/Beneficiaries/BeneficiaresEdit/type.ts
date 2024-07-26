import { Dispatch, SetStateAction } from "react";
import { CreateRegistrationClassroomType } from "../../../Services/PreRegistration/types";
import { UpdateRegister } from "../../Classroom/Registration/type";

export interface BeneficiariesEditType {
  registrations: Registration | undefined;
  initialValue: UpdateRegister;
  isLoading: boolean;
  handleUpdateRegistration: (data: UpdateRegister, id: number) => void;
  DeleteRegistration: (id: number) => void
  CreateRegisterClassroom: (data: CreateRegistrationClassroomType) => void
  projectRequet: any
  setProject: Dispatch<any>
  project: any
  classrooms: any
  file: any | undefined
  setFile: Dispatch<SetStateAction<any | undefined>>
}

export interface Registration {
  id: number;
  name: string;
  birthday: string;
  cpf: string;
  sex: number;
  color_race: number;
  deficiency: boolean;
  deficiency_description: string;
  responsable_name: any;
  responsable_cpf: any;
  responsable_telephone: string;
  zone: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  register_classroom: RegisterClassroom[];
  kinship: string
}

export interface RegisterClassroom {
  id: number;
  registration_fk: number;
  classroom_fk: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
