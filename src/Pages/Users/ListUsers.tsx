import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentPage from "../../Components/ContentPage";

import Loading from "../../Components/Loading";
import UsersProvider, { UsersContext } from "../../Context/Users/context";
import { UsersTypes } from "../../Context/Users/type";
import { ROLE } from "../../Controller/controllerGlobal";
import { Container, Padding } from "../../Styles/styles";

const ListUsers = () => {
  return (
    <UsersProvider>
      <ListUsersPage />
    </UsersProvider>
  );
};

const ListUsersPage = () => {
  const props = useContext(UsersContext) as UsersTypes;
  const history = useNavigate();

  const [visible, setVisible] = useState<any>(false)
  // const actionBodyTemplate = (rowData: any) => {

  //     return (
  //         <Row id='end'>
  //             {/* <Button icon="pi pi-pencil" rounded className="mr-2" onClick={() => { history("/users/" + rowData.id) }} /> */}
  //             <Button icon="pi pi-trash" rounded type="button" severity="danger" onClick={() => { props.DeleteUser(rowData.id) }} />
  //         </Row>
  //     );
  // };

  const typeUserBody = (rowData: any) => {
    return (
      <p>
        {rowData.role === ROLE.ADMIN
          ? "Admin"
          : rowData.role === ROLE.COORDINATORS
          ? "Coordenador"
          : rowData.role === ROLE.REAPPLICATORS
          ? "Reaplicador"
          : null}
      </p>
    );
  };

  const ActiveUserBody = (rowData: any) => {
    return (
      <p>
        {rowData.active ? "Ativo" : "Desativado"}
      </p>
    );
  };

  const ActionsUserBody = (rowData: any) => {
    return (
      <Button severity="danger" rounded icon={"pi pi-trash"} onClick={() => {setVisible(rowData)}} />
    );
  };

  if (props.isLoading) return <Loading />;


  return (
    <Container>
    <ContentPage title="Usuários" description="Lista usuários do MeuBen.">
      <Padding padding="16px" />
      <Button label="Criar usuário" onClick={() => history("/users/criar")} />
      <Padding padding="16px" />
      <DataTable value={props.users} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="Nome"></Column>
        <Column field="username" header="Usuário"></Column>
        <Column field="role" body={typeUserBody} header="Tipo"></Column>
        <Column field="active" body={ActiveUserBody} header="Ativo"></Column>
        <Column field="actions" body={ActionsUserBody} header="Ações"></Column>

      </DataTable>
    </ContentPage>
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Tem certeza de que deseja prosseguir?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={() => props.DeleteUser(visible?.id)}
        reject={() => setVisible(false)}
      />
    </Container>
  );
};

export default ListUsers;
