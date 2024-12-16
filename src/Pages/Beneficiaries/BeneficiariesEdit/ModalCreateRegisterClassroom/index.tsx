import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import DropdownComponent from "../../../../Components/Dropdown";
import { BeneficiariesEditContext } from "../../../../Context/Beneficiaries/BeneficiaresEdit/context";
import { BeneficiariesEditType } from "../../../../Context/Beneficiaries/BeneficiaresEdit/type";
import { Column, Padding, Row } from "../../../../Styles/styles";

const ModalCreateRegisterClassroom = ({
  onHide,
  visible,
}: {
  onHide(): void;
  visible?: boolean | undefined;
}) => {
  const props = useContext(BeneficiariesEditContext) as BeneficiariesEditType;

  const { id } = useParams();



  return (
    <Dialog onHide={onHide} visible={visible} header="Adicionar a nova turma" style={{ width: window.innerWidth > 800 ? "30vw" : "50vw" }}>
      <Formik
        initialValues={{ classroom: "", registration: id, project: "" }}
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
                  <label>Projeto</label>
                  <Padding />
                  <DropdownComponent
                    value={props.project}
                    placerholder="Selecione o projeto"
                    name="deficiency"
                    onChange={(e) => props.setProject(e.target.value)}
                    options={props.projectRequet}
                    optionsLabel="name"
                    optionsValue="id"
                  />
                  {errors.project && touched.project ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.project}
                    </div>
                  ) : null}
                </div>

              </div>{" "}
              {props.classrooms ? (
                <div className="col-12">
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

export default ModalCreateRegisterClassroom;
