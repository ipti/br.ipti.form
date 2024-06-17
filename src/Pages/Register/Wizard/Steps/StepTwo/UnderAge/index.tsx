import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext } from "react";
import * as Yup from "yup";
import MaskInput from "../../../../../../Components/InputMask";
import TextInput from "../../../../../../Components/TextInput";
import { RegisterContext } from "../../../../../../Context/Register/context";
import { RegisterTypes } from "../../../../../../Context/Register/type";
import { validaCPF } from "../../../../../../Controller/controllerValidCPF";
import { Column, Padding, Row } from "../../../../../../Styles/styles";

const UnderAge = () => {
  const props = useContext(RegisterContext) as RegisterTypes;

  const initialValue = {
    responsable_cpf: props.dataValues.responsable_cpf ?? "",
    responsable_name: props.dataValues.responsable_name ?? "",
    
  };

  const schema = Yup.object().shape({
    responsable_cpf: Yup.string()
      .test("cpf-valid", "CPF inválido", (value) => validaCPF(value!))
      .required("CPF é obrigatório"),
    responsable_name: Yup.string().required(
      "Nome do responsável é obrigatório"
    ),
 
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
          {({ values, handleChange, errors, touched }) => {
            console.log(errors);
            return (
              <Form>
                <Row id="center">
                  <div className="col-12 md:col-4">
                    <Padding />
                    <div>
                      <label>Nome do responsável *</label>
                      <Padding />
                      <TextInput
                        placeholder="Nome do responsável *"
                        value={values.responsable_name}
                        name="responsable_name"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.responsable_name && touched.responsable_name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_name}
                      </div>
                    ) : null}
                    <Padding padding={props.padding} />
                    <div>
                      <label>CPF do responvável *</label>
                      <Padding />
                      <MaskInput
                        mask="999.999.999-99"
                        placeholder="CPF do responsável *"
                        value={values.responsable_cpf}
                        name="responsable_cpf"
                        onChange={handleChange}
                      />
                    </div>
                    {errors.responsable_cpf && touched.responsable_cpf ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_cpf}
                      </div>
                    ) : null}
                    
                    <Padding padding={props.padding} />
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

export default UnderAge;
