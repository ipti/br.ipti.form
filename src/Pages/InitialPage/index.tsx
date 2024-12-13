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

import { Column, Padding, Row } from "../../Styles/styles";
import { PropsAplicationContext } from "../../Types/types";
import { requestChartMatriculated } from "../../Services/Chart/request";

export interface Chart {
  year: number;
  month: number;
  n_registers: number;
  n_approved: number;
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
  const [formattedDates, setFormattedDates] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [ts, setTs] = useState<number | undefined>();
  const [chartData, setChartData] = useState<any>(null);

  // Ao carregar o componente, seleciona por padrão os últimos 6 meses
  useEffect(() => {
    setDates([subtractMonths(new Date(Date.now()), 6), new Date(Date.now())]);
  }, []);

  // Sempre que as datas mudam, formata e faz a requisição
  useEffect(() => {
    if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return;

    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const start = formatDate(dates[0]);
    const end = formatDate(dates[1]);

    setFormattedDates({ start, end });

    // Faz a requisição aqui mesmo, assim que as datas forem formatadas
    const fetchData = async () => {
      try {
        const response = await requestChartMatriculated(start, end);
        // const response = await http.get(`/chart-matriculated-month?startDate=${start}&endDate=${end}`);]
        
        const data: Chart[] = response.data;
        const updatedChartData = {
          labels: month,
          datasets: [
            {
              label: "Total de Matrículas Confirmadas",
              data: renderChart(data, 1),
              borderColor: "#42A5F5",
              fill: false,
            },
            {
              label: "Total de Matrículas",
              data: renderChart(data, 2),
              borderColor: "#FCAD09",
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
  }, [dates]);

  // Continua usando o hook para outras requisições
  const { data: chart, isLoading, isError } = useFetchRequestUsersChart(ts?.toString());

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

  if (isLoading) return <Loading />;
  if (isError) return <div>Erro ao carregar os dados</div>;

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
            value={ts}
            onChange={(e) => setTs(e.target.value)}
            placerholder="Filtrar por Tecnologia"
          />
        </Row>
      )}

      <Padding padding="16px" />
      <div className="grid">
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de Ts"
            quant={chart?.totalUserSocialTechnologies!}
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de Projetos"
            quant={chart?.totalProjects!}
            color="blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de Turmas"
            quant={chart?.totalClassrooms!}
            color="orange"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de matrículas"
            quant={chart?.totalRegisterClassrooms!}
            color="navy_blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de matrículas confirmadas"
            quant={chart?.approvedRegisterClassrooms!}
            color="blue"
          />
        </div>
        <div className="col-12 md:col-2 lg:col-2">
          <CardQuant
            title="Total de encontros"
            quant={chart?.totalMeetings!}
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
        <div>
          {chartData && <ChartPrime type="line" data={chartData} />}
        </div>
      </div>
    </ContentPage>
  );
};

export default InitialPage;

