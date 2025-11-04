import { useEffect, useState } from "react";
import { useFetchRequestAllRegistration } from "../../../Services/Beneficiaries/query";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import { useLocation, useNavigate } from "react-router-dom";

export const BeneficiariesListState = () => {
  const [registrations, setRegistrations] = useState<any | undefined>();
  const [page, setPage] = useState(0);
  const [limite, setLimite] = useState(10);
  const [nameFilter, setnameFilter] = useState<string | undefined>();
  const [tsId, setTsId] = useState<number | undefined>()

  const [cpfFilter, setcpfFilter] = useState<string | undefined>();
  const [allFilter, setallFilter] = useState<string | undefined>("");
  const [filter, setFilter] = useState<
    { value: string; content: string }[] | undefined
  >();

   const navigate = useNavigate();
  const location = useLocation();
  const { data: registrationsRequests } = useFetchRequestAllRegistration({
    limite: limite,
    page: Math.floor(page / 10 + 1),
    name: nameFilter !== "" ? nameFilter : undefined,
    cpf: cpfFilter !== "" ? cpfFilter?.replace(/[^a-zA-Z0-9]/g, '') : undefined,
    allFilter: allFilter !== "" ? allFilter : undefined,
    idTs: tsId?.toString(),
  });

  const handleFilter = (values: { name: string; cpf: string }) => {
    setnameFilter(values.name);
    setcpfFilter(values.cpf);
  };
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

  useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  const initialAllFilter = queryParams.get("allFilter") || "";
  setallFilter(initialAllFilter);
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
    handleFilter,
    nameFilter,
    cpfFilter,
    allFilter,
    setallFilter,
    tsId, setTsId, updateAllFilter
  };
};
