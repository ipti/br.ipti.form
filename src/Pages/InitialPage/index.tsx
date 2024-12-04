import React, { useContext, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Chart as ChartPrime } from 'primereact/chart';
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

const State = () => {
  const [ts, setTs] = useState<number | undefined>();
  const { data, isLoading, isError } = useFetchRequestUsersChart(ts?.toString());

  return {
    chart: data,
    isLoading,
    isError,
    ts,
    setTs,
  };
};

const InitialPage = () => {
  const propsAplication = useContext(AplicationContext) as PropsAplicationContext;
  const props = State();
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await http.get('/user-bff/chart?year=' + getYear());
        const { totalRegisterClassrooms, approvedRegisterClassrooms } = response.data;

        setChartData({
          labels: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ],
          datasets: [
            {
              label: 
              "Total de Matrículas",
              data: totalRegisterClassrooms, // Assumindo um array com valores por mês
              borderColor: "#42A5F5",
              fill: false,
            },
            {
              label: "Matrículas Confirmadas",
              data: approvedRegisterClassrooms, // Assumindo um array com valores por mês
              borderColor: "orange",
              fill: false,
            },
          ],
        });
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchChartData();
  }, []);

  const downloadCSV = async () => {
    try {
      const response = await http.get('/user-bff/chart-csv?year=' + getYear());
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'meuben.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erro ao baixar o arquivo:', error);
    }
  };

  if (props.isLoading) return <Loading />;
  return (
    <ContentPage title={`Bem vindo, ${propsAplication.user?.name}!`} description="Visualização dos dados gerais do meuBen.">
      {propsAplication.user?.role === ROLE.ADMIN && (
        <Row id="end">
          <Button label="Baixar CSV" icon="pi pi-download" iconPos="left" onClick={downloadCSV} />
        </Row>
      )}
      <Padding padding="8px" />
      {propsAplication.project && (
        <Row id="end">
          <DropdownComponent 
            options={[...propsAplication.project, { id: undefined, name: "Todos" }]} 
            optionsLabel="name" 
            optionsValue="id" 
            value={props.ts} 
            onChange={(e) => props.setTs(e.target.value)} 
            placerholder="Filtrar por Tecnologia" 
          />
        </Row>
      )}
      <Padding padding="16px" />
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
          <CardQuant title="Total de matrículas" quant={props.chart?.totalRegisterClassrooms!} color="orange" />
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de matrículas confirmadas" quant={props.chart?.approvedRegisterClassrooms!} color="navy_blue" />
        </div>
        <div className="col-12 md:col-4 lg:col-4">
          <CardQuant title="Total de encontros" quant={props.chart?.totalMeetings!} color="blue" />
        </div>
      </div>

      <Padding padding="20px" />
      {/* Gráfico de Linhas */}
      <div className="grid">
        <div className="col-12">
          {chartData && (
            <ChartPrime type="line" data={chartData} />
          )}
        </div>
      </div>
    </ContentPage>
  );
};

export default InitialPage;
