import { Button } from "primereact/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardTs from "../../../Components/Card/CardTs";
import ContentPage from "../../../Components/ContentPage";
import Empty from "../../../Components/Empty";
import Loading from "../../../Components/Loading";
import { AplicationContext } from "../../../Context/Aplication/context";
import { ROLE } from "../../../Controller/controllerGlobal";
import { Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import { idTs, menuItem } from "../../../Services/localstorage";

const TecnologySocial = () => {
  const history = useNavigate();
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (!propsAplication.project) return <Loading />;
  return (
    <ContentPage title="Tecnologias" description="Visualização das tecnologias sociais.">
      <Padding padding="16px" />

      {propsAplication.user?.role === ROLE.ADMIN && (
        <Row id="end" style={{ width: "100%" }}>
          <Button
            label="Criar Tecnologia Social"
            icon={"pi pi-plus"}
            onClick={() => history("/tecnologias/criar")}
          />
        </Row>
      )}
      <Padding padding="16px" />
      {propsAplication.project.length > 0 ? (
      <div className="grid">
        {propsAplication.project?.map((item, index) => {
          return (
            <div className="col-12 md:col-6 lg:col-4" onClick={() => {
              idTs(item.id.toString());
              history("/projetos");
              menuItem("3");
              // window.location.reload();
            }}>
              <CardTs title={item.name} id={item.id} />
            </div>
          );
        })}
      </div>) : (
        <Empty title="Tecnologias" />
      )}
    </ContentPage>
  );
};

export default TecnologySocial;
