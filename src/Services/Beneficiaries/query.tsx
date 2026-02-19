import { useQuery } from "react-query";
import { requestAllRegistration } from "./request";
import { BeneficiariesFilterType } from "../../Context/Beneficiaries/BeneficiariesList/type";

export const useFetchRequestAllRegistration = ({
  page,
  limite,
  allFilter,
  filter
}: {
  page: number;
  limite: number;
  allFilter?: string,
  filter?: BeneficiariesFilterType,
}) => {
  return useQuery(["useRequestAllRegistration", page, limite, allFilter, filter], () =>
    requestAllRegistration({ limite: limite, page: page, allFilter: allFilter, filter  })
  );
};
