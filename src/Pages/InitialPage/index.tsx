import { Button } from "primereact/button";
import { Chart as ChartPrime } from "primereact/chart";
import { Nullable } from "primereact/ts-helpers";
import { useContext, useEffect, useState } from "react";

import CardQuant from "../../Components/Chart/CardQuant";
import ContentPage from "../../Components/ContentPage";
import DropdownComponent from "../../Components/Dropdown";
import Loading from "../../Components/Loading";
import CalendarComponent from "../../Components/Calendar";

import { AplicationContext } from "../../Context/Aplication/context";
import { ROLE } from "../../Controller/controllerGlobal";

import http from "../../Services/axios";
import { getYear } from "../../Services/localstorage";
import { useFetchRequestUsersChart } from "../../Services/Users/query";
import { useRequestChartMatriculated } from "../../Services/Chart/query";

import { Column, Padding, Row } from "../../Styles/styles";
import { PropsAplicationContext } from "../../Types/types";


export interface Chart {
  year: number;
  month: number;
  n_registers: number;
  n_approved: number;
}

const State = () => {
  const [ts, setTs] = useState<number | undefined>();
  const { data, isLoading, isError } = useFetchRequestUsersChart(
    ts?.toString()
  )
  ;
  const { data: dataChart } = useRequestChartMatriculated();

  return {
    chart: data,
    chartMatriculated: dataChart,
    isLoading,
    isError,
    ts,
    setTs,
  };
};

const InitialPage = () => {
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;
  const props = State();
  const [chartData, setChartData] = useState<any>(null);
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);

  const month = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const subtractMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
  };

  useEffect(() => {
    setDates([subtractMonths(new Date(Date.now()), 6), new Date(Date.now())]);
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!dates || dates.length < 2) {
        console.error("Datas inválidas");
        return;
      }

      const formatDate = (date: any) => {
        const year = date?.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const renderChart = (data: Chart[], type: number) => {
        if (type === 1) {
          return month.map((item, index) => {
            return data.find((element) => element.month === index)
              ? data.find((element) => element.month === index)?.n_approved
              : 0;
          });
        }

        if (type === 2) {
          return month.map((item, index) => {
            return data.find((element) => element.month === index)
              ? data.find((element) => element.month === index)?.n_registers
              : 0;
          });
        }
      };

    
      const startDate = formatDate(
        dates[0] ?? subtractMonths(new Date(Date.now()), 6) // Subtrai 6 meses da data atual
      );
      const endDate = formatDate(dates[1] ?? new Date(Date.now()));

      try {
        // const response = await http.get(
        //   `http://localhost:3000/chart-bff/chart-matriculated-month?startDate=${startDate}&endDate=${endDate}`
        // );
        // const data: Chart[] = response.data;

        setChartData({
          labels: month,
          datasets: [
            {
              label: "Total de Matrículas Confirmadas",
              //data: renderChart(data, 1), 
              data: renderChart(props.chartMatriculated, 1), 
              borderColor: "#42A5F5",
              fill: false,
            },
            {
              label: "Total de Matrículas",
              //data: renderChart(data, 2), 
              data: renderChart(props.chartMatriculated, 2), 
              borderColor: "#FCAD09",
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
      const response = await http.get("/user-bff/chart-csv?year=" + getYear());
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "meuben.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Erro ao baixar o arquivo:", error);
    }
  };

  if (props.isLoading) return <Loading />;
  return (
    <ContentPage
      title={`Bem vindo, ${propsAplication.user?.name}!`}
      description="Visualização dos dados gerais do meuBen."
    >
      {propsAplication.user?.role === ROLE.ADMIN && (
        <Row id="end">
          <Button
            label="Baixar CSV"
            icon="pi pi-download"
            iconPos="left"
            onClick={downloadCSV}
          />
        </Row>
      )}
      <Padding padding="8px" />
      {propsAplication.project && (
        <Row id="end">
          <DropdownComponent
            options={[
              ...propsAplication.project,
              { id: undefined, name: "Todos" },
            ]}
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
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de Ts"
            quant={props.chart?.totalUserSocialTechnologies!}
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de Projetos"
            quant={props.chart?.totalProjects!}
            color="blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de Turmas"
            quant={props.chart?.totalClassrooms!}
            color="orange"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de matrículas"
            quant={props.chart?.totalRegisterClassrooms!}
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de matrículas confirmadas"
            quant={props.chart?.approvedRegisterClassrooms!}
            color="blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de encontros"
            quant={props.chart?.totalMeetings!}
            color="orange"
          />
        </div>
      </div>

      <Padding padding="20px" />
      
      <div className="card col-12 md:col-6 lg:col-6" style={{ padding: "20px" }}>
        <Row id="start">
          <Column>
            <h2>Gráfico de Matrículas</h2>
            <Padding padding="8px" />

            <CalendarComponent
              value={dates}
              onChange={(e: any) => setDates(e.value)}
              selectionMode="range"
              placeholder="Selecione o período"
              dateFormat="dd/mm/yy"
              name="dates"
            />
          </Column>
        </Row>

        
          <div >
            {chartData && <ChartPrime type="line" data={chartData} />}
          </div>
        
      </div>
    </ContentPage>
  );
};

export default InitialPage;
