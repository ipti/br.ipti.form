import { Form, Formik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../../../../../Assets/images/avatar.svg";
import ContentPage from "../../../../../Components/ContentPage";
import DropdownComponent from "../../../../../Components/Dropdown";
import MaskInput from "../../../../../Components/InputMask";
import Loading from "../../../../../Components/Loading";
import TextInput from "../../../../../Components/TextInput";
import RegistartionDetailsProvider, {
  RegistrationDetailsContext,
} from "../../../../../Context/Classroom/Registration/context";
import { RegistrationDetailsTypes } from "../../../../../Context/Classroom/Registration/type";
import {
  color_race,
  formatarData,
  getStatusList,
  StatusRegistrationEnum,
  StatusTermEnum,
  typesex,
  TypeTermEnum
} from "../../../../../Controller/controllerGlobal";
import { useFetchRequestClassroomOne } from "../../../../../Services/Classroom/query";
import color from "../../../../../Styles/colors";
import { Padding, Row } from "../../../../../Styles/styles";
import { Avatar } from "../../../../Beneficiaries/BeneficiariesEdit";
import ModalAddTerm from "../../../../Beneficiaries/BeneficiariesEdit/ModalAddTerm";


const Registration = () => {
  return (
    <RegistartionDetailsProvider>
      <RegistrationPage />
    </RegistartionDetailsProvider>
  );
};

const RegistrationPage = () => {
  const props = useContext(
    RegistrationDetailsContext
  ) as RegistrationDetailsTypes;
  const [visibleTerm, setVisibleTerm] = useState<any>();
  const history = useNavigate();


  const { id } = useParams();
  const { data: classroom } = useFetchRequestClassroomOne(parseInt(id!));

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


  if (props.isLoading) return <Loading />;

  return (
    <ContentPage title={classroom?.name} description="Detalhes da matricula do beneficiário">
      <Padding padding="16px" />

      {props.registration ? (
        <Formik
          initialValues={props.initialValue}
          onSubmit={(values) => {
            props.handleUpdateRegistration(
              { ...values },
              props.registration?.registration_fk!
            );
          }}
        >
          {({ values, handleChange }) => {
            return (
              <Form>
                <Button label="Salvar" />
                <Padding padding="8px" />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Status</label>
                    <Padding />
                    <DropdownComponent
                      value={values.status}
                      onChange={handleChange}
                      name="status"
                      placerholder="Status"
                      optionsLabel="name"
                      options={
                        getStatusList()
                      }
                    />
                  </div>
                </div>{" "}
                <Padding padding="8px" />
                <Avatar>
                  <img alt="" src={props.registration?.avatar_url ? props.registration?.avatar_url : avatar} />
                </Avatar>
                <Padding padding="16px" />
                <h3>Dados basicos</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Id THP</label>
                    <Padding />
                    <TextInput
                      value={props.registration?.registration.thp_id}
                      placeholder="Id THP"
                      disabled
                      name="thp_id"
                    />

                  </div>
                  <div className="col-12 md:col-6">
                    <label>Status do beneficiário</label>
                    <Padding />
                    <TextInput
                      value={props.registration?.registration.status ? StatusRegistrationEnum[props.registration?.registration.status] : props.registration?.registration.status}
                      name="status"
                      disabled
                    />
                  </div>
                </div>
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
                  {values.deficiency && <div className="col-12 md:col-6">
                    <label>Qual deficiência?</label>
                    <Padding />
                    <TextInput
                      value={values.deficiency_description}
                      name="deficiency_description"
                      onChange={handleChange}
                      placeholder="Qual deficiência ?"
                    />
                  </div>}
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
                </div>{" "}
                <Padding padding="8px" />
                <h3>Termo</h3>
                <Padding padding="8px" />

                <DataTable
                  value={props.registration?.registration?.register_term}
                  tableStyle={{ minWidth: "50rem" }}
                  header={renderHeaderTerm}
                >
                  <Column
                    body={(row) => {
                      return <>{formatarData(row?.dateTerm!)}</>;
                    }}
                    header="Data de assinatura"
                  ></Column>
                  <Column
                    body={(row) => {
                      return <>{formatarData(row?.dateValid ?? "")}</>;
                    }}
                    header="Data de validade"
                  ></Column>
                  <Column
                    body={(row) => {
                      return (

                        <>
                          {TypeTermEnum[row?.type ?? ""] && `${TypeTermEnum[row?.type ?? ""]}`}
                        </>
                      );
                    }}
                    header="Tipo do termo"
                  ></Column>
                  <Column
                    body={(row) => {
                      return (
                        <>
                          {StatusTermEnum[row?.status ?? ""] && `${StatusTermEnum[row?.status ?? ""]}`}
                        </>
                      );
                    }}
                    header="Status"
                  ></Column>
                  <Column
                    body={(row) => {
                      return (
                        <>
                          {row?.observation}
                        </>
                      );
                    }}
                    header="Observações"
                  ></Column>
                </DataTable>
                <h3 className="mt-4">Endereço</h3>
                <Padding />
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>CEP</label>
                    <Padding />
                    <TextInput
                      value={props.registration?.registration?.cep}
                      disabled
                      placeholder="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Endereço</label>
                    <Padding />
                    <TextInput value={props.registration?.registration?.address} disabled />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Complemento</label>
                    <Padding />
                    <TextInput value={props.registration?.registration?.complement} disabled />
                  </div>
                </div>{" "}
                <div className="grid">
                  <div className="col-12 md:col-6">
                    <label>Estado </label>
                    <Padding />
                    <TextInput
                      value={props.registration?.registration?.state?.name}
                      disabled
                      placeholder="name"
                    />
                  </div>
                  <div className="col-12 md:col-6">
                    <label>Cidade </label>
                    <Padding />
                    <TextInput
                      value={props.registration?.registration?.city?.name}
                      disabled
                      placeholder="name"
                    />
                  </div>
                </div>{" "}

              </Form>
            );
          }}

        </Formik>
      ) : null}

      <Row id="center" className="mt-4">
        <Button label="Ver mais informações" onClick={() => history('/beneficiarios/' + props.registration?.registration?.id)} />
      </Row>
      <ModalAddTerm
        onHide={() => setVisibleTerm(false)}
        visible={visibleTerm}
        id={props.registration?.registration?.id!}
      />
    </ContentPage>
  );
};
export default Registration;
