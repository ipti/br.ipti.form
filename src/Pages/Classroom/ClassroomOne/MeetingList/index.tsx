import { Button } from "primereact/button";
import CardMeeting from "../../../../Components/Card/CardMeeting";
import { Container, Padding } from "../../../../Styles/styles";
import { useNavigate, useParams } from "react-router-dom";
import MeetingListProvider, {
  MeetingListContext,
} from "../../../../Context/Classroom/Meeting/MeetingList/context";
import { useContext } from "react";
import { MeetingListTypes } from "../../../../Context/Classroom/Meeting/MeetingList/type";
import { useFetchRequestClassroomOne } from "../../../../Services/Classroom/query";
import Empty from "../../../../Components/Empty";
import Loading from "../../../../Components/Loading";
import ProjectListProvider from "../../../../Context/Project/ProjectList/context";

const MeetingList = () => {
  return (
    <MeetingListProvider>
      <ProjectListProvider>
        <MeetingListPage />
      </ProjectListProvider>
    </MeetingListProvider>
  );
};

const MeetingListPage = () => {
  const props = useContext(MeetingListContext) as MeetingListTypes;

  const { id } = useParams();

  const { data: classroom, isLoading } = useFetchRequestClassroomOne(
    parseInt(id!)
  );

  const history = useNavigate();

  if (props.isLoading && isLoading) return <Loading />;
  return (
    <Container>
      <h2>Encontros {classroom?.name}</h2>
      <Padding padding="16px" />
      <Button
        label="Criar encontro"
        onClick={() => history(`/turma/${id}/encontros/criar`)}
      />
      <Padding padding="16px" />
      {props?.meetings?.length! > 0 ? (
        <div className="grid">
          {props.meetings?.map((item, index) => {
            return (
              <div className="col-12 md:col-6 lg:col-4" key={index}>
                <CardMeeting
                  title={item.name}
                  data={item.meeting_date}
                  status={item.status}
                  idMeeting={item.id}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Empty title="Encontros" />
      )}
    </Container>
  );
};

export default MeetingList;
