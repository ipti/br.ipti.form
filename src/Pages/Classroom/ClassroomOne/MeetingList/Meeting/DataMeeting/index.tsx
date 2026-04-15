import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Editor } from "primereact/editor";
import { MultiSelect } from "primereact/multiselect";
import { useContext, useState } from "react";
import { Popover } from "react-tiny-popover";
import CalendarComponent from "../../../../../../Components/Calendar";
import DropdownComponent from "../../../../../../Components/Dropdown";
import TextAreaComponent from "../../../../../../Components/TextArea";
import TextInput from "../../../../../../Components/TextInput";
import { AplicationContext } from "../../../../../../Context/Aplication/context";
import { MeetingListRegistrationContext } from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/context";
import { MeetingListRegisterTypes } from "../../../../../../Context/Classroom/Meeting/MeetingListRegistration/type";
import { ROLE, Status } from "../../../../../../Controller/controllerGlobal";
import { useFetchRequestUsers } from "../../../../../../Services/Users/query";
import { Column, Padding, Row } from "../../../../../../Styles/styles";
import { PropsAplicationContext } from "../../../../../../Types/types";
import TimeInput from "../../../../../../Components/TimeInput";

const sanitizeMeetingDescription = (content: string | null | undefined) => {
  if (!content) {
    return "";
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div>${content}</div>`, "text/html");
  const container = doc.body.firstElementChild;

  if (!container) {
    return "";
  }

  container
    .querySelectorAll("script, style, iframe, object, embed, link, meta")
    .forEach((node) => node.remove());

  container.querySelectorAll("*").forEach((element) => {
    Array.from(element.attributes).forEach((attribute) => {
      const attributeName = attribute.name.toLowerCase();
      const attributeValue = attribute.value.toLowerCase();

      if (attributeName.startsWith("on")) {
        element.removeAttribute(attribute.name);
      }

      if (
        (attributeName === "href" || attributeName === "src") &&
        /^\s*javascript\s*:/i.test(attributeValue)
      ) {
        element.removeAttribute(attribute.name);
      }
    });
  });

  return container.innerHTML;
};

const normalizeMeetingDescriptionForEditor = (
  content: string | null | undefined
) => {
  if (!content) {
    return "";
  }

  const normalized = String(content);
  const hasHtmlTag = /<\/?[a-z][\s\S]*>/i.test(normalized);

  if (hasHtmlTag) {
    return normalized;
  }

  const escaped = normalized
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<p>${escaped.replace(/\n/g, "<br/>")}</p>`;
};

const DataMeeting = () => {

  const { data: userRequest } = useFetchRequestUsers(undefined);

  const [edit, setEdit] = useState(false);
  const [statusInfoOpen, setStatusInfoOpen] = useState(false);
  const [obsInfoOpen, setObsInfoOpen] = useState(false);

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

  const date = new Date(new Date(props.meeting?.meeting_date!).setDate(new Date(props.meeting?.meeting_date!).getDate() + 1))

  if (!props.meeting) {
    return <div>Carregando...</div>
  }

  const tooltipStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#e5e7eb",
    color: "#6b7280",
    fontSize: "11px",
    fontWeight: "bold",
    cursor: "pointer",
    userSelect: "none",
    marginLeft: "6px",
  };

  const popoverBoxStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "12px 16px",
    maxWidth: "280px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#374151",
    lineHeight: "1.6",
  };

  const editorHeader = (
    <span className="ql-formats">
      <button className="ql-bold" aria-label="Negrito" />
      <button className="ql-italic" aria-label="Itálico" />
      <button className="ql-underline" aria-label="Sublinhado" />
      <button className="ql-strike" aria-label="Tachado" />
      <button className="ql-list" value="ordered" aria-label="Lista ordenada" />
      <button className="ql-list" value="bullet" aria-label="Lista não ordenada" />
      <button className="ql-link" aria-label="Link" />
      <button className="ql-clean" aria-label="Limpar formatação" />
    </span>
  );

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: props.meeting?.name,
        description: normalizeMeetingDescriptionForEditor(
          props.meeting?.description
        ),
        justification: props.meeting?.justification,
        theme: props.meeting?.theme,
        status: getStatus(props.meeting?.status!),
        meeting_date: date,
        users: props.meeting?.meeting_user.map((item) => item.users) ?? [],
        workload: props.meeting?.workload ?? 0,
      }}
      onSubmit={(values) => {
        props.UpdateMeetingUser({ id: props.meeting?.id!, users: values.users.map((item) => item.id) });
        var body: any = values
        delete body.users
        props.UpdateMeeting({
          ...body,
          meeting_date: (props.meeting?.meeting_date && values.meeting_date && date.getTime() === values.meeting_date.getTime())
            ? new Date(new Date(values?.meeting_date!).setDate(new Date(values?.meeting_date!).getDate() - 1))
            : values.meeting_date
        }, props.meeting?.id!);
        setEdit(!edit);
      }}
    >
      {({ values, errors, handleChange, touched, setFieldValue }) => {

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
                <Padding />
                <TextInput
                  name="theme"
                  placeholder="Tema do encontro"
                  value={values.theme}
                  disabled={!edit}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 md:col-4">
                <label>Carga Horária (horas)</label>
                <Padding />
                <TimeInput
                  placeholder="Carga Horária"
                  value={values.workload}
                  name="workload"
                  onChange={(e: any) => setFieldValue("workload", e.target.value)}
                  disabled={!edit}
                />
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
            </div>
            <Padding padding="16px" />
            {(propsAplication.user?.role === ROLE.ADMIN ||
              propsAplication.user?.role === ROLE.COORDINATORS) && (
                <>
                  <div className="grid">
                    <div className="col-12 md:col-6">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Status</label>
                        <Popover
                          isOpen={statusInfoOpen}
                          positions={["top", "right", "bottom"]}
                          onClickOutside={() => setStatusInfoOpen(false)}
                          content={
                            <div style={popoverBoxStyle}>
                              <strong>Como aplicar cada status:</strong>
                              <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                                <li><strong>Pendente de Análise:</strong> o encontro ainda aguarda revisão inicial.</li>
                                <li><strong>Pendente de Revisão:</strong> o encontro foi analisado mas precisa de correções.</li>
                                <li><strong>Aprovado:</strong> disponível somente quando há arquivos anexados; indica que o encontro está validado.</li>
                              </ul>
                            </div>
                          }
                        >
                          <span style={tooltipStyle} onClick={() => setStatusInfoOpen(!statusInfoOpen)}>?</span>
                        </Popover>
                      </div>
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
                  </div>
                </>
              )}{" "}
            <div className="grid">
              <div className="col-12 md:col-6">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label>Observações</label>
                  <Popover
                    isOpen={obsInfoOpen}
                    positions={["top", "right", "bottom"]}
                    onClickOutside={() => setObsInfoOpen(false)}
                    content={
                      <div style={popoverBoxStyle}>
                        <strong>O que colocar nas observações:</strong>
                        <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                          <li>Informações relevantes sobre a dinâmica do encontro.</li>
                          <li>Dificuldades ou imprevistos ocorridos.</li>
                          <li>Comentários sobre a participação dos beneficiários.</li>
                          <li>Qualquer observação que complemente o registro do encontro.</li>
                        </ul>
                      </div>
                    }
                  >
                    <span style={tooltipStyle} onClick={() => setObsInfoOpen(!obsInfoOpen)}>?</span>
                  </Popover>
                </div>
                <Padding />
                {edit ? (
                  <Editor
                    value={values.description || ""}
                    onTextChange={(event) =>
                      setFieldValue("description", event.htmlValue || "")
                    }
                    headerTemplate={editorHeader}
                    style={{ height: "240px" }}
                  />
                ) : (
                  <div
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      padding: "12px",
                      minHeight: "120px",
                      backgroundColor: "#f9fafb",
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        sanitizeMeetingDescription(values.description) ||
                        "<p>Sem observações.</p>",
                    }}
                  />
                )}
              </div>
            </div>

            {!edit ? <div className="col-12 md:col-6">
              <label>Responsáveis pelo encontro</label>
              <Padding />
              <div className="flex flex-wrap gap-2">
                {props.meeting?.meeting_user.map((item) => {
                  return <Chip label={item.users.name} />;
                })}
              </div>
            </div>
              : <div className="col-12 md:col-6">
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
              </div>}
          </Form>
        );
      }}
    </Formik>
  );
};

export default DataMeeting;
