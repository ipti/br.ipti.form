import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import DropdownComponent from "../../../Components/Dropdown";
import MaskInput from "../../../Components/InputMask";
import Loading from "../../../Components/Loading";
import TextInput from "../../../Components/TextInput";
import BeneficiariesCreateProvider, {
  BeneficiariesCreateContext,
} from "../../../Context/Beneficiaries/BeneficiaresCreate/context";
import { BeneficiariesCreateType } from "../../../Context/Beneficiaries/BeneficiaresCreate/type";
import { color_race, typesex } from "../../../Controller/controllerGlobal";
import { Column, Container, Padding, Row } from "../../../Styles/styles";
import CalendarComponent from "../../../Components/Calendar";
import * as Yup from "yup";
import { validaCPF } from "../../../Controller/controllerValidCPF";
import RadioButtonComponent from "../../../Components/RadioButton";

const BeneficiariesCreate = () => {
  return (
    <BeneficiariesCreateProvider>
      <RegistrationPage />
    </BeneficiariesCreateProvider>
  );
};

const RegistrationPage = () => {
  const props = useContext(
    BeneficiariesCreateContext
  ) as BeneficiariesCreateType;

  const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    color_race: Yup.string().required("Raça/cor é obrigatório"),
    deficiency: Yup.boolean().required("Deficiência é obrigatória"),
    cpf: Yup.string().test("cpf-valid", "CPF inválido", (value) => {
      if (value && value.trim() !== "") {
        return validaCPF(value);
      }
      return true;
    }),
    responsable_cpf: Yup.string().test("cpf-valid", "CPF inválido", (value) => {
      if (value && value.trim() !== "") {
        return validaCPF(value);
      }
      return true;
    }),
    responsable_telephone: Yup.string().required("Telefone é obrigatório"),
    birthday: Yup.string()
      .nullable()
      .required("Data de nascimento é obrigatória"),
    zone: Yup.string().nullable().required("Zona é obrigatório"),
    project: Yup.string().nullable().required("Projeto é obrigatório"),
    classroom: Yup.string().nullable().required("Classroom é obrigatório"),

    sex: Yup.string().nullable().required("Sexo é obrigatória"),
  });

  if (false) return <Loading />;

  return (
    <Container>
      <h1>Criar Beneficiario</h1>
      <Padding padding="16px" />
      {true ? (
        <Formik
          initialValues={props.initialValue}
          validationSchema={schema}
          onSubmit={(values) => {
            delete values.project;
            props.CreateRegister({ ...values });
          }}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => {
            console.log(errors);
            return (
              <Form>
                <Column>
                  <Row id="end">
                    <Button label="Criar" type="submit" />
                  </Row>
                </Column>
                <Padding padding="8px" />
                <h3>Verificar Cadastro</h3>
                <Padding padding="8px" />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>CPF</label>
                    <Padding />
                    <MaskInput
                      value={values.cpf}
                      mask="999.999.999-99"
                      placeholder="CPF"
                      onChange={handleChange}
                      name="cpf"
                    />
                    {errors.cpf && touched.cpf ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.cpf}
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
                <Padding padding="8px" />
                <h3>Dados basicos</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Name *</label>
                    <Padding />
                    <TextInput
                      value={values.name}
                      placeholder="name"
                      onChange={handleChange}
                      name="name"
                    />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Sexo *</label>
                    <Padding />
                    <DropdownComponent
                      value={values.sex}
                      optionsLabel="type"
                      options={typesex}
                      optionsValue="id"
                      placerholder="Selecione seu sexo"
                      name="sex"
                      onChange={handleChange}
                    />
                    {errors.sex && touched.sex ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.sex}
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Data de Nascimento *</label>
                    <Padding />
                    <CalendarComponent
                      value={values.birthday}
                      placeholder="Data de Nascimento"
                      name="birthday"
                      onChange={handleChange}
                    />
                    {errors.birthday && touched.birthday ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.birthday}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Cor de raça *</label>
                    <Padding />
                    <DropdownComponent
                      value={values.color_race}
                      options={color_race}
                      placerholder="Selecione sua cor de raça"
                      name="color_race"
                      optionsValue="id"
                      onChange={handleChange}
                    />{" "}
                    {errors.color_race && touched.color_race ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.color_race}
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Deficiente *</label>
                    <Padding />
                    <DropdownComponent
                      value={values.deficiency}
                      placerholder="Possui deficiência?"
                      name="deficiency"
                      onChange={handleChange}
                      optionsValue="id"
                      options={[
                        { id: true, name: "Sim" },
                        { id: false, name: "Não" },
                      ]}
                    />
                    {errors.deficiency && touched.deficiency ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.deficiency}
                      </div>
                    ) : null}
                    <div className="col-12 md:col-6">
                      <label>Telefone para contato *</label>
                      <Padding />
                      <MaskInput
                        value={values.responsable_telephone}
                        mask="(99) 9 9999-9999"
                        name="responsable_telephone"
                        onChange={handleChange}
                        placeholder="name"
                      />
                      {errors.responsable_telephone &&
                      touched.responsable_telephone ? (
                        <div style={{ color: "red", marginTop: "8px" }}>
                          {errors.responsable_telephone}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {values.deficiency && (
                    <div className="col-12 md:col-6">
                      <label>Qual deficiência?</label>
                      <Padding />
                      <TextInput
                        value={values.deficiency_description}
                        name="deficiency_description"
                        onChange={handleChange}
                        placeholder="Qual deficiência ?"
                      />
                    </div>
                  )}
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Zona *</label>
                    <Padding />
                    <Column id="end">
                      <Row className="gap-2">
                        <RadioButtonComponent
                          value={1}
                          checked={values.zone === 1}
                          onChange={handleChange}
                          name="zone"
                          label="Rural"
                        />
                        <RadioButtonComponent
                          value={2}
                          checked={values.zone === 2}
                          onChange={handleChange}
                          name="zone"
                          label="Urbana"
                        />
                      </Row>
                    </Column>
                    {errors.zone && touched.zone ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.zone}
                      </div>
                    ) : null}
                  </div>
                </div>
                <Padding padding="8px" />
                <h3>Dados Responsavel</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Nome</label>
                    <Padding />
                    <TextInput
                      value={values.responsable_name}
                      name="responsable_name"
                      onChange={handleChange}
                      placeholder="Nome do Resposável"
                    />
                    {errors.responsable_name && touched.responsable_name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_name}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 md:col-6">
                    <label>CPF Responsavel</label>
                    <Padding />
                    <MaskInput
                      value={values.responsable_cpf}
                      mask="999.999.999-99"
                      name="responsable_cpf"
                      placeholder="CPF do Responsável"
                      onChange={handleChange}
                    />
                    {errors.responsable_cpf && touched.responsable_cpf ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_cpf}
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
                <Padding padding="8px" />
                <h3>Matricula *</h3>
                <Padding padding="8px" />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Matricula</label>
                    <Padding />
                    <DropdownComponent
                      value={props.project}
                      placerholder="Selecione o projeto"
                      name="project"
                      onChange={(e) => {
                        props.setProject(e.target.value);
                        setFieldValue("project", e.target.value);
                      }}
                      options={props.tsOne?.project}
                      optionsLabel="name"
                      optionsValue="id"
                    />
                    {errors.project && touched.project ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.project}
                      </div>
                    ) : null}
                  </div>
                  {props.classrooms ? (
                    <div className="col-12 md:col-6">
                      <label>Turma</label>
                      <Padding />
                      <DropdownComponent
                        value={values.classroom}
                        placerholder="Selecione a turma"
                        name="classroom"
                        optionsValue="id"
                        onChange={handleChange}
                        options={props.classrooms}
                      />
                      {errors.classroom && touched.classroom ? (
                        <div style={{ color: "red", marginTop: "8px" }}>
                          {errors.classroom}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>{" "}
                {/* <h3>Endereço</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>CEP</label>
                    <Padding />
                    <TextInput
                      value={values.responsable_name}
                      placeholder="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Endereço</label>
                    <Padding />
                    <TextInput value={values.responsable_cpf} />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Complemento</label>
                    <Padding />
                    <TextInput value={values.responsable_cpf} />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Estado </label>
                    <Padding />
                    <TextInput
                      value={values.responsable_telephone}
                      placeholder="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Cidade </label>
                    <Padding />
                    <TextInput
                      value={values.responsable_telephone}
                      placeholder="name"
                    />
                  </div>
                </div>{" "} */}
              </Form>
            );
          }}
        </Formik>
      ) : null}
    </Container>
  );
};
export default BeneficiariesCreate;
