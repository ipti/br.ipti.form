import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CardTs from "../../../Components/Card/CardTs";
import ContentPage from "../../../Components/ContentPage";
import Empty from "../../../Components/Empty";
import Loading from "../../../Components/Loading";
import { AplicationContext } from "../../../Context/Aplication/context";
import { ROLE } from "../../../Controller/controllerGlobal";
import { idTs, menuItem } from "../../../Services/localstorage";
import { Padding } from "../../../Styles/styles";
import { PropsAplicationContext } from "../../../Types/types";

const TecnologySocial = () => {
  const history = useNavigate();
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  if (!propsAplication.project) return <Loading />;
  return (
    <ContentPage title="Tecnologias" description="Visualização das tecnologias sociais." permissionButton={propsAplication.user?.role === ROLE.ADMIN} addButton onClick={() => history("/tecnologias/criar")} >
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
