export interface CreatePreRegistration {
    id: number;
    classroom_fk: number;
    name: string;
    birthday: string;
    cpf?: string | null;
    sex: number;
    color_race: number;
    deficiency: boolean;
    deficiency_description?: string | null;
    responsable_name?: string | null;
    responsable_cpf?: string | null;
    responsable_telephone?: string | null;
    zone: number;
    classroom: number;
    kinship: string | undefined | null
  }

  export interface CreateRegistrationClassroomType {
    registration: number;
    classroom: number;
  }
  