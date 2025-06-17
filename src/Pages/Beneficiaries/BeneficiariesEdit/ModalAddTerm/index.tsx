import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";
import CalendarComponent from "../../../../Components/Calendar";
import TextInput from "../../../../Components/TextInput";
import { ControllerUpdateRegistration } from "../../../../Services/PreRegistration/controller";
import { Column, Padding, Row } from "../../../../Styles/styles";
import { BeneficiariesEditContext } from "../../../../Context/Beneficiaries/BeneficiaresEdit/context";
import { BeneficiariesEditType } from "../../../../Context/Beneficiaries/BeneficiaresEdit/type";
import { useContext } from "react";

const ModalAddTerm = ({
  onHide,
  visible,
  id,
}: {
  onHide(): void;
  visible?: any;
  id: number;
}) => {

  const props = useContext(BeneficiariesEditContext) as BeneficiariesEditType;


  const { requestRegisterTermMutation } = ControllerUpdateRegistration();
  const CreateRegisterTerm = (data: FormData) => {
    requestRegisterTermMutation.mutate({ data: data });
  };

  const schema = Yup.object().shape({
    dateTerm: Yup.string().required("Data de assinatura é obrigatório"),
    dateValid: Yup.string().required("Data de validade é obrigatório"),
    file: Yup.string().required("Arquivo com termo é obrigatório"),
  });

  const schemaEdit = Yup.object().shape({
    dateTerm: Yup.string().required("Data de assinatura é obrigatório"),
    dateValid: Yup.string().required("Data de validade é obrigatório"),
  });

  return (
    <Dialog
      onHide={onHide}
      header={visible?.dateTerm ? "Editar termo" : "Novo termo"}
      visible={visible}
      style={{ width: window.innerWidth > 800 ? "50vw" : "70vw" }}
    >
      <Formik
        initialValues={{
          dateTerm: new Date(visible?.dateTerm) ?? new Date(Date.now()),
          dateValid: new Date(visible?.dateValid) ?? "",
          file: undefined,
          observation: visible?.observation ?? ""
        }}
        validationSchema={visible?.dateTerm ? schemaEdit : schema}
        onSubmit={(values) => {

          if (values.file) {
            const formData = new FormData();
            formData.append("dateTerm", values.dateTerm.toString());
            formData.append("dateValid", values.dateValid?.toString());
            formData.append("registration", id?.toString());
            formData.append("observation", values.observation)
            formData.append("file", values.file[0]);
            CreateRegisterTerm(formData);
          }

          if (visible?.dateTerm) {
            props.UpdateRegisterTerm(visible.id, { dateTerm: values.dateTerm, dateValid: values.dateValid, observation: values.observation })
          }

          onHide();
        }}
      >
        {({ values, handleChange, errors, touched, setFieldValue }) => {


          return (
            <Form>
              <div className="grid">
                <div className="col-12 md:col-6">
                  <label>Data de assinatura</label>
                  <Padding />
                  <CalendarComponent
                    value={values.dateTerm}
                    name="dateTerm"
                    dateFormat="dd/mm/yy"
                    onChange={handleChange}
                  />
                  {errors.dateTerm && touched.dateTerm ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.dateTerm)}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 md:col-6">
                  <label>Data de validade</label>
                  <Padding />
                  <CalendarComponent
                    value={values.dateValid}
                    name="dateValid"
                    dateFormat="dd/mm/yy"
                    placeholder="Data de validade"
                    onChange={handleChange}
                  />
                  {errors.dateValid && touched.dateValid ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.dateValid)}
                    </div>
                  ) : null}
                </div>
                {!visible?.dateTerm && <div className="col-12 md:col-6">
                  <label>Termo </label>
                  <Padding />
                  <TextInput
                    // value={file}
                    type="file"
                    placeholder="Termo"
                    onChange={(e) => setFieldValue("file", e.target.files)}
                    name="file"
                  />
                  {errors.file && touched.file ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.file)}
                    </div>
                  ) : null}
                </div>}
                <div className="col-12 md:col-6">
                  <label>Observações</label>
                  <Padding />
                  <TextInput
                    value={values.observation}
                    placeholder="Observações"
                    onChange={handleChange}
                    name="observation"
                  />
                  {errors.file && touched.file ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.file)}
                    </div>
                  ) : null}
                </div>
              </div>{" "}
              <Padding padding="16px" />
              <Column style={{ width: "100%" }}>
                <Row id="end">
                  <Button type="submit" label={visible.dateTerm ? "Salvar" : "Adicionar"} />
                </Row>
              </Column>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ModalAddTerm;
