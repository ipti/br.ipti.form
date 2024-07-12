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
import BeneficiariesListProvider, {
  BeneficiariesListContext,
} from "../../../Context/Beneficiaries/BeneficiariesList/context";
import { BeneficiariesListType } from "../../../Context/Beneficiaries/BeneficiariesList/type";
import {
  formatarData,
  somarNumeros,
} from "../../../Controller/controllerGlobal";
import color from "../../../Styles/colors";
import { Padding, Row } from "../../../Styles/styles";
import ModalFilter from "./ModalFilter";

const BeneficiariesList = () => {
  return (
    <BeneficiariesListProvider>
      <BeneficiariesListPage />
    </BeneficiariesListProvider>
  );
};

const BeneficiariesListPage = () => {
  const props = useContext(BeneficiariesListContext) as BeneficiariesListType;
  const history = useNavigate();

  const [visible, setVisible] = useState<any>();

  const [visibleFilter, setVisibleFilter] = useState<any>();

  const renderHeader = () => {
    return (
      <div
        className="flex justify-content-between"
        style={{ background: color.colorCard }}
      >
        <Button
          label={window.innerWidth > 800 ? "Adicionar alunos" : undefined}
          icon="pi pi-plus"
          onClick={() => history("criar")}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={props.allFilter}
            placeholder="Pesquisar..."
            onChange={(e) => props.setallFilter(e.target.value)}
          />
        </span>
        {/* <Button
          label={window.innerWidth > 800 ? "Configurar filtro" : undefined}
          icon="pi pi-filter"
          onClick={() => {
            setVisibleFilter(true);
          }}
        /> */}
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
      <ContentPage title="Alunos" description="Visualização dos alunos da escolas.">
        <Padding padding="16px" />
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
              return <>{formatarData(rowData.createdAt)}</>;
            }}
            header="Data de criação"
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

export default BeneficiariesList;
