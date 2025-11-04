import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentPage from "../../../Components/ContentPage";
import DropdownComponent from "../../../Components/Dropdown";
import { AplicationContext } from "../../../Context/Aplication/context";
import { BeneficiariesListContext } from "../../../Context/Beneficiaries/BeneficiariesList/context";
import { BeneficiariesListType } from "../../../Context/Beneficiaries/BeneficiariesList/type";
import {
  formatarData,
  somarNumeros,
} from "../../../Controller/controllerGlobal";
import { Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import ModalFilter from "./ModalFilter";

export const BeneficiariesListPage = () => {
  const props = useContext(BeneficiariesListContext) as BeneficiariesListType;

  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;
  const history = useNavigate();

  const [visible, setVisible] = useState<any>();

  const [visibleFilter, setVisibleFilter] = useState<any>();

  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-between"
      >
        <Button
          label={window.innerWidth > 800 ? "Adicionar beneficiario" : undefined}
          icon="pi pi-plus"
          onClick={() => history("criar")}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={props.allFilter}
            placeholder="Pesquisar..."
            onChange={(e) => {props.setallFilter(e.target.value); props.updateAllFilter(e.target.value)}}
          />
        </span>
      </div>
    );
  };

  const ActionBeneficiariesBody = (rowData: any) => {
    return (
      <Row id="center" style={{ gap: "8px" }}>
        <Button
          rounded
          icon={"pi pi-pencil"}
          onClick={() => {
            history(`${rowData.id}`);
          }}
        />
        <Button
          severity="danger"
          rounded
          icon={"pi pi-trash"}
          onClick={() => {
            setVisible(rowData);
          }}
        />
      </Row>
    );
  };

  return (
    <>
      <ContentPage
        title="Beneficiários"
        description="Visualização dos beneficiários da tecnologia."
      >
        <Padding padding="4px" />
        {propsAplication.project && (
          <div className="grid">
            <div className="col-12 md:col-6">
              <label>Filtrar por tecnologia</label>
              <Padding />
              <DropdownComponent
                placerholder="Escolha uma tecnologia"
                options={[
                  { name: "Todos", id: undefined },
                  ...propsAplication.project,
                ]}
                value={props.tsId}
                optionsValue="id"
                onChange={(e) => {
                  props.setTsId(e.target.value);
                }}
              />
            </div>
          </div>
        )}

        <Row style={{ gap: 8 }}>
          {props.nameFilter?.length! > 0 && (
            <Chip label={"Nome: " + props.nameFilter} />
          )}
          {props.cpfFilter?.length! > 0 && (
            <Chip label={"CPF: " + props.cpfFilter} />
          )}
          {(props.cpfFilter?.length! > 0 || props.nameFilter?.length! > 0) && (
            <Button
              label="Limpar filtro"
              text
              type="button"
              onClick={() => {
                props.handleFilter({ name: "", cpf: "" });
              }}
            />
          )}
        </Row>
        <Padding padding="8px" />
        <DataTable
          value={props.registrations?.content}
          tableStyle={{ minWidth: "50rem" }}
          header={renderHeader}
          showGridlines
        >
          <Column field="name" header="Nome"></Column>
          <Column
            field="responsable_name"
            header="Nome do responsável"
          ></Column>
          <Column field="cpf" header="CPF"></Column>
          <Column
            body={(rowData) => {
              return <>{formatarData(rowData.date_registration)}</>;
            }}
            header="Data de matricula"
          ></Column>
          <Column
            body={(rowData) => {
              return (
                <>
                  {rowData?.register_term?.length > 0
                    ? `${formatarData(
                        rowData.register_term[rowData.register_term.length - 1]
                          .dateTerm
                      )} - ${formatarData(
                        rowData.register_term[rowData.register_term.length - 1]
                          .dateValid
                      )}`
                    : "Sem documento"}
                </>
              );
            }}
            header="Vigência do termo assinado"
          ></Column>
          <Column header="Ações" body={ActionBeneficiariesBody}></Column>
        </DataTable>
        <Paginator
          first={props.page}
          totalRecords={props.registrations?.total}
          onPageChange={(e) => {
            props.setPage(somarNumeros(e.first, 1));
          }}
          rows={props.limite}
        />
      </ContentPage>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Tem certeza de que deseja prosseguir?"
        header="Confirmação"
        icon="pi pi-exclamation-triangle"
        accept={() => props.DeleteRegistration(visible.id)}
        reject={() => setVisible(false)}
      />
      <ModalFilter
        visible={visibleFilter}
        onHide={() => setVisibleFilter(false)}
      />
    </>
  );
};
