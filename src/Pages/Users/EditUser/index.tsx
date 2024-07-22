import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import UsersProvider, { UsersContext } from "../../../Context/Users/context";
import { UsersTypes } from "../../../Context/Users/type";
import { useFetchRequestUsersOne } from "../../../Services/Users/query";
import { Container, Padding, Row } from "../../../Styles/styles";
import InputsUser from "../Inputs";
import queryClient from "../../../Services/reactquery";
import { formatarData } from "../../../Controller/controllerGlobal";

const EditUser = () => {
  return (
    <UsersProvider>
      <EditUserPage />
    </UsersProvider>
  );
};

const EditUserPage = () => {
  const props = useContext(UsersContext) as UsersTypes;

  const [loading, setLoading] = useState(true)

  useEffect(() => {
   if(loading){
    queryClient.removeQueries("useRequestsUsersOne")
    setLoading(false)
   }
  }, [loading])
  

  const { id } = useParams();

  const { data: project } = useFetchRequestUsersOne(parseInt(id!));

  const CreateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo Obrigatório")
      .min(8, "Nome deve ter pelo menos 8 caracteres"),
    username: Yup.string()
      .required("Campo Obrigatório")
      .min(8, "Nome do usuário deve ter pelo menos 8 caracteres"),
    // password: Yup.string()
    //   .required("Campo Obrigatório")
    //   .min(8, "Senha deve ter pelo menos 8 caracteres"),
    role: Yup.string().required("Campo Obrigatório"),
    project: Yup.array().required("Campo Obrigatório"),
    initial_date: Yup.string().required("Campo Obrigatório"),
    birthday: Yup.string().required("Campo Obrigatório"),
    phone: Yup.string(),
    email: Yup.string(),
    sex: Yup.string().required("Campo Obrigatório"),
    color_race: Yup.string().required("Campo Obrigatório"),
    // confirmPassword: Yup.string()
    //   .label("Confirmar senha")
    //   .required("Campo Obrigatório")
    //   .oneOf([Yup.ref("password")], "Senhas difirentes"),
  });

  const selectTs = (data: any) => {
    const array: any = []
    data.forEach((element: any) => {
      array.push(element.usersocialtechnology)
    });
    return array;
  }

  return (
    <Container>
      <Padding padding="8px" />
      <h3>Editar usuário</h3>
      <Padding />
      {project ? (
        <Formik
          initialValues={{
            name: project?.name ?? "",
            username: project?.username ?? "",
            role: project?.role ?? "",
            project: selectTs(project.user_social_technology),
            initial_date: project?.reapplicators[0]?.initial_date ? formatarData(project?.reapplicators[0]?.initial_date) : "",
            phone: project?.reapplicators[0]?.phone ?? "",
            email: project?.reapplicators[0]?.email ?? "",
            color_race: project?.reapplicators[0]?.color_race ?? "",
            sex: project?.reapplicators[0]?.sex ?? "",
            birthday: project?.reapplicators[0]?.birthday ?  formatarData(project?.reapplicators[0]?.birthday) : "",
          }}
          onSubmit={(values) => {
            props.UpdateUser(values, parseInt(id!));
          }}
          validationSchema={CreateUserSchema}
        >
          {({ values, handleChange, errors, touched }) => {

            return (
              <Form>
                <Row id="end">

                <Button label="Salvar" />
                </Row>
                <Padding padding="16px" />
                <InputsUser
                  errors={errors}
                  handleChange={handleChange}
                  touched={touched}
                  values={values}
                />
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </Container>
  );
};

export default EditUser;
