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
    responsable_telephone: string;
    status: string;
    classroom: number | undefined;
    zone: number | undefined, 
    project: number | undefined,
    deficiency_description: string | undefined
    kinship: string
  };
  tsOne: Tsone | undefined;
  project: any | undefined;
  setProject: Dispatch<SetStateAction<number | undefined>>;
  classrooms: any;
  CreateRegister: (values: any) => void
}
