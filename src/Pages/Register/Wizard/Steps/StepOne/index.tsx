import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import DropdownComponent from "../../../../../Components/Dropdown";
import RadioButtonComponent from "../../../../../Components/RadioButton";
import TextInput from "../../../../../Components/TextInput";
import { RegisterContext } from "../../../../../Context/Register/context";
import { RegisterTypes } from "../../../../../Context/Register/type";
import * as Yup from "yup";
import { Column, Padding, Row } from "../../../../../Styles/styles";
import MaskInput from "../../../../../Components/InputMask";
import { validaCPF } from "../../../../../Controller/controllerValidCPF";
import InputsEquals from "../StepTwo/InputsEquals";

const StepOne = () => {
  const props = useContext(RegisterContext) as RegisterTypes;

  const initialValue = {
    cpf: props.dataValues.cpf ?? "",
    name: props.dataValues.name ?? "",
    color_race: props.dataValues.color_race ?? "",
    deficiency: props.dataValues.deficiency ?? null,
    responsable_telephone: props.dataValues.responsable_telephone ?? "",
    birthday: props.dataValues.birthday ?? "",
    zone: props.dataValues.zone ?? null,
    sex: props.dataValues.sex ?? null,
    deficiency_description: props.dataValues.deficiency_description ?? "",
    city: props.dataValues.city ?? "",
    state: props.dataValues.state ?? ""
  };

  const schema = Yup.object().shape({
    cpf: Yup.string()
      .test("cpf-valid", "CPF inválido", (value) => validaCPF(value!))
      .required("CPF é obrigatório"),
    name: Yup.string().required("Nome é obrigatório"),
    color_race: Yup.string().required("Raça/cor é obrigatório"),
    deficiency: Yup.boolean().required("Deficiência é obrigatória"),
  });

  const schemaNotCpf = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    color_race: Yup.string().required("Raça/cor é obrigatório"),
    deficiency: Yup.boolean().required("Deficiência é obrigatória"),
    responsable_telephone: Yup.string().required(
      "Telefone para contato é obrigatório"
    ),
    cpf: Yup.string()
    .test("cpf-valid", "CPF inválido", (value) => validaCPF(value!))
    .required("CPF é obrigatório"),
    birthday: Yup.string()
      .nullable()
      .required("Data de nascimento é obrigatória"),
    zone: Yup.string().nullable().required("Zona é obrigatória"),
    sex: Yup.string().nullable().required("Sexo é obrigatória"),
    state: Yup.string().nullable().required("Estado é obrigatório"),
    city: Yup.string().nullable().required("Cidade é obrigatório"),
  });

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={props.isOverAge ? schema : schemaNotCpf}
        onSubmit={(values) => props.NextStep(values)}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {
          return (
            <Form>
              <Column className="contentStart" id="center">
                <Row id="center">
                  <div className="col-12 md:col-4">
                    <Padding />
                    <div>
                      <label>{"CPF *"}</label>
                      <Padding />
                      <MaskInput
                        mask="999.999.999-99"
                        placeholder={"CPF *"}
                        name="cpf"
                        value={values.cpf}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.cpf && touched.cpf ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.cpf}
                      </div>
                    ) : null}{" "}
                    <Padding padding={props.padding} />
                    <div>
                      <label>Nome *</label>
                      <Padding />
                      <TextInput
                        placeholder="Nome *"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                      />
                    </div>
                    {errors.name && touched.name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.name}
                      </div>
                    ) : null}
                    <Padding padding={props.padding} />
                    <div>
                      <label>Cor/Raça *</label>
                      <Padding />
                      <DropdownComponent
                        placerholder="Cor/Raça *"
                        value={values.color_race}
                        onChange={handleChange}
                        name="color_race"
                        optionsLabel="label"
                        options={props.color_race}
                      />
                    </div>
                    {errors.color_race && touched.color_race ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.color_race}
                      </div>
                    ) : null}
                    <Padding padding={props.padding} />
                    <div>
                      <label>Possui Deficiência? *</label>
                      <Padding />
                      <Row className="gap-2">
                        <RadioButtonComponent
                          label="Sim"
                          name="deficiency"
                          value={true}
                          checked={values.deficiency === true}
                          onChange={handleChange}
                        />
                        <RadioButtonComponent
                          label="Não"
                          name="deficiency"
                          value={false}
                          checked={values.deficiency === false}
                          onChange={handleChange}
                        />
                      </Row>
                    </div>
                    {values.deficiency && (
                      <>
                        <Padding padding={props.padding} />

                        <div>
                          <label>Qual deficiência?</label>
                          <Padding />
                          <TextInput
                            placeholder="Qual deficiência?"
                            name="deficiency_description"
                            onChange={handleChange}
                            value={values.deficiency_description}
                          />
                        </div>

                        {errors.deficiency_description &&
                        touched.deficiency_description ? (
                          <div style={{ color: "red", marginTop: "8px" }}>
                            {errors.deficiency_description}
                          </div>
                        ) : null}
                      </>
                    )}
                    {errors.deficiency && touched.deficiency ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.deficiency}
                      </div>
                    ) : null}
                    {!props.isOverAge && (
                      <InputsEquals
                        errors={errors}
                        handleChange={handleChange}
                        touched={touched}
                        values={values}
                        setFieldValue={setFieldValue}
                      />
                    )}
                  </div>
                </Row>
                <Padding padding={props.padding} />
                <Row id="center" className={"marginTop marginButtom"}>
                  <div className="col-4">
                    <Button
                      type="submit"
                      // onClick={onButton}
                      className="t-button-primary"
                      label="Continuar"
                      // disabled={!isValid}
                    />
                  </div>
                </Row>
                <Padding padding={props.padding} />
              </Column>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default StepOne;
