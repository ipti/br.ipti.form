import { Button } from "primereact/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardClassroom from "../../../Components/Card/CardClassroom";
import ContentPage from "../../../Components/ContentPage";
import DropdownComponent from "../../../Components/Dropdown";
import Empty from "../../../Components/Empty";
import Loading from "../../../Components/Loading";
import { AplicationContext } from "../../../Context/Aplication/context";
import ClassroomProvider, {
  ClassroomContext,
} from "../../../Context/Classroom/context";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { ROLE } from "../../../Controller/controllerGlobal";
import { idProject } from "../../../Services/localstorage";
import { Column, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";

const ListClassroom = () => {
  return (
    <ClassroomProvider>
      <ListClassroomPage />
    </ClassroomProvider>
  );
};

const ListClassroomPage = () => {
  const history = useNavigate();
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const props = useContext(ClassroomContext) as ClassroomTypes;

  if (props.isLoading) return <Loading />;

  return (
    <ContentPage title="Turmas" description="Visualização das turmas.">
      <Padding padding="16px" />
      <Row id="space-between">
        <Column>
          <label>Projeto</label>
          <Padding />
          <div className="w-12rem md:w-16rem">
            <DropdownComponent placerholder="Escolha o projeto" options={props.tsOne?.project} optionsLabel="name" optionsValue="id" value={props.project} onChange={(e) => { console.log(e.value); props.setProject(e.value); idProject(e.value) }} />
          </div>
        </Column>
        {(propsAplication.user?.role === ROLE.ADMIN ||
          propsAplication.user?.role === ROLE.COORDINATORS) && (
            <Column id="end">
              <Button
                label="Criar turma"
                icon={"pi pi-plus"}
                onClick={() => history("/turma/criar/" + props.project)}
              />
            </Column>
          )}
      </Row>
      <Padding padding="32px" />
      {props?.classrooms?.length > 0 ? (
        <div className="grid">
          {props.classrooms?.map((item: any, index: number) => {
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
          })}
        </div>
      ) : (
        <Empty title="Turmas" />
      )}
    </ContentPage>
  );
};

export default ListClassroom;
