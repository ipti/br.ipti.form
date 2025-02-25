import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import DropdownComponent from "../../../../Components/Dropdown";
import { useFetchRequestTsLists } from "../../../../Services/Project/query";
import { Column, Padding, Row } from "../../../../Styles/styles";
import { ClassroomContext } from "../../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../../Context/Classroom/type";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const ModalChange = ({
  onHide,
  visible,
}: {
  onHide(): void;
  visible?: boolean | undefined;
}) => {
  const { id } = useParams();

  const props = useContext(ClassroomContext) as ClassroomTypes;

  const { data: tsOneRequest } = useFetchRequestTsLists(undefined);

  const schema = Yup.object().shape({
    idProject: Yup.string().nullable().required("Plano de trabalho é obrigatório"),
  });

  return (
    <Dialog
      onHide={onHide}
      visible={visible}
      header="Transferir turma"
      style={{ width: window.innerWidth < 800 ? "80vw" : "50vw" }}
    >
      <Formik
        initialValues={{
          idProject: "",
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          props.ChangeClassroom({
            idClassroom: id!,
            idProject: values.idProject,
          });
          onHide();
        }}
      >
        {({ values, handleChange, errors, touched }) => {
          return (
            <Form>
              <div className="grid">
                <div className="col-12 md:col-6">
                  <label>Escolha um Plano de trabalho</label>
                  <Padding />
                  <DropdownComponent
                    value={values.idProject}
                    options={tsOneRequest?.project}
                    placerholder="Digite um nome"
                    onChange={handleChange}
                    optionsValue="id"
                    name="idProject"
                  />
                  {errors.idProject && touched.idProject ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.idProject}
                    </div>
                  ) : null}
                </div>
              </div>{" "}
              <Padding padding="16px" />
              <Column style={{ width: "100%" }}>
                <Row id="end">
                  <Button label="Salvar" />
                </Row>
              </Column>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ModalChange;
