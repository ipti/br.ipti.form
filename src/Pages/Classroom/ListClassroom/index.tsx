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
import { Column, Padding } from "../../../Styles/styles";
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
    <ContentPage
      title="Turmas"
      description="Visualização das turmas."
      permissionButton={
        propsAplication.user?.role === ROLE.ADMIN ||
        propsAplication.user?.role === ROLE.COORDINATORS
      }
      addButton
      onClick={() => history("/turma/criar/" + props.project)}
    >
      <Column>
        <label>Plano de trabalho</label>
        <Padding />
        <div className="w-12rem md:w-16rem">
          <DropdownComponent
            placerholder="Escolha o plano de trabalho"
            options={props.tsOne?.project}
            optionsLabel="name"
            optionsValue="id"
            value={props.project}
            onChange={(e) => {
              console.log(e.value);
              props.setProject(e.value);
              idProject(e.value);
            }}
          />
        </div>
      </Column>

      <Padding padding="8px" />
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
