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
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";


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
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

  console.log(dates);


  useEffect(() => {
    const fetchChartData = async () => {
      if (!dates || dates.length < 2) {
        console.error("Datas inválidas");
        return;
      }
  
      // Função para formatar a data
      const formatDate = (date: any) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Ajusta o mês
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
  
      // Formatar as datas selecionadas
      const startDate = formatDate(dates[0]);
      const endDate = formatDate(dates[1]);

      try {
        //const response = await http.get('localhost:3000/chart-bff/chart-matriculated-month?startDate='+ dates![0] + '&endDate=' + dates![1]);
        //const response = await http.get('localhost:3000/chart-bff/chart-matriculated-month?startDate=2021-01-01&endDate=2021-12-31');
        const response = await http.get(
          `http://localhost:3000/chart-bff/chart-matriculated-month?startDate=${startDate}&endDate=${endDate}`
        );
        const { n_registers, n_approved } = response.data;
        console.log(response.data);

        setChartData({
          labels: [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
          ],
          datasets: [
            {
              label: 
              "Total de Matrículas",
              data: n_registers, // Assumindo um array com valores por mês
              borderColor: "#42A5F5",
              fill: false,
            },
            {
              label: "Matrículas Confirmadas",
              data: n_approved, // Assumindo um array com valores por mês
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
  }, [dates]);

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
      <div className="card flex justify-content-center">
            <Calendar value={dates} onChange={(e) => setDates(e.value)} selectionMode="range" readOnlyInput hideOnDateTimeSelect />
      </div>

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
