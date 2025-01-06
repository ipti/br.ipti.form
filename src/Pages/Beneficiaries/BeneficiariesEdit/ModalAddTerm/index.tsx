import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import * as Yup from "yup";
import CalendarComponent from "../../../../Components/Calendar";
import TextInput from "../../../../Components/TextInput";
import { ControllerUpdateRegistration } from "../../../../Services/PreRegistration/controller";
import { Column, Padding, Row } from "../../../../Styles/styles";


const ModalAddTerm = ({
  onHide,
  visible,
  id
}: {
  onHide(): void;
  visible?: boolean | undefined;
  id: number
}) => {


  const {
    requestRegisterTermMutation
  } = ControllerUpdateRegistration();
  const CreateRegisterTerm = (data: FormData) => {
    requestRegisterTermMutation.mutate({ data: data });
  };

  const schema = Yup.object().shape({
    dateTerm: Yup.string().required("Data de assinatura é obrigatório"),
    dateValid: Yup.string().required("Data de validade é obrigatório"),
    file: Yup.string().required("Arquivo com termo é obrigatório"),

   
  });

  return (
    <Dialog onHide={onHide} header="Novo termo" visible={visible} style={{ width: window.innerWidth > 800 ? "50vw" : "70vw" }}>
      <Formik
        initialValues={{ dateTerm: new Date(Date.now()), dateValid: "", file: undefined}}
        validationSchema={schema}
        onSubmit={(values) => {
          if (values.file) {

            const formData = new FormData();
             formData.append("dateTerm",values.dateTerm.toString() )
             formData.append("dateValid",values.dateValid?.toString() )
             formData.append("registration", id?.toString())
             formData.append("file", values.file[0])

            CreateRegisterTerm(formData);
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
                <div className="col-12 md:col-6">
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
                </div>
              </div>{" "}
              <Padding padding="16px" />
              <Column style={{ width: "100%" }}>
                <Row id="end">
                  <Button label="Adicionar" />
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
