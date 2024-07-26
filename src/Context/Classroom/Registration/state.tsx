import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VerifyColor, VerifySex, converterData, formatarData, getStatus } from "../../../Controller/controllerGlobal";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import { useFetchRequestClassroomRegistrationOne } from "../../../Services/PreRegistration/query";
import { RegistrationType, UpdateRegister } from "./type";
export const RegistrationClassroomState = () => {
  const { idRegistration } = useParams();
  const { data: registrationRequest, isLoading } =
    useFetchRequestClassroomRegistrationOne(parseInt(idRegistration!));
  const { requestPreRegistrationMutation } = ControllerUpdateRegistration();
  const [registration, setregistration] = useState<
    RegistrationType | undefined
  >();

  useEffect(() => {
    if (registrationRequest) {
      setregistration(registrationRequest);
    }
  }, [registrationRequest]);

  const date = new Date(registration?.registration.birthday!);

  const initialValue = {
    name: registration?.registration.name,
    sex: VerifySex(registration?.registration.sex!),
    cpf: registration?.registration.cpf,
    color_race: VerifyColor(registration?.registration.color_race!),
    birthday: !isNaN(date.getTime())
      ? formatarData(registration?.registration.birthday!)
      : registration?.registration.birthday,
    deficiency: registration?.registration.deficiency
      ? { name: "Sim", id: true }
      : { name: "Não", id: false },
    responsable_name: registration?.registration.responsable_name,
    responsable_cpf: registration?.registration.responsable_cpf,
    responsable_telephone: registration?.registration.responsable_telephone,
    status: getStatus(registration?.status!),
    deficiency_description: registration?.registration.deficiency_description,
    kinship: registration?.registration.kinship

  };

  const handleUpdateRegistration = (data: UpdateRegister, id: number) => {
    requestPreRegistrationMutation.mutate({
      data: {
        ...data,
        registration_classroom_id: registration?.id,
        birthday: converterData(data.birthday?.toString()!),
        responsable_telephone: data?.responsable_telephone?.replace(
          /[^a-zA-Z0-9]/g,
          ""
        ),
        kinship: data.kinship === "" ? "NAO_DEFINIDO" : data.kinship,
        responsable_cpf: data?.responsable_cpf?.replace(/[^a-zA-Z0-9]/g, ""),
      },
      id: id,
      file: undefined
    });
  };

  return {
    registration,
    initialValue,
    handleUpdateRegistration,
    isLoading,
  };
};
