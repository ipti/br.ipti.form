import { useContext, useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Chart as ChartPrime } from "primereact/chart";
//import { MultiSelect } from 'primereact/multiselect';
import { Nullable } from "primereact/ts-helpers";

import CardQuant from "../../Components/Chart/CardQuant";
import ContentPage from "../../Components/ContentPage";
//import DropdownComponent from "../../Components/Dropdown";
import MultiSelectComponet from "../../Components/MultiSelect";
import Loading from "../../Components/Loading";
import CalendarComponent from "../../Components/Calendar";

import { AplicationContext } from "../../Context/Aplication/context";
import { getMonthNumber, ROLE } from "../../Controller/controllerGlobal";

import http from "../../Services/axios";
import { getYear } from "../../Services/localstorage";
//import { useFetchRequestUsersChart } from "../../Services/Users/query";

import { Column, Padding, Row } from "../../Styles/styles";
import { PropsAplicationContext } from "../../Types/types";
import { requestChartMatriculated } from "../../Services/Chart/request";
import { requestChartStatusClasses } from "../../Services/Chart/request";
import { requestChartCard } from "../../Services/Chart/request";
import { requestChartTSCard } from "../../Services/Chart/request";

import color from "../../Styles/colors";
//import { parse } from "path";
//import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

export interface Chart {
  year: number;
  month: number;
  n_registers: number;
  n_approved: number;
}

export interface ChartStatus {
  social_technology_name: string;
  t_pending: bigint;
  t_approved: bigint;
  t_canceled: bigint;
}

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

const renderChart = (data: Chart[], type: number) => {
  return month.map((item, index) => {
    const found = data.find((element) => element.month === index);
    if (!found) return 0;
    return type === 1 ? found.n_approved : found.n_registers;
  });
};

const InitialPage = () => {
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [, setFormattedDates] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });
  const [LoadingTs, setLoadingTs] = useState<boolean>(true);
  const [ts, setTs] = useState<number[] | undefined>();
  const [chartData, setChartData] = useState<any>(null);
  const [chartDataStatus, setChartDataStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para o status de carregamento
  const [isError, setIsError] = useState<boolean>(false);

  // Ao carregar o componente, seleciona por padrão os últimos 6 meses
  useEffect(() => {
    setDates([subtractMonths(new Date(Date.now()), 6), new Date(Date.now())]);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return;

    const start = formatDate(dates[0]);
    const end = formatDate(dates[1]);

    setFormattedDates({ start, end });

    const fetchData = async () => {
      try {
        const response = await requestChartMatriculated(start, end, ts ?? []);

        const data: Chart[] = response.data;

        // Pegando apenas os meses disponíveis nos dados recebidos
        const availableMonths = Array.from(
          new Set(data.map((item) => item.month))
        ).sort((a, b) => a - b);

        const mesInital = dates[0]?.getMonth() ?? 0;
        const mesFinal = dates[1]?.getMonth() ?? 0;
        // Criando labels dinâmicos baseados nos meses retornados
        const labels = dates[0]
          ? getMonthNumber(mesInital, mesFinal)
          : availableMonths.map((m) => month[m]);

        const updatedChartData = {
          labels: labels,
          datasets: [
            {
              label: "Total de Matrículas Confirmadas",
              data: availableMonths.map((m) => {
                const found = data.find((element) => element.month === m);
                return found ? found.n_approved : 0;
              }),
              borderColor: color.blue,
              fill: false,
            },
            {
              label: "Total de Matrículas",
              data: availableMonths.map((m) => {
                const found = data.find((element) => element.month === m);
                return found ? found.n_registers : 0;
              }),
              borderColor: color.colorCardOrange,
              fill: false,
            },
          ],
        };

        setChartData(updatedChartData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchData();
  }, [dates, ts]);

  useEffect(() => {
    if (propsAplication.project && LoadingTs) {
      setTs(propsAplication.project?.map((item) => item.id));
      setLoadingTs(false);
    }
  }, [propsAplication.project]);

  useEffect(() => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return;

    const start = formatDate(dates[0]);
    const end = formatDate(dates[1]);

    setFormattedDates({ start, end });

    const fetchData = async () => {
      try {
        const response = await requestChartStatusClasses(start, end, ts ?? []);
        const data: ChartStatus[] = response.data;
        const updatedChartData = {
          labels: data.map((item) => item.social_technology_name),
          datasets: [
            {
              label: "Em andamento",
              data: data.map((item) => item.t_pending),
              backgroundColor: color.colorCardOrange,
            },
            {
              label: "Finalizado",
              data: data.map((item) => item.t_approved),
              backgroundColor: color.blue,
            },
            {
              label: "Cancelado",
              data: data.map((item) => item.t_canceled),
              backgroundColor: color.red,
            },
          ],
        };
        setChartDataStatus(updatedChartData);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    };

    fetchData();
  }, [dates, ts]);

  const [chartTSData, setChartTSData] = useState<{
    totalMeetings: number;
    approvedRegisterClassrooms: number;
    totalRegisterClassrooms: number;
    totalClassrooms: number;
    totalProjects: number;
    totalUserSocialTechnologies: number;
  }>({
    totalMeetings: 0,
    approvedRegisterClassrooms: 0,
    totalRegisterClassrooms: 0,
    totalClassrooms: 0,
    totalProjects: 0,
    totalUserSocialTechnologies: 0,
  });

  useEffect(() => {
    const fetchChartData = async () => {
      if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return;

      const start = formatDate(dates[0]);
      const end = formatDate(dates[1]);

      setIsLoading(true);
      setIsError(false);

      try {
        let response;
        if (ts && ts.length > 0) {
          response = await requestChartTSCard(start, end, ts);
        } else {
          const year = new Date().getFullYear();
          response = await requestChartCard(
            parseInt(getYear() ?? year.toString())
          );
        }
        setChartTSData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChartData();
  }, [dates, ts]);

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

  return (
    <ContentPage
      title={`Bem vindo, ${propsAplication.user?.name}!`}
      description="Visualização dos dados gerais do meuBen."
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch", // Garante que todos os itens tenham a mesma altura
          width: "100%",
          gap: "10px", // Define o espaço entre os elementos
          flexWrap: "wrap", // Permite que os itens se ajustem em diferentes linhas se necessário
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            gap: "10px",
            flex: 1,
          }}
        >
          {propsAplication.project && (
            <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
              <MultiSelectComponet
                options={[...propsAplication.project]}
                optionsLabel="name"
                optionsValue="id"
                value={ts}
                onChange={(e) => setTs(e.target.value)}
                placerholder="Filtrar por Tecnologia Social"
              />
            </div>
          )}
          {propsAplication.project && (
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <CalendarComponent
                value={dates}
                onChange={(e: any) => setDates(e.value)}
                selectionMode="range"
                placeholder="Selecione o período"
                dateFormat="dd/mm/yy"
                name="dates"
              />
            </div>
          )}
        </div>

        {propsAplication.user?.role === ROLE.ADMIN && (
          <Row
            id="end"
            style={{
              marginLeft: "auto",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              label="Baixar CSV"
              icon="pi pi-download"
              iconPos="left"
              onClick={downloadCSV}
            />
          </Row>
        )}
      </div>

      <Padding padding="16px" />
      <div className="grid">
        <div className="col-12 md:col-4 lg:col-2">
          <CardQuant
            title="Total de Ts"
            quant={chartTSData?.totalUserSocialTechnologies!}
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-4 lg:col-2">
          <CardQuant
            title="Total de Projetos"
            quant={chartTSData?.totalProjects!}
            color="blue"
          />
        </div>
        <div className="col-12 md:col-4 lg:col-2">
          <CardQuant
            title="Total de Turmas"
            quant={chartTSData?.totalClassrooms!}
            color="orange"
          />
        </div>
        <div className="col-12 md:col-4 lg:col-2">
          <CardQuant
            title="Total de matrículas"
            quant={chartTSData?.totalRegisterClassrooms!}
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-4 lg:col-2">
          <CardQuant
            title="Total de matrículas confirmadas"
            quant={chartTSData?.approvedRegisterClassrooms!}
            color="blue"
          />
        </div>
        <div className="col-12 md:col-4 lg:col-2">
          <CardQuant
            title="Total de encontros"
            quant={chartTSData?.totalMeetings!}
            color="orange"
          />
        </div>
      </div>

      <Row>
        <div
          className="card col-12 md:col-6 lg:col-6"
          style={{ padding: "20px" }}
        >
          <Row id="start">
            <Column>
              <h2>Gráfico de Matrículas Total</h2>
              <Padding padding="8px" />
            </Column>
          </Row>
          <div>{chartData && <ChartPrime type="line" data={chartData} />}</div>
        </div>
        {/* Adicionar espaço separador aqui*/}
        <div
          className="card col-12 md:col-6 lg:col-6"
          style={{ padding: "20px" }}
        >
          <Row id="start">
            <Column>
              <h2>Gráfico de Turmas</h2>
              <Padding padding="8px" />
            </Column>
          </Row>
          <div>
            {chartDataStatus && (
              <ChartPrime
                type="bar"
                data={chartDataStatus}
                options={{
                  indexAxis: "y",
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </Row>
    </ContentPage>
  );
};

export default InitialPage;
