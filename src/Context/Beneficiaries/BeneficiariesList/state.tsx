import { useEffect, useState } from "react";
import { useFetchRequestAllRegistration } from "../../../Services/Beneficiaries/query";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import { useLocation, useNavigate } from "react-router-dom";
import { BeneficiariesFilterType } from "./type";

export const BeneficiariesListState = () => {
  const [registrations, setRegistrations] = useState<any | undefined>();
  const [page, setPage] = useState(0);
  const [limite, setLimite] = useState(10);
  const [tsId, setTsId] = useState<number | undefined>()

  const [allFilter, setallFilter] = useState<string | undefined>("");

  // Função para ler filtros dos query params
  const getFilterFromQuery = (search: string): BeneficiariesFilterType => {
    const queryParams = new URLSearchParams(search);
    return {
      idClassroom: queryParams.get("idClassroom") ? Number(queryParams.get("idClassroom")) : undefined,
      idProject: queryParams.get("idProject") ? Number(queryParams.get("idProject")) : undefined,
      idTs: queryParams.get("idTs") ? Number(queryParams.get("idTs")) : undefined,
      statusTerm: queryParams.get("statusTerm") || undefined,
      status: queryParams.get("status") || undefined,
    };
  };

  // Inicializa filtro a partir da URL
  const [filter, setFilterState] = useState<BeneficiariesFilterType>(() => getFilterFromQuery(window.location.search));

  // Atualiza filtro e sincroniza com query params
  const setFilter = (newFilter: BeneficiariesFilterType) => {
    setFilterState(newFilter);
    const queryParams = new URLSearchParams(location.search);
    // Atualiza cada filtro nos query params
    if (newFilter.idClassroom !== undefined) queryParams.set("idClassroom", String(newFilter.idClassroom)); else queryParams.delete("idClassroom");
    if (newFilter.idProject !== undefined) queryParams.set("idProject", String(newFilter.idProject)); else queryParams.delete("idProject");
    if (newFilter.idTs !== undefined) queryParams.set("idTs", String(newFilter.idTs)); else queryParams.delete("idTs");
    if (newFilter.statusTerm !== undefined) queryParams.set("statusTerm", newFilter.statusTerm); else queryParams.delete("statusTerm");
    if (newFilter.status !== undefined) queryParams.set("status", newFilter.status); else queryParams.delete("status");
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  console.log("🚀 ~ file: state.tsx:24 ~ BeneficiariesListState ~ filter:", filter)

   const navigate = useNavigate();
  const location = useLocation();
  const { data: registrationsRequests } = useFetchRequestAllRegistration({
    limite: limite,
    page: Math.floor(page / 10 + 1),
    allFilter: allFilter !== "" ? allFilter : undefined,
    filter,
  });


  const { requestDeleteRegistrationMutation } = ControllerUpdateRegistration();

  useEffect(() => {
    if (registrationsRequests) {
      setRegistrations(registrationsRequests);
    }
  }, [registrationsRequests]);

  const DeleteRegistration = (id: number) => {
    requestDeleteRegistrationMutation.mutate(id);
  };

   const updateAllFilter = (newFilter: string) => {
    setallFilter(newFilter);

    // Define os parâmetros atuais da query string
    const queryParams = new URLSearchParams(location.search);
    if (newFilter) {
      queryParams.set("allFilter", newFilter); // Adiciona ou atualiza o filtro
    } else {
      queryParams.delete("allFilter"); // Remove o filtro se vazio
    }

    // Atualiza a URL sem recarregar a página
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };


  // Atualiza filtro e allFilter ao mudar a URL (ex: atualizar página)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialAllFilter = queryParams.get("allFilter") || "";
    setallFilter(initialAllFilter);
    setFilterState(getFilterFromQuery(location.search));
  }, [location.search]);

  return {
    registrations,
    page,
    setPage,
    limite,
    setLimite,
    filter,
    setFilter,
    DeleteRegistration,
    allFilter,
    setallFilter,
    tsId, setTsId, updateAllFilter
  };
};
