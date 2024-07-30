import { Button } from "primereact/button";
import { useContext, useState } from "react";
import CardQuant from "../../Components/Chart/CardQuant";
import ContentPage from "../../Components/ContentPage";
import DropdownComponent from "../../Components/Dropdown";
import Loading from "../../Components/Loading";
import { AplicationContext } from "../../Context/Aplication/context";
import { useFetchRequestUsersChart } from "../../Services/Users/query";
import { Padding, Row } from "../../Styles/styles";
import { PropsAplicationContext } from "../../Types/types";
import http from "../../Services/axios";
import { getYear } from "../../Services/localstorage";
import { ROLE } from "../../Controller/controllerGlobal";

export interface Chart {
  totalUserSocialTechnologies: number;
  totalProjects: number;
  totalClassrooms: number;
  totalRegisterClassrooms: number;
  approvedRegisterClassrooms: number;
  totalMeetings: number;
}

const State = () => {

  const [ts, setTs] = useState<number | undefined>()
  const { data, isLoading, isError } = useFetchRequestUsersChart(ts?.toString());

  console.log(ts)

  var chart: Chart | undefined = data;

  return {
    chart,
    isLoading,
    isError, ts, setTs
  };
};

const InitialPage = () => {
  const propsAplication = useContext(AplicationContext) as PropsAplicationContext
  const props = State();

  const downloadCSV = async () => {

    console.log("Njnsdans")
    try {
      const response = await http.get('/user-bff/chart-csv?year=' + getYear())

      // Criar um link para download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'meuben.csv'); // Nome do arquivo
      document.body.appendChild(link);
      link.click();

      // Remover o link
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };

  if (props.isLoading) return <Loading />;
  return (
    <ContentPage title={"Bem vindo, " + propsAplication.user?.name + "!"} description="Visualização dos dados gerais do meuBen.">
      {propsAplication.user?.role === ROLE.ADMIN && <Row id="end">
        <Button label="Baixar CSV" icon="pi pi-download" iconPos="left" onClick={downloadCSV} />
      </Row>}
      <Padding padding="8px" />
      {propsAplication.project && <Row id="end"><DropdownComponent options={[...propsAplication.project, { id: undefined, name: "Todos" }]} optionsLabel="name" optionsValue="id" value={props.ts} onChange={(e) => props.setTs(e.target.value)} placerholder="Filtrar por Tecnologia" /></Row>
      }      <Padding padding="16px" />
      <div className="grid">
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de Ts" quant={props.chart?.totalUserSocialTechnologies!} color="navy_blue" />
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de Projetos" quant={props.chart?.totalProjects!} color="blue" />
        </div>

        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de Turmas" quant={props.chart?.totalClassrooms!} color="orange" />
        </div>
      </div>
      <div className="grid">
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de matriculas" quant={props.chart?.totalRegisterClassrooms!} color="orange" />
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de matriculas confirmadas" quant={props.chart?.approvedRegisterClassrooms!} color="navy_blue" />
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de encontros" quant={props.chart?.totalMeetings!} color="blue" />
        </div>
      </div>
    </ContentPage>
  );
};

export default InitialPage;
