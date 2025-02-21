import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useContext, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import avatar from "../../../Assets/images/avatar.svg";
import CalendarComponent from "../../../Components/Calendar";
import DropdownComponent from "../../../Components/Dropdown";
import Icon from "../../../Components/Icon";
import MaskInput from "../../../Components/InputMask";
import InputAddress from "../../../Components/InputsAddress";
import Loading from "../../../Components/Loading";
import TextInput from "../../../Components/TextInput";
import BeneficiariesEditProvider, {
  BeneficiariesEditContext,
} from "../../../Context/Beneficiaries/BeneficiaresEdit/context";
import { BeneficiariesEditType } from "../../../Context/Beneficiaries/BeneficiaresEdit/type";
import {
  color_race,
  formatarData,
  getErrorsAsArray,
  getStatus,
  isDateTerm,
  kinship,
  typesex
} from "../../../Controller/controllerGlobal";
import { validaCPF } from "../../../Controller/controllerValidCPF";
import styles from "../../../Styles";
import color from "../../../Styles/colors";
import { Container, Padding, Row } from "../../../Styles/styles";
import ModalAddTerm from "./ModalAddTerm";
import ModalCreateRegisterClassroom from "./ModalCreateRegisterClassroom";


const BeneficiariesEdit = () => {
  return (
    <BeneficiariesEditProvider>
      <BeneficiariesEditPage />
    </BeneficiariesEditProvider>
  );
};

export const Avatar = styled.div`
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
  const [visibleTerm, setVisibleTerm] = useState<any>();


  const schema = Yup.object().shape({

    name: Yup.string().required("Nome é obrigatório"),
    color_race: Yup.object().required("Raça/cor é obrigatório"),
    deficiency: Yup.object().required("Deficiência é obrigatória"),
    cpf: Yup.string().test("cpf-valid", "CPF inválido", (value) => {
      if (value && value.trim() !== "") {
        return validaCPF(value);
      }
      return true;
    }).required("CPF é obrigatório"),
    responsable_cpf: Yup.string().test("cpf-valid", "CPF inválido", (value) => {
      if (value && value.trim() !== "") {
        return validaCPF(value);
      }
      return true;
    }),
    responsable_telephone: Yup.string().required("Telefone é obrigatório"),
    birthday: Yup.string()
      .nullable()
      .required("Data de nascimento é obrigatória"),
    state: Yup.string().nullable().required("Estado é obrigatório"),
    city: Yup.string().nullable().required("Cidade é obrigatório"),
    sex: Yup.object().nullable().required("Sexo é obrigatória"),
  });


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

  const renderHeaderTerm = () => {
    return (
      <div
        className="flex justify-content-between"
        style={{ background: color.colorCard }}
      >
        <Button
          label={"Novo termo"}
          icon="pi pi-plus"
          type="button"
          onClick={() => setVisibleTerm(true)}
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
          validationSchema={schema}
          onSubmit={(values) => {
            props.handleUpdateRegistration(
              { ...values },
              props.registrations?.id!
            );
          }}
        >
          {({ values, handleChange, errors, touched, setFieldValue }) => {
            const errorArray = getErrorsAsArray(errors);
            return (
              <Form>
                <div>
                  <Row id="end">
                    <Button label="Salvar" type="submit" />
                  </Row>
                </div>
                <Padding padding="8px" />
                {errorArray.length > 0 && <div>
                  <h3>Erros encontrados no formulários</h3>
                  <Padding />
                  {errorArray.map((error, index) => (
                    <div key={index} style={{ color: 'red' }}>
                      {error}
                    </div>
                  ))}
                </div>}
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

                    {errors.name && touched.name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.name}
                      </div>
                    ) : null}
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

                    {errors.sex && touched.sex ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.sex}
                      </div>
                    ) : null}
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

                    {errors.birthday && touched.birthday ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.birthday}
                      </div>
                    ) : null}
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
                    {errors.color_race && touched.color_race ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.color_race}
                      </div>
                    ) : null}
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>CPF *</label>
                    <Padding />
                    <MaskInput
                      value={values.cpf}
                      mask="999.999.999-99"
                      placeholder="CPF *"
                      onChange={handleChange}
                      name="cpf"
                    />
                    {errors.cpf && touched.cpf ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.cpf}
                      </div>
                    ) : null}
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
                    {errors.responsable_telephone && touched.responsable_telephone ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_telephone}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-12 md:col-6">
                  <label>Data de matricula</label>
                  <Padding />
                  <CalendarComponent
                    value={values.date_registration}
                    name="date_registration"
                    dateFormat="dd/mm/yy"
                    onChange={handleChange}
                  />
                  {errors.date_registration && touched.date_registration ? (
                    <div style={{ color: "red", marginTop: "8px" }}>
                      {String(errors.date_registration)}
                    </div>
                  ) : null}
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
                    {errors.deficiency && touched.deficiency ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.deficiency.toString()}
                      </div>
                    ) : null}
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
                    {errors.responsable_name && touched.responsable_name ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_name.toString()}
                      </div>
                    ) : null}
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
                    {errors.responsable_cpf && touched.responsable_cpf ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.responsable_cpf.toString()}
                      </div>
                    ) : null}
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
                    {errors.kinship && touched.kinship ? (
                      <div style={{ color: "red", marginTop: "8px" }}>
                        {errors.kinship.toString()}
                      </div>
                    ) : null}
                  </div>

                </div>{" "}
                <Padding />
                <h3>Endereço</h3>
                <Padding padding="8px" />
                <InputAddress errors={errors} handleChange={handleChange} setFieldValue={setFieldValue} touched={touched} values={values} />
                <Padding padding="8px" />
                <h3>Termo</h3>
                <Padding padding="8px" />
                
                <DataTable
                  value={props.registrations?.register_term}
                  tableStyle={{ minWidth: "50rem" }}
                  header={renderHeaderTerm}
                >
                  <Column body={(row) => { return (<>{formatarData(row?.dateTerm!)}</>) }} header="Data de assinatura"></Column>
                  <Column body={(row) => { return (<>{formatarData(row?.dateValid ?? "")}</>) }} header="Data de validade"></Column>

                  <Column body={(row) => { return (<>{isDateTerm(row?.dateValid!) ? "Termo ativo" : "Termo vencido"}</>) }} header="Status"></Column>
                  <Column align={"center"} body={(row) => { return (<Row id="center" onClick={() => {window.open(row.blob_file.blob_url)}} style={{cursor: "pointer"}}><Icon icon="pi pi-download" /></Row>) }} header="Ações"></Column>

                </DataTable>
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
        <Column field="classroom.project.name" header="Plano de trabalho"></Column>
        <Column field="classroom.name" header="Turma"></Column>
        <Column body={StatusBody} header="Status"></Column>
        <Column header="Ações" body={ActionBeneficiariesBody}></Column>
      </DataTable>
      <ModalCreateRegisterClassroom
        onHide={() => setVisible(false)}
        visible={visible}
      />
      <ModalAddTerm
        onHide={() => setVisibleTerm(false)}
        visible={visibleTerm}
        id={props.registrations?.id!}
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
