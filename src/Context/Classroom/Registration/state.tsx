import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RegistrationType, UpdateRegister } from "./type";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import { useFetchRequestClassroomRegistrationOne } from "../../../Services/PreRegistration/query";
import { formatarData, Status } from "../../../Controller/controllerGlobal";
export const RegistrationClassroomState = () => {
  const { idRegistration } = useParams();
  const { data: registrationRequest } = useFetchRequestClassroomRegistrationOne(
    parseInt(idRegistration!)
  );

  const { requestPreRegistrationMutation } = ControllerUpdateRegistration();

  const [registration, setregistration] = useState<
    RegistrationType | undefined
  >();

  useEffect(() => {
    if (registrationRequest) {
      setregistration(registrationRequest);
    }
  }, [registrationRequest]);

  var typesex = [
    { id: 2, type: "Feminino" },
    { id: 1, type: "Masculino" },
  ];

  const color = [
    { id: 0, name: "Não Declarada" },
    { id: 1, name: "Branca" },
    { id: 2, name: "Preta" },
    { id: 3, name: "Parda" },
    { id: 4, name: "Amarela" },
    { id: 5, name: "Indígena" },
  ];

  const VerifySex = (sex: number) => {
    return typesex.find((props) => props.id === sex);
  };

  const VerifyColor = (color_race: number) => {
    return color.find((props) => props.id === color_race);
  };

  const date = new Date(registration?.birthday!);

  const status = [
    {id: Status.APPROVED, name: "Aprovado"},
    {id: Status.REPROVED, name: "Reprovado"},
    {id: Status.PENDING, name: "Pedente"},
  ]

  const getStatus = (id: string) => {
    return status.find(props => props.id === id)
  }
  const initialValue = {
    name: registration?.name,
    sex: VerifySex(registration?.sex!),
    cpf: registration?.cpf,
    color_race: VerifyColor(registration?.color_race!),
    birthday: !isNaN(date.getTime()) ? formatarData(date) : registration?.birthday,
    deficiency: registration?.deficiency
      ? { name: "Sim", id: true }
      : { name: "Não", id: false },
    responsable_name: registration?.responsable_name,
    responsable_cpf: registration?.responsable_cpf,
    responsable_telephone: registration?.responsable_telephone,
    status: getStatus(registration?.status!),
  };

  const handleUpdateRegistration = (data: UpdateRegister, id: number) => {
    requestPreRegistrationMutation.mutate({ data: {...data, birthday: registration?.birthday}, id: id });
  };

  return {
    registration,
    initialValue,
    typesex,
    color,
    handleUpdateRegistration,
  };
};
