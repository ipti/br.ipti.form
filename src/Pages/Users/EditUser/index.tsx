import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import ContentPage from "../../../Components/ContentPage";
import { AplicationContext } from "../../../Context/Aplication/context";
import UsersProvider, { UsersContext } from "../../../Context/Users/context";
import { UsersTypes } from "../../../Context/Users/type";
import { formatarData, ROLE } from "../../../Controller/controllerGlobal";
import queryClient from "../../../Services/reactquery";
import { useFetchRequestUsersOne } from "../../../Services/Users/query";
import color from "../../../Styles/colors";
import { Padding, Row } from "../../../Styles/styles";
import typography from "../../../Styles/typography";
import { PropsAplicationContext } from "../../../Types/types";
import InputsUser from "../Inputs";

const EditUser = () => {
  return (
    <UsersProvider>
      <EditUserPage />
    </UsersProvider>
  );
};

const LinkSenha = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  .link {
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
    font-family: ${typography.types.inter};
    color: ${color.colorsBaseProductNormal};
    :hover {
      text-decoration: underline;
    }
  }
`;

const EditUserPage = () => {
  const props = useContext(UsersContext) as UsersTypes;
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      queryClient.removeQueries("useRequestsUsersOne");
      setLoading(false);
    }
  }, [loading]);

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
    const array: any = [];
    data.forEach((element: any) => {
      array.push(element.usersocialtechnology);
    });
    return array;
  };

  return (
    <ContentPage title="Editar usuário" description="Faça a edição do usuário.">
      <Padding />
      {project ? (
        <Formik
          initialValues={{
            name: project?.name ?? "",
            username: project?.username ?? "",
            role: project?.role ?? "",
            project: selectTs(project.user_social_technology),
            initial_date: project?.reapplicators[0]?.initial_date
              ? formatarData(project?.reapplicators[0]?.initial_date)
              : "",
            phone: project?.reapplicators[0]?.phone ?? "",
            email: project?.reapplicators[0]?.email ?? "",
            color_race: project?.reapplicators[0]?.color_race ?? "",
            sex: project?.reapplicators[0]?.sex ?? "",
            birthday: project?.reapplicators[0]?.birthday
              ? formatarData(project?.reapplicators[0]?.birthday)
              : "",
          }}
          onSubmit={(values) => {
            props.UpdateUser(values, parseInt(id!));
          }}
          validationSchema={CreateUserSchema}
        >
          {({ values, handleChange, errors, touched }) => {
            return (
              <Form>
                <Row
                  id={
                    propsAplication.user?.role === ROLE.ADMIN
                      ? "space-between"
                      : "end"
                  }
                >
                  {propsAplication.user?.role === ROLE.ADMIN && (
                    <LinkSenha>
                      <Link to={"/users/senha/" + id} className="link">
                        <LinkSenha>Alterar senha</LinkSenha>
                      </Link>
                    </LinkSenha>
                  )}

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
    </ContentPage>
  );
};

export default EditUser;
