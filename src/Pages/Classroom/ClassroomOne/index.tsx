import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import pessoas from "../../../Assets/images/pessoasgray.svg";

import report from "../../../Assets/images/report-svgrepo-com.svg";
import meeting from "../../../Assets/images/school_teacher.svg";
import TextInput from "../../../Components/TextInput";

import ContentPage from "../../../Components/ContentPage";
import Loading from "../../../Components/Loading";
import { AplicationContext } from "../../../Context/Aplication/context";
import ClassroomProvider, {
  ClassroomContext,
} from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { ROLE } from "../../../Controller/controllerGlobal";
import { useFetchRequestClassroomOne } from "../../../Services/Classroom/query";
import { Column, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import CardItensClassrooom from "./CardItensClassroom";
import ModalChange from "./ModalChangeClaassroom";

const ClassroomOne = () => {
  return (
    <ClassroomProvider>
      <ClassroomOnePage />
    </ClassroomProvider>
  );
};

const ClassroomOnePage = () => {
  const history = useNavigate();
  const { id } = useParams();
  const props = useContext(ClassroomContext) as ClassroomTypes;
  const { data: classroom } = useFetchRequestClassroomOne(parseInt(id!));
  const [edit, setEdit] = useState(false);
  const [visible, setVisible] = useState(false);

  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (props.isLoading) return <Loading />;

  return (
    <ContentPage title={classroom?.name} description="Detalhes da sua turma.">
      {edit ? (
        <>
          {classroom ? (
            <Formik
              initialValues={{ name: classroom?.name }}
              onSubmit={(values) => {
                props.UpdateClassroom(values, parseInt(id!));
                setEdit(false);
              }}
            >
              {({ values, handleChange }) => {
                return (
                  <Form>
                    <Row>
                      <TextInput
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                      />
                      <Padding />
                      <Button label="Salvar" icon={"pi pi-save"} />
                      <Padding />
                      <Button
                        label="Cancelar"
                        severity="secondary"
                        type="button"
                        onClick={() => setEdit(false)}
                      />
                    </Row>
                  </Form>
                );
              }}
            </Formik>
          ) : null}
        </>
      ) : (
        <Column>
          <Row id="end">
            <Row>
              <Padding />
              {propsAplication.user?.role ===
                (ROLE.ADMIN || ROLE.COORDINATORS) && (
                <Button
                  text
                  label="Editar"
                  icon="pi pi-pencil"
                  onClick={() => setEdit(true)}
                />
              )}
            </Row>
            {propsAplication.user?.role ===
              (ROLE.ADMIN || ROLE.COORDINATORS) && (
              <Button
                text
                label="Tranferir turma"
                icon="pi pi-sync"
                onClick={() => setVisible(true)}
              />
            )}
          </Row>
        </Column>
      )}
      <Padding padding="16px" />
      <div className="grid">
        <div
          className="col-12 md:col-6"
          onClick={() => history(`/turma/${id}/alunos`)}
        >
          <CardItensClassrooom
            title="Matriculas"
            description="Acesse para gerenciar seus alunos"
            icon={pessoas}
            count={classroom?.register_classroom?.length}
          />
        </div>
        <div
          className="col-12 md:col-6"
          onClick={() => history(`/turma/${id}/encontros`)}
        >
          <CardItensClassrooom
            title="Encontros"
            description="Acesse para Gerenciar seus encontros"
            icon={meeting}
            count={classroom?.meeting?.length}
          />
        </div>
        {/* <div className="col-12 md:col-6" onClick={() => history(`/turma/${id}/relatorio`)}>
                    <CardItensClassrooom title="Tabela" description="Relatório entre Alunos e Encontros" icon="pi pi-table" />
                </div> */}
        <ModalChange visible={visible} onHide={() => setVisible(false)} />
      </div>
      <div className="grid">
        <div
          className="col-12 md:col-6"
          onClick={() => history(`/turma/${id}/relatorio`)}
        >
          <CardItensClassrooom
            title="Relatório"
            description="Acesse o relatório da turma"
            icon={report}
            // count={classroom?.register_classroom?.length}
          />
        </div>
      </div>
    </ContentPage>
  );
};

export default ClassroomOne;
