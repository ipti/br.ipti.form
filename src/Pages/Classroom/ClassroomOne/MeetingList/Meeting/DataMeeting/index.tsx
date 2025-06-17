import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { useContext, useState } from "react";
import DropdownComponent from "../../../../../../Components/Dropdown";
import TextAreaComponent from "../../../../../../Components/TextArea";
import TextInput from "../../../../../../Components/TextInput";
import { AplicationContext } from "../../../../../../Context/Aplication/context";
import { MeetingListRegistrationContext } from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/context";
import { MeetingListRegisterTypes } from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/type";
import { ROLE, Status } from "../../../../../../Controller/controllerGlobal";
import { Column, Padding, Row } from "../../../../../../Styles/styles";
import { PropsAplicationContext } from "../../../../../../Types/types";
import CalendarComponent from "../../../../../../Components/Calendar";

const DataMeeting = () => {
  const [edit, setEdit] = useState(false);

  const props = useContext(
    MeetingListRegistrationContext
  ) as MeetingListRegisterTypes;

  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const status = [
    { id: Status.APPROVED, name: "Aprovado" },
    { id: Status.REPROVED, name: "Pendente de Revisão" },
    { id: Status.PENDING, name: "Pedente de Análise" },
  ];

  const getStatus = (id: string) => {
    return status.find((props) => props.id === id);
  };

  return (
    <Formik
      initialValues={{
        name: props.meeting?.name,
        description: props.meeting?.description,
        justification: props.meeting?.justification,
        theme: props.meeting?.theme,
        status: getStatus(props.meeting?.status!),
        meeting_date: new Date(props.meeting?.meeting_date!)
      }}
      onSubmit={(values) => {
        props.UpdateMeeting(values, props.meeting?.id!);
        setEdit(!edit);
      }}
    >
      {({ values, errors, handleChange, touched }) => {
        return (
          <Form>
            <Row id="space-between">
              <Row>
                <Column id="center">
                  {edit ? (
                    <TextInput
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <Row>
                      <h2>{props.meeting?.name}</h2>
                    </Row>
                  )}
                </Column>
                <Padding />
                {!edit ? (
                  <Button
                    text
                    label="Editar"
                    icon="pi pi-pencil"
                    onClick={() => setEdit(true)}
                  />
                ) : null}
              </Row>
              {edit ? (
                <Row>
                  <Button label="Salvar" icon="pi pi-save" />
                  <Padding />
                  <Button
                    label="Cancelar"
                    severity="secondary"
                    type="button"
                    onClick={() => setEdit(false)}
                  />
                </Row>
              ) : null}
            </Row>
            <Padding padding="16px" />
            <div className="grid">
              <div className="col-12 md:col-6">
                <label>Tema</label>
                <TextInput
                  name="theme"
                  placeholder="Tema do encontro"
                  value={values.theme}
                  disabled={!edit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 md:col-6">
              <label>Data do encontro</label>
              <Padding />
              <CalendarComponent
                value={values.meeting_date}
                name="meeting_date"
                dateFormat="dd/mm/yy"
                disabled={!edit}
                onChange={handleChange}
              />
              {errors.meeting_date && touched.meeting_date ? (
                <div style={{ color: "red", marginTop: "8px" }}>
                  {String(errors.meeting_date)}
                </div>
              ) : null}
            </div>
            <Padding padding="16px" />
            {(propsAplication.user?.role === ROLE.ADMIN ||
              propsAplication.user?.role === ROLE.COORDINATORS) && (
                <>
                  <div className="grid">
                    <div className="col-12 md:col-6">
                      <label>Status</label>
                      <Padding />
                      <DropdownComponent
                        disabled={!edit}
                        value={values.status}
                        onChange={handleChange}
                        name="status"
                        placerholder="Status"
                        optionsLabel="name"
                        options={!props.ArchivesMeeting ? status.filter((i) => i.id !== Status.APPROVED) : status}

                      />
                    </div>
                    {values.status?.id === Status.REPROVED && <div className="col-12 md:col-6">
                      <label>Justificativa</label>
                      <Padding />
                      <TextAreaComponent
                        disabled={!edit}
                        onChange={handleChange}
                        value={values.justification}
                        name="justification"
                        placeholder="Justicativa sobre a escolha do status"
                      />
                    </div>}
                  </div>
                </>
              )}{" "}
            <div className="grid">
              <div className="col-12 md:col-6">
                <label>Observações</label>
                <Padding />
                <TextAreaComponent
                  disabled={!edit}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  placeholder="Observações sobre o encontro"
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default DataMeeting;
