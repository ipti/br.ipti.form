import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import DropdownComponent from "../../../../Components/Dropdown";
import { useFetchRequestTsListsYear } from "../../../../Services/Project/query";
import { Column, Padding, Row } from "../../../../Styles/styles";
import { ClassroomContext } from "../../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../../Context/Classroom/type";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { AplicationContext } from "../../../../Context/Aplication/context";
import { PropsAplicationContext } from "../../../../Types/types";
import { controllerYears } from "../../../../Controller/controllerYears";

const ModalChange = ({
  onHide,
  visible,
}: {
  onHide(): void;
  visible?: boolean | undefined;
}) => {
  const { id } = useParams();

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [tsSelected, setTsSelected] = useState<number | undefined>(undefined);

  const props = useContext(ClassroomContext) as ClassroomTypes;
  const propsAplication = useContext(AplicationContext) as PropsAplicationContext;
  const { yearsOptions } = controllerYears();

  const { data: tsOneRequest } = useFetchRequestTsListsYear(tsSelected, year);

  const schema = Yup.object().shape({
    year: Yup.string().nullable().required("Ano é obrigatório"),
    idTs: Yup.string().nullable().required("TS é obrigatória"),
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
          year: year,
          idTs: "",
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
        {({ values, errors, touched, setFieldValue }) => {
          return (
            <Form>
              <div className="grid">
                <div className="col-12 md:col-6">
                  <label>Ano</label>
                  <Padding />
                  <DropdownComponent
                    value={values.year}
                    options={yearsOptions}
                    placerholder="Ano"
                    onChange={(e) => {
                      setFieldValue("year", e.target.value);
                      setYear(e.target.value);
                      setFieldValue("idTs", "");
                      setFieldValue("idProject", "");
                    }}
                    optionsValue="value"
                    optionsLabel="value"
                    name="year"
                  />
                  {errors.year && touched.year ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.year}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 md:col-6">
                  <label>Escolha uma TS</label>
                  <Padding />
                  <DropdownComponent
                    value={values.idTs}
                    options={propsAplication.project}
                    placerholder="Selecione uma TS"
                    onChange={(e: any) => {
                      setTsSelected(e.target.value ? Number(e.target.value) : undefined);
                      setFieldValue("idTs", e.target.value);
                      setFieldValue("idProject", "");
                    }}
                    optionsValue="id"
                    optionsLabel="name"
                    name="idTs"
                  />
                  {errors.idTs && touched.idTs ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.idTs}
                    </div>
                  ) : null}
                </div>
                <div className="col-12 md:col-6">
                  <label>Escolha um Plano de trabalho</label>
                  <Padding />
                  <DropdownComponent
                    value={values.idProject}
                    options={tsOneRequest?.project}
                    placerholder="Digite um nome"
                    onChange={(e) => setFieldValue("idProject", e.target.value)}
                    optionsValue="id"
                    optionsLabel="name"
                    name="idProject"
                    disabled={!values.idTs}
                  />
                  {errors.idProject && touched.idProject ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {errors.idProject}
                    </div>
                  ) : null}
                </div>
              </div>
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
