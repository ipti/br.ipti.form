import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import TagImage from "../../Assets/images/taglogin.svg";

import { Password } from 'primereact/password';

import { Button } from "primereact/button";
import { useContext } from "react";
import * as Yup from 'yup';
import TextInput from "../../Components/TextInput";
import LoginProvider, { LoginContext } from "../../Context/Login/context";
import { LoginContextText } from "../../Context/Login/types";
import { Column, Padding, Row } from "../../Styles/styles";
import { ContainerLogin, TopColors } from "./styles";
import PasswordInput from "../../Components/TextPassword";


const Login = () => {
  return (
    <LoginProvider>
      <LoginPage />
    </LoginProvider>
  )
}

const LoginPage = () => {

  const props = useContext(LoginContext) as LoginContextText

  const LoginSchema = Yup.object().shape({
    password: Yup.string()
      .required('Campo Obrigatório'),
    username: Yup.string().required('Campo Obrigatório'),
  });
  return (
    <ContainerLogin>
      <Row style={{ height: 1 }}>
        <TopColors color="#667DF4" />
        <TopColors color="#F45A5A" />
        <TopColors color="#66D654" />
        <TopColors color="#EADA48" />
      </Row>
      <img id="margin" src={TagImage} alt=""></img>
      <Column
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            position: "relative",
          }}
        >
          <div className="col-11 md:col-4">
            {/* <div className={classes.marginMobile20} /> */}
            <div>
              <div>
                <p id="titleLogin">Matricula Online </p>
                <div className="p-2" />
                <p id="subTitleLogin">Entre com as suas credenciais </p>
              </div>
            </div>
            {/* <div className={classes.marginMobile} /> */}
            <div className="p-2" />

            <Formik
              initialValues={props.initialValue}
              onSubmit={(values) => { props.Login(values); }}
              validationSchema={LoginSchema}
              validateOnChange={false}
            >
              {({ values, errors, handleChange }) => {
                console.log(values)
                return (
                  <Form>
                    <div>
                      <div>
                        <TextInput
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          placeholder="Usuário"
                        />
                        <div>{errors.username}</div>
                      </div>
                    </div>
                    <div className="p-2" />
                    <div>
                      <div>
                        <PasswordInput name="password" placeholder="Senha" onChange={handleChange} value={values.password} />
                        <div>{errors.password}</div>
                      </div>
                    </div>
                    <Padding />

                    {
                      props.error ? <div

                      >
                        <div>
                          {!props.error ? "Usuário ou senha inválido" : ""}
                        </div>
                      </div> : null
                    }
                    <div className="p-2" />
                    <div>
                      <div>
                        <Button
                          className={"t-button-primary"}
                          type="submit"
                          label="Entrar"
                        />
                      </div>
                    </div>
                    <div className="p-2" />
                    <div className="flex row justify-content-center ">
                      <div
                        className="flex row gap-2"
                        id="resetPassword textCenter"
                      >
                        <Column id="center">Faça a sua matricula</Column>
                        <Link id="link" to="/register">
                          clique aqui
                        </Link>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Column>
    </ContainerLogin>
  );
};

export default Login;