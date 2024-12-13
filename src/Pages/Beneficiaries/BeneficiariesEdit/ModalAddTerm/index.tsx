import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CalendarComponent from "../../../../Components/Calendar";
import { BeneficiariesEditContext } from "../../../../Context/Beneficiaries/BeneficiaresEdit/context";
import { BeneficiariesEditType } from "../../../../Context/Beneficiaries/BeneficiaresEdit/type";
import { Column, Padding, Row } from "../../../../Styles/styles";

const ModalAddTerm = ({
  onHide,
  visible,
}: {
  onHide(): void;
  visible?: boolean | undefined;
}) => {
  const props = useContext(BeneficiariesEditContext) as BeneficiariesEditType;

  const { id } = useParams();



  return (
    <Dialog onHide={onHide}  header="Novo termo" visible={visible} style={{ width: window.innerWidth > 800 ? "30vw" : "50vw" }}>
      <Formik
        initialValues={{ classroom: "", registration: id, dateTerm: new Date(Date.now()) }}
        onSubmit={(values) => {
          props.CreateRegisterClassroom({
            classroom: parseInt(values.classroom),
            registration: parseInt(values.registration!),
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
