import { logout } from "../../../../Services/localstorage";
import { Column, Padding } from "../../../../Styles/styles";
import { Container } from "./style";


const LogoutTopBar = () => {
    return (
        <Container onClick={() => { logout(); window.location.reload() }}>
            <div className="flex flex-row">
                <Column id="center">
                <i className="pi pi-sign-out"></i>
                </Column>
                <Padding padding="2px" />
                <div>Sair</div>
            </div>
        </Container>

    )
}

export default LogoutTopBar;