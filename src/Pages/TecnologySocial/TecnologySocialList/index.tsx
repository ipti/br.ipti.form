import { Button } from "primereact/button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardTs from "../../../Components/Card/CardTs";
import { AplicationContext } from "../../../Context/Aplication/context";
import { ROLE } from "../../../Controller/controllerGlobal";
import { Container, Padding, Row } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";
import Loading from "../../../Components/Loading";
import Empty from "../../../Components/Empty";

const TecnologySocial = () => {
  const history = useNavigate();
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (!propsAplication.project) return <Loading />;
  return (
    <Container>
      <h1>Tecnologias</h1>
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
            <div className="col-12 md:col-6 lg:col-4">
              <CardTs title={item.name} id={item.id} />
            </div>
          );
        })}
      </div>) : (
        <Empty title="Tecnologias" />
      )}
    </Container>
  );
};

export default TecnologySocial;
