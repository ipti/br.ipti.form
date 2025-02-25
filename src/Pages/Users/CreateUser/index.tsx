import { Form, Formik } from "formik";
import { useContext } from "react";
import * as Yup from "yup";
import ContentPage from "../../../Components/ContentPage";
import UsersProvider, { UsersContext } from "../../../Context/Users/context";
import { UsersTypes } from "../../../Context/Users/type";
import { Padding } from "../../../Styles/styles";
import InputsUser from "../Inputs";
import PasswordInput from "../../../Components/TextPassword";
import { Button } from "primereact/button";

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
    project: Yup.array().required("Campo Obrigatório"),
    initial_date: Yup.string().required("Campo Obrigatório"),
    birthday: Yup.string().required("Campo Obrigatório"),

    phone: Yup.string(),
    email: Yup.string(),
    sex: Yup.string().required("Campo Obrigatório"),
    color_race: Yup.string().required("Campo Obrigatório"),
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
          initial_date: "",
          phone: "",
          email: "",
          color_race: "",
          sex: "",
          birthday: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          props.CreateUser({
            ...values,
            sex: parseInt(values.sex),
            color_race: parseInt(values.color_race),
          });
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
              </div>{" "}
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
