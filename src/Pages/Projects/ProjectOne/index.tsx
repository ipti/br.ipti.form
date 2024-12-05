import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import CardClassroom from "../../../Components/Card/CardClassroom";
import CardQuant from "../../../Components/Chart/CardQuant";
import ContentPage from "../../../Components/ContentPage";
import Empty from "../../../Components/Empty";
import InputNumberComponent from "../../../Components/InputNumber";
import Loading from "../../../Components/Loading";
import TextInput from "../../../Components/TextInput";
import { AplicationContext } from "../../../Context/Aplication/context";
import ClassroomProvider from "../../../Context/Classroom/context";
import ProjectOneProvider, {
  ProjectOneContext,
} from "../../../Context/Project/ProjectOne/context";
import { ProjectOneTypes } from "../../../Context/Project/ProjectOne/type";
import { ROLE } from "../../../Controller/controllerGlobal";
import { Column, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import { ConfirmDialog } from "primereact/confirmdialog";


const ProjectOne = () => {
  return (
    <ProjectOneProvider>
      <ClassroomProvider>
        <ProjectOnePage />
      </ClassroomProvider>
    </ProjectOneProvider>
  );
};

const ProjectOnePage = () => {
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;
  const [edit, setEdit] = useState(false);

  const [visible, setVisible] = useState(false)

  const { id } = useParams();

  const props = useContext(ProjectOneContext) as ProjectOneTypes;

  const initialValues = {
    name: props.project?.project.name,
    approval_percentage: props.project?.project?.approval_percentage,
    file: undefined,
  };

  if (props.isLoading) return <Loading />;
  const CreateProjectSchema = Yup.object().shape({
    name: Yup.string().required("Campo Obrigatório"),
    approval_percentage: Yup.number().required("Campo Obrigatório"),
  });

  return (
    <ContentPage title={props.project?.project.name!} description="Detalhes do seu projeto">
      {edit ? (
        <Formik
          initialValues={initialValues}
          validationSchema={CreateProjectSchema}
          onSubmit={(values) => {
            props.updateProject(
              {
                approval_percentage: values.approval_percentage!,
                name: values.name!,
              },
              parseInt(id!)
            );
            if (values.file) props.rulerProject(values.file, parseInt(id!));
            setEdit(!edit);
          }}
        >
          {({ values, errors, handleChange, touched, setFieldValue }) => {
            return (
              <Form>
                <Row id="end">
                  <Button label="Salvar" />
                  <Padding />
                  <Button
                    label="Cancelar"
                    severity="secondary"
                    type="button"
                    onClick={() => setEdit(false)}
                  />
                </Row>
                <Padding padding="32px" />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Nome do projeto *</label>
                    <Padding />
                    <TextInput
                      name="name"
                      onChange={handleChange}
                      placeholder="Nome do Projeto*"
                      value={values.name}
                    />
                    <Padding />
                    {errors.name && touched.name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.name}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Parâmetro para aprovação do projeto *</label>
                    <Padding />
                    <InputNumberComponent
                      name="approval_percentage"
                      onChange={handleChange}
                      suffix="%"
                      placeholder="Parâmetro para aprovação do projeto *"
                      value={values.approval_percentage}
                    />
                    <Padding />
                    {errors.approval_percentage &&
                      touched.approval_percentage ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.approval_percentage}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Adicionar ou mudar Régua do projeto</label>
                    <Padding />
                    <label>* Imagem para adicionar aos relatórios</label>
                    <Padding />
                    <TextInput
                      onChange={(e) => setFieldValue("file", e.target?.files![0])}
                      name="file"
                      placeholder="Régua do projeto*"
                      type="file"
                    />
                    <Padding />
                    {errors.file && touched.file ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.file}
                      </div>
                    ) : null}
                  </div>
                </div>
                <Padding padding="16px" />
              </Form>
            );
          }}
        </Formik>
      ) : (
        <Column>
          <Row id="end">
            <Row id="end">
              {propsAplication.user?.role ===
                (ROLE.ADMIN || ROLE.COORDINATORS) && (
                  <Button
                    text
                    label="Editar"
                    icon="pi pi-pencil"
                    onClick={() => setEdit(true)}
                  />
                )}
              <Padding />
              {propsAplication.user?.role ===
                (ROLE.ADMIN || ROLE.COORDINATORS) && (
                  <Button
                    text
                    severity="danger"
                    label="Excluir"
                    icon="pi pi-trash"
                    onClick={() => setVisible(true)}
                  />
                )}
            </Row>
          </Row>
          {props.project?.project.ruler_url && <div>
            <Padding />
            <h4>Régua de marca do projeto</h4>
            <Padding />
            <Column>
              <label>* Imagem para adicionar aos relatórios</label>
              <Padding />
              <img alt="" src={props.project?.project.ruler_url} />
            </Column>
          </div>}
        </Column>
      )}
      <Padding padding="16px" />
      <div className="grid">
        <div className="col-12 md:col-6">
          <CardQuant
            quant={props.project?.project.approval_percentage + "%"}
            title="Parâmetro para aprovação do projeto"
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-6">
          <CardQuant
            quant={props.project?.project.classrooms.length!}
            title="Total de Turmas"
            color="blue"
          />
        </div>
        <div className="col-12 md:col-6">
          <CardQuant
            quant={props.project?.register_count!}
            title="Total de Matriculas"
            color="orange"
          />
        </div>
      </div>
      <Padding padding="16px" />
      <h3>Turmas</h3>
      <Padding padding="16px" />

      {props?.project?.project.classrooms?.length! > 0 ? (
        <div className="grid">
          {props.project?.project.classrooms?.map(
            (item: any, index: number) => {
              return (
                <div className="col-12 md:col-6 lg:col-4">
                  <CardClassroom
                    title={item.name}
                    meetingCount={item._count.meeting}
                    registrationCount={item._count.register_classroom}
                    id={item.id}
                    status={item.status}
                  />
                </div>
              );
            }
          )}
        </div>
      ) : (
        <Empty title="Turmas" />
      )}
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Tem certeza de que deseja prosseguir?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => props.deleteProject(props.project?.project?.id!)}
        reject={() => setVisible(false)}
      />
    </ContentPage>
  );
};

export default ProjectOne;
