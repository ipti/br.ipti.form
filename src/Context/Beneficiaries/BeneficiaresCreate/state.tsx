import { useEffect, useState } from "react";
import { useFetchRequestTsLists } from "../../../Services/Project/query";
import { Tsone } from "../../Project/ProjectList/type";
import { useFetchRequestClassroom } from "../../../Services/Classroom/query";
import { ControllerPreRegistration } from "../../../Services/PreRegistration/controller";

export const BeneficiariesCreateState = () => {
  const [tsOne, setTsOne] = useState<Tsone | undefined>();
  const { data: tsOneRequest } = useFetchRequestTsLists(undefined);
  const [project, setProject] = useState<any | undefined>();
  const { data: classroomsFetch } = useFetchRequestClassroom(project!)
  const [classrooms, setClassrooms] = useState<any>();
  const props = ControllerPreRegistration()

  

  useEffect(() => {
    if (classroomsFetch) {
      setClassrooms(classroomsFetch)
    }
  }, [classroomsFetch, project])

  useEffect(() => {
    if (tsOneRequest) {
      setTsOne(tsOneRequest);
      // setProject(tsOneRequest?.project[0]);
    }
  }, [tsOneRequest]);

  const CreateRegister = (values: any) => {
    const data = new Date(values?.birthday);
    const dataFormatada = data?.toISOString()?.split('T')[0];
    props.requestRegistrationMutation.mutate({ ...values, cpf: values.cpf.replace(/[^a-zA-Z0-9]/g, ''),kinship: values.kinship === "" ? "NAO_DEFINIDO" : values.kinship, responsable_telephone: values.responsable_telephone.replace(/[^a-zA-Z0-9]/g, ''), birthday: dataFormatada, responsable_cpf: values?.responsable_cpf?.replace(/[^a-zA-Z0-9]/g, '') })
  }


  const initialValue = {
    name: "",
    sex: "",
    cpf: "",
    color_race: "",
    birthday: "",
    deficiency: "",
    responsable_name: "",
    responsable_cpf: "",
    responsable_telephone: "",
    zone: undefined,
    project: undefined,
    status: "",
    classroom: 0,
    deficiency_description: "",
    kinship: "", 
    address: "",
    cep: "",
    neighborhood: "",
    number: "",
    complement: "",
    state: undefined,
    city: undefined
  };

  
  return {
    initialValue,
    tsOne,
    project,
    setProject,
    classrooms,
    CreateRegister
  };
};
