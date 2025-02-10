import { useContext, useEffect, useState } from "react";

import { Button } from "primereact/button";
//import { MultiSelect } from 'primereact/multiselect';
import { Nullable } from "primereact/ts-helpers";

import CardQuant from "../../Components/Chart/CardQuant";
import ContentPage from "../../Components/ContentPage";

import MultiSelectComponet from "../../Components/MultiSelect";
//import Loading from "../../Components/Loading";
import CalendarComponent from "../../Components/Calendar";
import { AplicationContext } from "../../Context/Aplication/context";

import http from "../../Services/axios";
import { getYear } from "../../Services/localstorage";

import { Padding, Row } from "../../Styles/styles";
import { PropsAplicationContext } from "../../Types/types";

import { InitialPageModel } from "./initialPageModel";

import { getInitialPageModel } from "../../Controller/controllerInicialPage";
import { ChartMatriculated } from "./Components/ChartMatrticulated/chartMatriculated";
import { ChartStatus } from "./Components/ChartStatus/chartStatus";
import { ROLE } from "../../Controller/controllerGlobal";
import ChartsProvider, { ChartsContext } from "../../Context/Charts/context";
import type { ChartsProps } from "../../Context/Charts/context";
import { ChartCard } from "./Components/ChartCard";

const subtractMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() - months);
  return newDate;
};

const InitialPage = () => {
  const propsAplication = useContext(
    AplicationContext
  ) as PropsAplicationContext;

  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [ts, setTs] = useState<number[] | undefined>();
  const [initialPageData, setInitialPageData] = useState<InitialPageModel>();

  const chartData = useContext(ChartsContext) as ChartsProps;

  useEffect(() => {
    if (propsAplication.project === undefined) return;
    setTs(propsAplication.project?.map((item) => item.id));
    setDates([subtractMonths(new Date(Date.now()), 6), new Date(Date.now())]);

    const fetchData = async () => {
      try {
        const pagedata = await getInitialPageModel(
          propsAplication.project?.map((item) => item.id) ?? (ts as number[]),
          dates ?? [
            subtractMonths(new Date(Date.now()), 6),
            new Date(Date.now()),
          ]
        );

        setInitialPageData(pagedata);
      } catch (error) {
        console.error("Erro ao buscar dados iniciais:", error);
      }
    };
    fetchData();
  }, [propsAplication.project]);

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
    <ChartsProvider>
      <ContentPage
        title={`Bem vindo, ${propsAplication.user?.name}!`}
        description="Visualização dos dados gerais do meuBen."
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            width: "100%",
            gap: "10px",
            flexWrap: "wrap",
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
              <div
                style={{ flex: 2, display: "flex", flexDirection: "column" }}
              >
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
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
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
              quant={initialPageData?.cardsData?.totalUserSocialTechnologies!}
              color="navy_blue"
            />
          </div>
          <div className="col-12 md:col-4 lg:col-2">
            <CardQuant
              title="Total de Projetos"
              quant={initialPageData?.cardsData?.totalProjects!}
              color="blue"
            />
          </div>
          <div className="col-12 md:col-4 lg:col-2">
            <CardQuant
              title="Total de Turmas"
              quant={initialPageData?.cardsData?.totalClassrooms!}
              color="orange"
            />
          </div>
          <div className="col-12 md:col-4 lg:col-2">
            <CardQuant
              title="Total de matrículas"
              quant={initialPageData?.cardsData?.totalRegisterClassrooms!}
              color="navy_blue"
            />
          </div>
          <div className="col-12 md:col-4 lg:col-2">
            <CardQuant
              title="Total de matrículas confirmadas"
              quant={initialPageData?.cardsData?.approvedRegisterClassrooms!}
              color="blue"
            />
          </div>
          <div className="col-12 md:col-4 lg:col-2">
            <CardQuant
              title="Total de encontros"
              quant={initialPageData?.cardsData?.totalMeetings!}
              color="orange"
            />
          </div>
        </div>

        <div
          className="grid"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <ChartCard
            title="Gráfico de Matrículas Total"
            type="line"
            dates={dates}
            ts={ts}
          />
          <ChartCard
            title="Status de Matrículas"
            type="bar"
            dates={dates}
            ts={ts}
          />
        </div>

        <Padding padding="16px" />
      </ContentPage>
    </ChartsProvider>
  );
};

export default InitialPage;
