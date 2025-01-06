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
  CreateRegisterTerm: (data: FormData) => void
}

export interface Registration {
  id: number
  avatar_url: any
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
  cep: any
  address: any
  number: any
  complement: any
  neighborhood: any
  city_fk: any
  state_fk: any
  date_registration: any
  register_term: RegisterTerm[]
  register_classroom: RegisterClassroom[]
}

export interface RegisterTerm {
  id: number
  dateTerm: string
  dateValid: any
  createdAt: string
  updatedAt: string
  registration_fk: number
  blob_file_fk: number
  blob_file: BlobFile
}

export interface BlobFile {
  id: number
  blob_url: string
  key: string
  createdAt: string
  updatedAt: string
}

export interface RegisterClassroom {
  id: number
  registration_fk: number
  classroom_fk: number
  status: string
  createdAt: string
  updatedAt: string
  classroom: Classroom
}

export interface Classroom {
  id: number
  project_fk: number
  name: string
  year: number
  active: boolean
  status: string
  createdAt: string
  updatedAt: string
  project: Project
}

export interface Project {
  id: number
  name: string
  active: boolean
  approval_percentage: number
  ruler_url: any
  avartar_url: any
  social_technology_id: number
  createdAt: string
  updatedAt: string
}
