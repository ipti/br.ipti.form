import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useFetchRequestProjectList,
  useFetchRequestRegistrationOne,
} from "../../../Services/PreRegistration/query";
import { Registration } from "./type";
import {
  formatarData,
  getStatus,
  VerifyColor,
  VerifySex,
} from "../../../Controller/controllerGlobal";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import { CreateRegistrationClassroomType } from "../../../Services/PreRegistration/types";
import { UpdateRegister } from "../../Classroom/Registration/type";
import { useFetchRequestClassroom } from "../../../Services/Classroom/query";

export const BeneficiariesEditState = () => {
  const [project, setProject] = useState<any | undefined>();
  const { data: projectRequet } = useFetchRequestProjectList();
  const { data: classroomsFetch } = useFetchRequestClassroom(project!)
  const [classrooms, setClassrooms] = useState<any>();

  const { id } = useParams();
  const {
    requestRegistrationClassroomMutation,
    requestDeleteRegistrationClassroomMutation,
    requestPreRegistrationMutation,
  } = ControllerUpdateRegistration();
  const { data: registrationsRequests, isLoading } =
    useFetchRequestRegistrationOne(id!);
  const [registrations, setRegistrations] = useState<
    Registration | undefined
  >();

  useEffect(() => {
    if (classroomsFetch) {
        setClassrooms(classroomsFetch)
    }
}, [classroomsFetch, project])

  useEffect(() => {
    if (registrationsRequests) {
      setRegistrations(registrationsRequests);
    }
  }, [registrationsRequests]);

  const date = new Date(registrations?.birthday!);

  const initialValue = {
    name: registrations?.name,
    sex: VerifySex(registrations?.sex!),
    cpf: registrations?.cpf,
    color_race: VerifyColor(registrations?.color_race!),
    birthday: !isNaN(date.getTime())
      ? formatarData(registrations?.birthday!)
      : registrations?.birthday,
    deficiency: registrations?.deficiency
      ? { name: "Sim", id: true }
      : { name: "Não", id: false },
    responsable_name: registrations?.responsable_name,
    responsable_cpf: registrations?.responsable_cpf,
    responsable_telephone: registrations?.responsable_telephone,
    status: getStatus(registrations?.status!),
  };

  const CreateRegisterClassroom = (data: CreateRegistrationClassroomType) => {
    requestRegistrationClassroomMutation.mutate(data);
  };

  const DeleteRegistration = (id: number) => {
    requestDeleteRegistrationClassroomMutation.mutate(id);
  };

  const handleUpdateRegistration = (data: UpdateRegister, id: number) => {
    requestPreRegistrationMutation.mutate({
      data: {
        ...data,
        birthday: data?.birthday,
        responsable_telephone: data?.responsable_telephone?.replace(
          /[^a-zA-Z0-9]/g,
          ""
        ),
        responsable_cpf: data?.responsable_cpf?.replace(/[^a-zA-Z0-9]/g, ""),
      },
      id: id,
    });
  };
  return {
    registrations,
    initialValue,
    isLoading,
    handleUpdateRegistration,
    DeleteRegistration,
    CreateRegisterClassroom,
    projectRequet,
    project,
    setProject,
    classrooms
  };
};
