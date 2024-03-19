import { DataTable } from "primereact/datatable"
import { Container, Padding, Row } from "../../Styles/styles"
import { Column } from "primereact/column"
import UsersProvider, { UsersContext } from "../../Context/Users/context"
import { useContext } from "react"
import { UsersTypes } from "../../Context/Users/type"
import { Button } from "primereact/button"
import { useNavigate } from "react-router-dom"


const ListUsers = () => {
    return (
        <UsersProvider>
            <ListUsersPage />
        </UsersProvider>
    )
}

const ListUsersPage = () => {

    
    const props = useContext(UsersContext) as UsersTypes
    const history = useNavigate()
    const actionBodyTemplate = (rowData: any) => {

        return (
                <Row id='end'>
                    <Button icon="pi pi-pencil" rounded className="mr-2" onClick={() => {}} />
                    <Button icon="pi pi-trash" rounded type="button" severity="danger" onClick={() => { }} />
                </Row>
        );
    };
    return (
        <Container>
            <h3>
                Usuários
            </h3>
            <Padding padding="16px" />
            <Button label="Criar usuário" onClick={() => history("/users/criar")} />
            <Padding padding="16px" />
            <DataTable value={props.users} tableStyle={{ minWidth: '50rem' }}>
                <Column field="id" header="Code"></Column>
                <Column field="name" header="Nome"></Column>
                <Column field="role" header="Tipo"></Column>
                <Column field="quantity" align="right" body={actionBodyTemplate}  header="Ações"></Column>
            </DataTable>
        </Container>
    )
}

export default ListUsers