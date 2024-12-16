import { Dispatch, SetStateAction } from "react";
import { CreateRegistrationClassroomType, CreateRegistrationTermType } from "../../../Services/PreRegistration/types";
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
  CreateRegisterTerm: (data: CreateRegistrationTermType) => void
}

export interface Registration {
  id: number
  avatar_url: string
  name: string
  birthday: string
  cpf: string
  sex: number
  color_race: number
  deficiency: boolean
  deficiency_description: string
  responsable_name: string
  responsable_cpf: string
  responsable_telephone: string
  zone: number
  kinship: string
  kinship_description: any
  status: string
  createdAt: string
  updatedAt: string
  cep: string
  address: any
  number: any
  complement: string
  neighborhood: string
  city_fk: number
  state_fk: number
  register_classroom: RegisterClassroom[]
  register_term: any
}

export interface RegisterClassroom {
  id: number;
  registration_fk: number;
  classroom_fk: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
