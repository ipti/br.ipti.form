import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  converterData,
  formatarData,
  getStatus,
  VerifyColor,
  VerifySex,
} from "../../../Controller/controllerGlobal";
import { useFetchRequestState } from "../../../Services/Address/query";
import { StateList } from "../../../Services/Address/type";
import { useFetchRequestClassroom } from "../../../Services/Classroom/query";
import { ControllerUpdateRegistration } from "../../../Services/PreRegistration/controller";
import {
  useFetchRequestProjectList,
  useFetchRequestRegistrationOne,
} from "../../../Services/PreRegistration/query";
import { CreateRegistrationClassroomType } from "../../../Services/PreRegistration/types";
import { UpdateRegister } from "../../Classroom/Registration/type";
import { Registration } from "./type";

export const BeneficiariesEditState = () => {
  const [project, setProject] = useState<any | undefined>();
  const { data: projectRequet } = useFetchRequestProjectList();
  const { data: classroomsFetch } = useFetchRequestClassroom(project!);
  const [classrooms, setClassrooms] = useState<any>();
  const [file, setFile] = useState<File[] | undefined>();

  const [state, setState] = useState<StateList | undefined>();

  
  
  const { data: stateRequest } = useFetchRequestState()
  
  
  useEffect(() => {
    if (stateRequest) {
      setState(stateRequest)
    }
  }, [stateRequest])
  
  const { id } = useParams();
  const {
    requestRegistrationClassroomMutation,
    requestDeleteRegistrationClassroomMutation,
    requestPreRegistrationMutation,
    requestCHangeAvatarRegistrationMutation,
  } = ControllerUpdateRegistration();
  const { data: registrationsRequests, isLoading } =
  useFetchRequestRegistrationOne(id!);
  const [registrations, setRegistrations] = useState<
  Registration | undefined
  >();
  
  useEffect(() => {
    if (classroomsFetch) {
      setClassrooms(classroomsFetch);
    }
  }, [classroomsFetch, project]);

  useEffect(() => {
    if (registrationsRequests) {
      setRegistrations(registrationsRequests);
    }
  }, [registrationsRequests]);

  const date = new Date(registrations?.birthday!);
const stateList = state?.find(props => props.id === registrations?.state_fk)
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
    deficiency_description: registrations?.deficiency_description,
    kinship: registrations?.kinship,
    address: registrations?.address ?? "",
    cep: registrations?.cep ?? "",
    neighborhood: registrations?.neighborhood ?? "",
    number: registrations?.number ?? "",
    complement: registrations?.complement ?? "",
    state: state?.find(props => props.id === registrations?.state_fk) ?? "",
    city: stateList?.city.find(props => props.id === registrations?.city_fk) ?? ""
  };

  const CreateRegisterClassroom = (data: CreateRegistrationClassroomType) => {
    requestRegistrationClassroomMutation.mutate(data);
  };

  const DeleteRegistration = (id: number) => {
    requestDeleteRegistrationClassroomMutation.mutate(id);
  };

  const handleUpdateRegistration = (data: UpdateRegister, id: number) => {
    if (file) {
      requestCHangeAvatarRegistrationMutation.mutate({
        id: id,
        file: file[0],
      });
    }
    requestPreRegistrationMutation.mutate({
      data: {
        ...data,
        birthday: converterData(data?.birthday?.toString()!),
        responsable_telephone: data?.responsable_telephone?.replace(
          /[^a-zA-Z0-9]/g,
          ""
        ),
        kinship: data.kinship === "" ? "NAO_DEFINIDO" : data.kinship,
        responsable_cpf: data?.responsable_cpf?.replace(/[^a-zA-Z0-9]/g, ""),
        cpf: data?.cpf?.replace(/[^a-zA-Z0-9]/g, ""),

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
    classrooms,
    file,
    setFile,
  };
};
