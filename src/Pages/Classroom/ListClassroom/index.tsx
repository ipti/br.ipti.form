import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import CardClassroom from "../../../Components/Card/CardClassroom";
import { Container, Padding, Row } from "../../../Styles/styles";
import ClassroomProvider, {
  ClassroomContext,
} from "../../../Context/Classroom/context";
import { useContext } from "react";
import { ClassroomTypes } from "../../../Context/Classroom/type";
import { AplicationContext } from "../../../Context/Aplication/context";
import { PropsAplicationContext } from "../../../Types/types";
import { ROLE } from "../../../Controller/controllerGlobal";
import Empty from "../../../Components/Empty";

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

  return (
    <Container>
      {(propsAplication.user?.role === ROLE.ADMIN ||
        propsAplication.user?.role === ROLE.COORDINATORS) && (
        <Row id="end" style={{width: "100%"}}>
          <Button
            label="Criar turma"
            icon={"pi pi-plus"}
            onClick={() => history("/turma/criar")}
          />
        </Row>
      )}
      <Padding padding="16px" />
      {props?.classrooms?.length > 0 ? <div className="grid">
        {props.classrooms?.map((item: any, index: number) => {
          return (
            <div className="col-12 md:col-6 lg:col-4">
              <CardClassroom
                title={item.name}
                year={item.year.toString()}
                id={item.id}
              />
            </div>
          );
        })}
      </div> : <Empty title="Turmas" />}
    </Container>
  );
};

export default ListClassroom;
