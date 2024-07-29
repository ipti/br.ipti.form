export interface RegistrationDetailsTypes {
  registration?: RegistrationType;
  initialValue: UpdateRegister
  handleUpdateRegistration: (data: UpdateRegister, id: number) => void
  isLoading: boolean
}


export interface UpdateRegister 
  {
    name: string | undefined;
    sex: {
        id: number;
        type: string;
    } | undefined;
    cpf: string | undefined;
    color_race: {
        id: number;
        name: string;
    } | undefined;
    birthday: string | undefined | Date;
    deficiency: {
      name: string;
      id: boolean;
    };
    responsable_name: string | undefined;
    responsable_cpf: string | undefined;
    responsable_telephone: string | undefined;
    status: {id: string, name: string} | undefined;
    registration_classroom_id?: number
    deficiency_description: any
    kinship: string | undefined | null
}
export interface RegistrationType {
  avatar_url: string
  id: number
  registration_fk: number
  classroom_fk: number
  status: string
  createdAt: string
  updatedAt: string
  registration: Registration
}

export interface Registration {
  id: number
  name: string
  birthday: string
  cpf: string
  sex: number
  color_race: number
  deficiency: boolean
  deficiency_description: any
  responsable_name: string
  responsable_cpf: string
  responsable_telephone: string
  zone: number
  status: string
  createdAt: string
  updatedAt: string
  kinship: string
}
