import { Button } from "primereact/button";
import { useContext, useState } from "react";

import { TabMenu } from "primereact/tabmenu";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import Config from "./Config";
import Response from "./Response";
import CreateOrEditFormProvider, { CreateOrEditFormContext } from "../../../Context/Form/CreateOrEditForm/context";
import { CreateOrEditFormTypes } from "../../../Types/types";
import { Container, Padding, Row } from "../../../Styles/styles";

const CreateOrEditForm = () => {
  return (
    <CreateOrEditFormProvider>
      <CreateOrEditForms />
    </CreateOrEditFormProvider>
  );
};

const CreateOrEditForms = () => {
  const [tabMenu, setTabMenu] = useState(0);

  const { form } = useContext(CreateOrEditFormContext) as CreateOrEditFormTypes;
  const history = useNavigate();

  const items = [
    {
      label: "Perguntas",
      icon: "pi pi-question-circle",
      command: () => {
        setTabMenu(0);
      },
    },
    {
      label: "Respostas",
      icon: "pi pi-comment",
      command: () => {
        setTabMenu(1);
      },
    },
    {
      label: "Configurações",
      icon: "pi pi-cog",
      command: () => {
        setTabMenu(2);
      },
    },
  ];

  return (
    <Container>
      {form ? (
        <Row id="end" style={{ gap: "4px" }}>
          <Button
            label="Preview"
            icon="pi pi-eye"
            onClick={() => history(`/view/${form.id}`)}
          />{" "}
          <Button
            label="Salvar"
            icon="pi pi-save"
            onClick={() => history("/view")}
          />{" "}
        </Row>
      ) : null}
      <Padding />
      <div className="card">
        <TabMenu model={items} />
      </div>
      {tabMenu === 0 ? (
        <Form />
      ) : tabMenu === 2 ? (
        <Config />
      ) : tabMenu === 1 ? (
        <Response />
      ) : null}
    </Container>
  );
};

export default CreateOrEditForm;
