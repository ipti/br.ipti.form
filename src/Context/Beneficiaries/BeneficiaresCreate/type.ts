import { Dispatch, SetStateAction } from "react";
import { Tsone } from "../../Project/ProjectList/type";

export interface BeneficiariesCreateType {
  initialValue: {
    name: string;
    sex: string;
    cpf: string;
    color_race: string;
    birthday: string;
    deficiency: string;
    responsable_name: string;
    responsable_cpf: string;
    responsable_phone: string;
    responsable_telephone: string;
    responsable_email: string;
    is_legal_responsible: boolean;
    status: string;
    classroom: number | undefined;
    zone: number | undefined,
    project: number | undefined,
    deficiency_description: string | undefined
    kinship: string
    date_registration: string | undefined | any
  };
  tsOne: Tsone | undefined;
  project: any | undefined;
  setProject: Dispatch<SetStateAction<number | undefined>>;
  classrooms: any;
  CreateRegister: (values: any) => void
}


