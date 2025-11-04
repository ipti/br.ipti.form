import { Dispatch, SetStateAction } from "react";

export interface BeneficiariesListType {
  registrations: any;
  setLimite: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  DeleteRegistration: (id: number) => void
  updateAllFilter: (newFilter: string) => void
  page: number;
  limite: number;
  nameFilter: string | undefined
  cpfFilter: string | undefined
  allFilter: string | undefined
  tsId: number | undefined
  setTsId: Dispatch<SetStateAction<number | undefined>>
  setallFilter: Dispatch<SetStateAction<string | undefined>>
  handleFilter: (values: {
    name: string;
    cpf: string;
}) => void
  filter:
    | {
        value: string;
        content: string;
      }[]
    | undefined;
  setFilter: Dispatch<
    SetStateAction<
      | {
          value: string;
          content: string;
        }[]
      | undefined
    >
  >;
}
