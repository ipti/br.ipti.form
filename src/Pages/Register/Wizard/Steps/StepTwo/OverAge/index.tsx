import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import * as Yup from "yup";
import { RegisterContext } from "../../../../../../Context/Register/context";
import { RegisterTypes } from "../../../../../../Context/Register/type";
import { Column, Padding, Row } from "../../../../../../Styles/styles";
import InputsEquals from "../InputsEquals";

const OverAge = () => {
  const props = useContext(RegisterContext) as RegisterTypes;

  const initialValue = {
    responsable_telephone: props.dataValues.responsable_telephone ?? "",
    birthday: props.dataValues.birthday ?? "",
    zone: props.dataValues.zone ?? null,
    sex: props.dataValues.sex ?? null,
  };

  const schema = Yup.object().shape({
    responsable_telephone: Yup.string().required(
      "Telefone para contato é obrigatório"
    ),
    birthday: Yup.string()
      .nullable()
      .required("Data de nascimento é obrigatória"),
    zone: Yup.string().nullable().required("Zona é obrigatória"),
    sex: Yup.string().nullable().required("Sexo é obrigatória"),
    neighborhood: Yup.string()
      .nullable()
      .required("Bairro/Povoado é obrigatória"),
    address: Yup.string().nullable().required("Endereço é obrigatória"),
    state: Yup.string().nullable().required("Estado é obrigatório"),
    city: Yup.string().nullable().required("Cidade é obrigatório"),
  });

  return (
    <>
      <Column className="contentStart" id="center">
        <Formik
          initialValues={initialValue}
          validationSchema={schema}
          onSubmit={(values) => {
            props.NextStep(values);
          }}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => {
            return (
              <Form>
                <Row id="center">
                  <div className="col-12 md:col-4">
                    <InputsEquals
                      values={values}
                      errors={errors}
                      handleChange={handleChange}
                      touched={touched}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </Row>
                <Padding padding={props.padding} />
                <Row id="center" className={"marginTop marginButtom"}>
                  <div className="col-4">
                    <Button
                      type="submit"
                      // onClick={onButton}
                      className="t-button-primary"
                      label="Finalizar"
                      // disabled={!isValid}
                    />
                  </div>
                </Row>
              </Form>
            );
          }}
        </Formik>

        <Padding padding={props.padding} />
      </Column>
    </>
  );
};

export default OverAge;
