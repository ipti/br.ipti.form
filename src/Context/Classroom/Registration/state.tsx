import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStatus } from "../../../Controller/controllerGlobal";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import { useFetchRequestClassroomRegistrationOne } from "../../../Services/PreRegistration/query";
import { RegistrationType, UpdateRegister } from "./type";

export const RegistrationClassroomState = () => {
  const { idRegistration } = useParams();
  const { data: registrationRequest, isLoading } =
    useFetchRequestClassroomRegistrationOne(parseInt(idRegistration!));
  const { requestPreRegistrationMutation } = ControllerUpdateRegistration();
  const [registration, setregistration] = useState<RegistrationType | undefined>();

  useEffect(() => {
    if (registrationRequest) {
      setregistration(registrationRequest);
    }
  }, [registrationRequest]);

  const initialValue = {
    status: getStatus(registration?.status!),
  };

  const handleUpdateRegistration = (data: UpdateRegister, id: number) => {
    const payload = {
      // registration_classroom_id: registration?.id,
      status: data.status.id,
    };

    requestPreRegistrationMutation.mutate({ data: payload, id });
  };

  return {
    registration,
    initialValue,
    handleUpdateRegistration,
    isLoading,
  };
};
