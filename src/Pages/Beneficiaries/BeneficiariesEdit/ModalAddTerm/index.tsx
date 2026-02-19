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
import { Dropdown } from "primereact/dropdown";
import { StatusTermEnum, TypeTermEnum } from "../../../../Controller/controllerGlobal";

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

        const optionsStatus = Object.keys(StatusTermEnum).map((key) => ({ id: key, name: StatusTermEnum[key] })) || [];
        const optionsType = Object.keys(TypeTermEnum).map((key) => ({ id: key, name: TypeTermEnum[key] })) || [];

  return (
    <Dialog
      onHide={onHide}
      header={visible?.dateTerm ? "Editar termo" : "Novo termo"}
      visible={visible}
      style={{ width: window.innerWidth > 800 ? "50vw" : "70vw" }}
    >
      <Formik
        initialValues={{
          dateTerm: new Date(visible?.dateTerm || Date.now()) ?? new Date(Date.now()),
          dateValid: new Date(visible?.dateValid || Date.now()) ?? new Date(Date.now()),
          file: undefined,
          observation: visible?.observation ?? "",
          status: visible?.status ?? "",
          type: visible?.type ?? "",
        }}
        validationSchema={visible?.dateTerm ? schemaEdit : schema}
        onSubmit={(values) => {

          if (values.file) {
            const formData = new FormData();
            formData.append("dateTerm", values.dateTerm.toString());
            formData.append("dateValid", values.dateValid?.toString());
            formData.append("registration", id?.toString());
            formData.append("observation", values.observation)
            formData.append("status", values.status)
            formData.append("type", values.type)
            formData.append("file", values.file[0]);
            CreateRegisterTerm(formData);
          }

          if (visible?.dateTerm) {
            props.UpdateRegisterTerm(visible.id, { dateTerm: values.dateTerm, dateValid: values.dateValid, observation: values.observation, status: values.status, type: values.type });  
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
                    placeholder="Data de assinatura"
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
                 { <div className="col-12 md:col-6">
                  <label>Status </label>
                  <Padding />
                  <Dropdown
                      value={values.status}
                      options={optionsStatus || []}
                      optionLabel="name"
                      optionValue="id"
                    placeholder="Status"
                    onChange={(e) => setFieldValue("status", e.value)}
                    name="status"
                    className="w-full"
                  />
                  {errors.status && touched.status ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.status)}
                    </div>
                  ) : null}
                </div>}
                   { <div className="col-12 md:col-6">
                  <label>Tipo </label>
                  <Padding />
                  <Dropdown
                      value={values.type}
                      options={optionsType || []}
                      optionLabel="name"
                      optionValue="id"
                    placeholder="Tipo"
                    onChange={(e) => setFieldValue("type", e.value)}
                    name="type"
                    className="w-full"
                  />
                  {errors.type && touched.type ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.type)}
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
