import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useContext, useState } from "react";
import DropdownComponent from "../../../Components/Dropdown";
import MaskInput from "../../../Components/InputMask";
import Loading from "../../../Components/Loading";
import TextInput from "../../../Components/TextInput";
import BeneficiariesEditProvider, {
  BeneficiariesEditContext,
} from "../../../Context/Beneficiaries/BeneficiaresEdit/context";
import { BeneficiariesEditType } from "../../../Context/Beneficiaries/BeneficiaresEdit/type";
import {
  color_race,
  getStatus,
  kinship,
  typesex,
} from "../../../Controller/controllerGlobal";
import color from "../../../Styles/colors";
import { Container, Padding, Row } from "../../../Styles/styles";
import ModalCreateRegisterClassroom from "./ModalCreateRegisterClassroom";
import styled from "styled-components";
import styles from "../../../Styles";
import avatar from "../../../Assets/images/avatar.svg"

const BeneficiariesEdit = () => {
  return (
    <BeneficiariesEditProvider>
      <BeneficiariesEditPage />
    </BeneficiariesEditProvider>
  );
};

const Avatar = styled.div`
  border: 1px solid ${styles.colors.colorBorderCard};
  height: 128px;
  width: 128px;
  border-radius: 50%;
  
  img {
    border-radius: 50%; /* This will make the image circular */
    height: 100%;
    width: 100%;
  }
`;

const BeneficiariesEditPage = () => {
  const props = useContext(BeneficiariesEditContext) as BeneficiariesEditType;
  const [visible, setVisible] = useState<any>();


  const [visibleDelete, setVisibleDelete] = useState<any>();

  if (props.isLoading) return <Loading />;

  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-between"
        style={{ background: color.colorCard }}
      >
        <Button
          label="Nova matricula"
          icon="pi pi-plus"
          onClick={() => setVisible(true)}
        />
      </div>
    );
  };

  const StatusBody = (rowData: any) => {
    return <div>{getStatus(rowData?.status)?.name}</div>;
  };

  const ActionBeneficiariesBody = (rowData: any) => {
    return (
      <Row id="center">
        {/* <Button rounded icon={"pi pi-pencil"} onClick={() => { history(`${rowData.id}`) }} /> */}
        <Button
          severity="danger"
          rounded
          icon={"pi pi-trash"}
          onClick={() => {
            setVisibleDelete(rowData);
          }}
        />
      </Row>
    );
  };

  return (
    <Container>
      <h1>Editar Beneficiario</h1>
      <Padding padding="16px" />
      {props.registrations ? (
        <Formik
          initialValues={props.initialValue}
          onSubmit={(values) => {
            props.handleUpdateRegistration(
              { ...values },
              props.registrations?.id!
            );
          }}
        >
          {({ values, handleChange }) => {
            return (
              <Form>
                <div>
                  <Row id="end">
                    <Button label="Salvar"  type="submit"/>
                  </Row>
                </div>
                <Padding padding="8px" />
                <Avatar>
                  <img alt="" src={props.file ? (URL.createObjectURL(props.file![0]) ?? undefined) : props.registrations?.avatar_url ? props.registrations?.avatar_url : avatar} />
                </Avatar>
                <Padding padding="8px" />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Avatar </label>
                    <Padding />
                    <TextInput
                      // value={props.file}
                      type="file"
                      placeholder="Avatar"
                      onChange={(e) => props.setFile(e.target.files)}
                      name="name"
                    />
                  </div>
                </div>
                <Padding padding="8px" />
                <h3>Dados basicos</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Name</label>
                    <Padding />
                    <TextInput
                      value={values.name}
                      placeholder="name"
                      onChange={handleChange}
                      name="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Sexo</label>
                    <Padding />
                    <DropdownComponent
                      value={values.sex}
                      optionsLabel="type"
                      options={typesex}
                      name="sex"
                      onChange={handleChange}
                    />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Data de Nascimento</label>
                    <Padding />
                    <MaskInput
                      value={values.birthday?.toString()}
                      mask="99/99/9999"
                      placeholder="Data de Nascimento"
                      name="birthday"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Cor de raça</label>
                    <Padding />
                    <DropdownComponent
                      value={values.color_race}
                      options={color_race}
                      name="color_race"
                      onChange={handleChange}
                    />{" "}
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>CPF</label>
                    <Padding />
                    <MaskInput
                      value={values.cpf}
                      mask="999.999.999-99"
                      placeholder="CPF"
                      onChange={handleChange}
                      name="cpf"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Telefone para contato </label>
                    <Padding />
                    <MaskInput
                      value={values.responsable_telephone}
                      mask="(99) 9 9999-9999"
                      name="responsable_telephone"
                      onChange={handleChange}
                      placeholder="name"
                    />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Deficiente</label>
                    <Padding />
                    <DropdownComponent
                      value={values.deficiency}
                      placerholder="Deficiente"
                      name="deficiency"
                      onChange={handleChange}
                      options={[
                        { id: true, name: "Sim" },
                        { id: false, name: "Não" },
                      ]}
                    />
                  </div>
                  {values.deficiency && (
                    <div className="col-12 md:col-6">
                      <label>Qual deficiência?</label>
                      <Padding />
                      <TextInput
                        value={values.deficiency_description}
                        name="deficiency_description"
                        onChange={handleChange}
                        placeholder="Qual deficiência ?"
                      />
                    </div>
                  )}
                </div>{" "}
                <Padding padding="8px" />
                <h3>Dados Responsavel</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Nome</label>
                    <Padding />
                    <TextInput
                      value={values.responsable_name}
                      name="responsable_name"
                      onChange={handleChange}
                      placeholder="Nome do Resposável"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>CPF Responsavel</label>
                    <Padding />
                    <MaskInput
                      value={values.responsable_cpf}
                      mask="999.999.999-99"
                      name="responsable_cpf"
                      placeholder="CPF do Responsável"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Parentesco</label>
                    <Padding />
                    <DropdownComponent
                      placerholder="Parantesco"
                      onChange={handleChange}
                      options={kinship}
                      name="kinship"
                      optionsValue="id"
                      optionsLabel="name"
                      value={values.kinship}
                    />
                  </div>

                </div>{" "}
                <Padding padding="8px" />
                <h3>Matriculas</h3>
                <Padding padding="8px" />
                {/* <h3>Endereço</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>CEP</label>
                    <Padding />
                    <TextInput
                      value={values.responsable_name}
                      placeholder="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Endereço</label>
                    <Padding />
                    <TextInput value={values.responsable_cpf} />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Complemento</label>
                    <Padding />
                    <TextInput value={values.responsable_cpf} />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Estado </label>
                    <Padding />
                    <TextInput
                      value={values.responsable_telephone}
                      placeholder="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Cidade </label>
                    <Padding />
                    <TextInput
                      value={values.responsable_telephone}
                      placeholder="name"
                    />
                  </div>
                </div>{" "} */}
              </Form>
            );
          }}
        </Formik>
      ) : null}
      <DataTable
        value={props.registrations?.register_classroom}
        tableStyle={{ minWidth: "50rem" }}
        header={renderHeader}
      >
        <Column field="classroom.project.name" header="Projeto"></Column>
        <Column field="classroom.name" header="Turma"></Column>
        <Column body={StatusBody} header="Status"></Column>
        <Column header="Ações" body={ActionBeneficiariesBody}></Column>
      </DataTable>
      <ModalCreateRegisterClassroom
        onHide={() => setVisible(false)}
        visible={visible}
      />
      <ConfirmDialog
        visible={visibleDelete}
        onHide={() => setVisibleDelete(false)}
        message="Tem certeza de que deseja prosseguir?"
        header="Confirmação"
        icon="pi pi-exclamation-triangle"
        accept={() => props.DeleteRegistration(visibleDelete.id)}
        reject={() => setVisibleDelete(false)}
      />
    </Container>
  );
};
export default BeneficiariesEdit;
