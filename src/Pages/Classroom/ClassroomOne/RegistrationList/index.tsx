import { InputText } from "primereact/inputtext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import CardRegistration from "../../../../Components/Card/CardRegistration";
import ContentPage from "../../../../Components/ContentPage";
import Empty from "../../../../Components/Empty";
import Loading from "../../../../Components/Loading";
import RegistartionClassroomProvider, {
  RegistrationClassroomContext,
} from "../../../../Context/Classroom/RegistrationsList/context";
import { RegistrationClassroomTypes } from "../../../../Context/Classroom/RegistrationsList/type";
import { useFetchRequestClassroomOne } from "../../../../Services/Classroom/query";
import { Padding, Row } from "../../../../Styles/styles";

const RegistrationList = () => {
  return (
    <RegistartionClassroomProvider>
      <RegistrationListPage />
    </RegistartionClassroomProvider>
  );
};

const RegistrationListPage = () => {
  const props = useContext(
    RegistrationClassroomContext
  ) as RegistrationClassroomTypes;
  const { id } = useParams();
  const { data: classroom } = useFetchRequestClassroomOne(parseInt(id!));
  const [filter, setFilter] = useState("");
  if (props.isLoading) return <Loading />;

  const search = () => {
    if (filter !== "") {
      const buscaLowerCase = filter.toLowerCase();
      return props.registrations?.filter((props) =>
        props.registration.name.toLowerCase().includes(buscaLowerCase)
      );
    }
    return props.registrations;
  };


  console.log(props.registrations)
  return (
    <ContentPage title={classroom?.name} description="Visualização das matriculas realizadas na turma.">
      <Row id="space-between">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Pesquise pelo nome"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            value={filter}
          />
        </span>
      </Row>
      <Padding padding="16px" />
      {props?.registrations?.length! > 0 ? (
        <div className="grid">
          {search()?.map((item, index) => {
            return (
              <div className="col-12 md:col-6 lg:col-4" key={index}>
                <CardRegistration
                  title={item.registration.id.toString()}
                  subtitle={item.registration.name}
                  idRegistration={item.id}
                  status={item.status}
                  avatar_url={item.registration.avatar_url}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <Empty title="Matriculas" />
      )}
    </ContentPage>
  );
};

export default RegistrationList;
