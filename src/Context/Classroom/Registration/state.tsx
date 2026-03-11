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
    name: registration?.registration.name ?? "",
    sex: VerifySex(registration?.registration.sex!),
    cpf: registration?.registration.cpf ?? "",
    color_race: VerifyColor(registration?.registration.color_race!),
    birthday: !isNaN(date.getTime())
      ? formatarData(registration?.registration.birthday!)
      : registration?.registration.birthday ?? "",
    deficiency: registration?.registration.deficiency
      ? { name: "Sim", id: true }
      : { name: "Não", id: false },
    responsable_name: registration?.registration.responsable_name ?? "",
    responsable_cpf: registration?.registration.responsable_cpf ?? "",
    responsable_telephone: registration?.registration.responsable_telephone ?? "",
    status: getStatus(registration?.status!),
    deficiency_description: registration?.registration.deficiency_description ?? "",
    kinship: registration?.registration.kinship === "NAO_DEFINIDO" || !registration?.registration.kinship
      ? ""
      : registration?.registration.kinship,
    telephone: registration?.registration.telephone ?? "",
    responsable_email: registration?.registration.responsable_email ?? "",
    is_legal_responsible: registration?.registration.is_legal_responsible ?? false,
    zone: registration?.registration.zone ?? undefined,
    address: registration?.registration.address ?? "",
    neighborhood: registration?.registration.neighborhood ?? "",
    state: registration?.registration.state ?? "",
    city: registration?.registration.city ?? "",
  };

  const handleUpdateRegistration = (data: UpdateRegister, id: number) => {
    const { responsable_name, responsable_cpf, responsable_telephone, responsable_email, ...rest } = data;

    const payload: any = {
      ...rest,
      registration_classroom_id: registration?.id,
      birthday: converterData(data.birthday?.toString()!),
      kinship: data.kinship === "" ? "NAO_DEFINIDO" : data.kinship,
      cpf: data?.cpf?.replace(/[^a-zA-Z0-9]/g, ""),
    };

    const cleanPhone = (v?: string) => v?.replace(/[^0-9]/g, "") || undefined;

    if (responsable_name && responsable_name.trim() !== "") payload.responsable_name = responsable_name;
    if (responsable_email && responsable_email.trim() !== "") payload.responsable_email = responsable_email;

    const cleanedPhone = cleanPhone(responsable_telephone);
    if (cleanedPhone) payload.responsable_telephone = cleanedPhone;

    const cleanedCpf = cleanPhone(responsable_cpf);
    if (cleanedCpf) payload.responsable_cpf = cleanedCpf;

    requestPreRegistrationMutation.mutate({ data: payload, id });
  };

  return {
    registration,
    initialValue,
    handleUpdateRegistration,
    isLoading,
  };
};
