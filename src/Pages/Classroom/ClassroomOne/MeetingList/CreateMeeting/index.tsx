import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import CalendarComponent from "../../../../../Components/Calendar";
import TextInput from "../../../../../Components/TextInput";
import CreateMeetingProvider, {
  CreateMeetingContext,
} from "../../../../../Context/Classroom/Meeting/Create/context";
import { CreateMeetingType } from "../../../../../Context/Classroom/Meeting/Create/type";
import { useFetchRequestUsers } from "../../../../../Services/Users/query";
import { Container, Padding, Row } from "../../../../../Styles/styles";

const CreateMeeting = () => {
  return (
    <CreateMeetingProvider>
      <CreateMeetingPage />
    </CreateMeetingProvider>
  );
};

const CreateMeetingPage = () => {
  const props = useContext(CreateMeetingContext) as CreateMeetingType;

  const { data: userRequest } = useFetchRequestUsers();

  const { id } = useParams();


  return (
    <Container>
      <h2>Criar Encontro</h2>
      <Padding padding="16px" />
      <Formik
        initialValues={{ name: "", users: [], meeting_date: undefined, theme: "" }}
        onSubmit={(values) => {
          props.CreateMeeting({ ...values, classroom: parseInt(id!) });
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <div className="card">
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Nome</label>
                    <Padding />
                    <TextInput
                      placeholder="Nome"
                      value={values.name}
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Tema</label>
                    <Padding />
                    <TextInput
                      placeholder="Tema"
                      value={values.theme}
                      name="theme"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Data do encontro</label>
                    <Padding />
                    <CalendarComponent
                      placeholder="Data do encontro *"
                      name="meeting_date"
                      dateFormat="dd/mm/yy"
                      value={values.meeting_date}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Responsavel</label>
                    <Padding />
                    <MultiSelect
                      optionLabel="name"
                      onChange={handleChange}
                      filter
                      maxSelectedLabels={3}
                      className="w-full"
                      name="users"
                      placeholder="Responsável"
                      value={values.users}
                      options={userRequest}
                    />
                  </div>
                </div>
                <Padding padding="16px" />
                <Row id="end">
                  <Button label="Salvar" onClick={() => {}} />
                </Row>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default CreateMeeting;
