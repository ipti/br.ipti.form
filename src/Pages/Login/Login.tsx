import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

import TagImage from "../../Assets/images/logo.svg";

import { Button } from "primereact/button";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import DropdownComponent from "../../Components/Dropdown";
import TextInput from "../../Components/TextInput";
import PasswordInput from "../../Components/TextPassword";
import LoginProvider, { LoginContext } from "../../Context/Login/context";
import { LoginContextText } from "../../Context/Login/types";
import { setYear } from "../../Services/localstorage";
import { Padding, Row } from "../../Styles/styles";
import { ContainerLogin } from "./styles";

const Login = () => {
  return (
    <LoginProvider>
      <LoginPage />
    </LoginProvider>
  );
};

const LoginPage = () => {
  const props = useContext(LoginContext) as LoginContextText;

  const years = [
    { value: 2025 },
    { value: 2024 },
    { value: 2023 },
    { value: 2022 },
    { value: 2021 },
  ];


  const [year, setYearState] = useState<any>();

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Campo Obrigatório"),
    username: Yup.string().required("Campo Obrigatório"),
  });

  useEffect(() => {
    setYear("2025");
    setYearState(2025);
  }, []);

  return (
    <ContainerLogin>
      <div className="grid h-full">


        <div
          // style={{
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "center",
          //   alignItems: "center",
          //   height: "100%",
          //   width: "100%",
          //   position: "relative",
          // }}
          className="col-12 lg:col-5"
        >
          <Row style={{justifyContent: "center"}}>

            <div className="resetPassword textCenter">
              <div className="buttonLogin">
                Faça sua matricula
                <Link className="link" to="/register">
                  clique aqui
                </Link>
              </div>
            </div>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              position: "relative",
              overflowY: "auto"
            }}
          >
            <div className="col-11 md:col-9">
              {/* <div className={classes.marginMobile20} /> */}
              <Row style={{ justifyContent: "center" }}>
                <img src={TagImage} alt=""></img>
              </Row>
              {/* <div className={classes.marginMobile} /> */}
              <div className="p-4" />
              <Formik
                initialValues={props.initialValue}
                onSubmit={(values) => {
                  props.Login(values);
                }}
                validationSchema={LoginSchema}
                validateOnChange={false}
              >
                {({ values, errors, handleChange, touched }) => {
                  return (
                    <Form>
                      <div>
                        <div>
                          <label>Usuário</label>
                          <Padding />
                          <TextInput
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Usuário"
                          />
                          <Padding />
                          {errors.username && touched.username ? (
                            <div style={{ color: "red", marginTop: "8px" }}>
                              {errors.username}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="p-2" />
                      <div>
                        <div>
                          <label>Senha</label>
                          <Padding />
                          <PasswordInput
                            name="password"
                            placeholder="Senha"
                            onChange={handleChange}
                            value={values.password}
                          />
                          <Padding />
                          {errors.password && touched.password ? (
                            <div style={{ color: "red", marginTop: "8px" }}>
                              {errors.password}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <Padding />
                      <div>
                        <div>
                          <label>Ano</label>
                          <Padding />
                          <DropdownComponent
                            options={years}
                            placerholder="Ano"
                            onChange={(e) => {
                              setYearState(e.target.value);
                              setYear(e.target.value.toString());
                            }}
                            optionsLabel="value"
                            optionsValue="value"
                            value={year}
                          />
                        </div>
                      </div>
                      <Padding />

                      {props.error ? (
                        <div>
                          <div>
                            {!props.error ? "Usuário ou senha inválido" : ""}
                          </div>
                        </div>
                      ) : null}
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
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
        <div className="col-0 lg:col-7 w-auto"
        >
          <div className="imgBack">
            <div className="divBlue" />
            <div className="formSignUp">
              <div className="TextLarge">
                Maximizando Eficiência <br />e Transparência
              </div>
              <Padding padding="8px" />
              <Row id="center" style={{ width: "65%" }}>
                <p className="pLogin">Solução completa para otimizar a distribuição de benefícios, promover a transparência e fortalecer a confiança das comunidades nos programas do THP.</p>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </ContainerLogin>
  );
};

export default Login;
