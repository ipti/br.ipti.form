import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import CalendarComponent from "../../../../Components/Calendar";
import { ControllerUpdateRegistration } from "../../../../Services/PreRegistration/controller";
import { CreateRegistrationTermType } from "../../../../Services/PreRegistration/types";
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
   const CreateRegisterTerm = (data: CreateRegistrationTermType) => {
      requestRegisterTermMutation.mutate({data: data});
    };


  return (
    <Dialog onHide={onHide}  header="Novo termo" visible={visible} style={{ width: window.innerWidth > 800 ? "30vw" : "50vw" }}>
      <Formik
        initialValues={{  dateTerm: new Date(Date.now()) }}
        onSubmit={(values) => {
          CreateRegisterTerm({
            data_term: values.dateTerm,
            registration: id!,
          });
          onHide();
        }}
      >
        {({ values, handleChange, errors, touched }) => {
          return (
            <Form>
              <div className="grid">
                <div className="col-12">
                  <label>Data de assinatura</label>
                  <Padding />
                  <CalendarComponent
                    value={values.dateTerm}
                    name="dateTerm"
                    dateFormat="dd/mm/yy"
                    onChange={handleChange}
                  />
                  {/* {errors.dateTerm && touched.dateTerm ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.dateTerm.toString()}
                    </div>
                  ) : null} */}
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
