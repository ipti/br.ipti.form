import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import * as Yup from "yup";
import ContentPage from "../../../Components/ContentPage";
import PasswordInput from "../../../Components/TextPassword";
import UsersProvider, { UsersContext } from "../../../Context/Users/context";
import { UsersTypes } from "../../../Context/Users/type";
import { ROLE } from "../../../Controller/controllerGlobal";
import { Padding } from "../../../Styles/styles";
import InputsUser from "../Inputs";

const CreateUser = () => {
  return (
    <UsersProvider>
      <CreateUserPage />
    </UsersProvider>
  );
};

const CreateUserPage = () => {
  const props = useContext(UsersContext) as UsersTypes;

  const CreateUserSchema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório").min(8, "Nome deve ter pelo menos 8 caracteres"),
    username: Yup.string().required("Campo Obrigatório").min(8, "Nome do usuário deve ter pelo menos 8 caracteres"),
    password: Yup.string().required("Campo Obrigatório").min(8, "Senha deve ter pelo menos 8 caracteres"),
    role: Yup.string().required("Campo Obrigatório"),
    project: Yup.array().when("role", {
      is: ROLE.ADMIN,
      then: (schema) => schema,
      otherwise: (schema) =>
        schema
          .min(1, "Selecione pelo menos uma tecnologia")
          .required("Campo Obrigatório"),
    }),
    confirmPassword: Yup.string()
      .label("Confirmar senha")
      .required("Campo Obrigatório")
      .oneOf([Yup.ref("password")], "Senhas difirentes"),
  });

  return (
    <ContentPage title="Criar usuários" description="Criar usuário no meuBen.">
      <Padding />
      <Formik
        initialValues={{
          name: "",
          username: "",
          role: undefined,
          password: "",
          project: [],
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          props.CreateUser(values);
        }}
        validationSchema={CreateUserSchema}
      >
        {({ values, handleChange, errors, touched }) => {
          return (
            <Form>
              <InputsUser
                errors={errors}
                handleChange={handleChange}
                touched={touched}
                values={values}
                basicOnly
              />
              <div className="grid">
                <div className="col-12 md:col-6">
                  <label>Senha</label>
                  <Padding />
                  <PasswordInput
                    placeholder="Senha"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <Padding />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>
                      {errors.password}
                      <Padding />
                    </div>
                  ) : null}
                </div>
                <div className="col-12 md:col-6">
                  <label>Confirmar senha</label>
                  <Padding />
                  <PasswordInput
                    placeholder="Senha"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                  <Padding />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div style={{ color: "red" }}>
                      {errors.confirmPassword}
                      <Padding />
                    </div>
                  ) : null}
                </div>
              </div>
              <Padding padding="16px" />
              <Button label="Criar" icon={"pi pi-plus"} />
            </Form>
          );
        }}
      </Formik>
    </ContentPage>
  );
};

export default CreateUser;
