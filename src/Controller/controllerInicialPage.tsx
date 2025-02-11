
import {
  requestChartCard,
  requestChartMatriculated,
  requestChartTSCard,
} from "../Services/Chart/request";
import { getYear } from "../Services/localstorage";
import { getMonthNumber } from "../Controller/controllerGlobal";
import color from "../Styles/colors";
import { ChartLinesModel } from "../Components/Chart/ChartLines/chartLinesModel";

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

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getInitialPageCardsData = async (ts: number[], dates: any[]) => {
  const start = formatDate(dates[0]);
  const end = formatDate(dates[1]);

  try {
    let response;
    if (ts && ts.length > 0) {
      response = await requestChartTSCard(start, end, ts);
      console.log("response", response);
    } else {
      const year = new Date().getFullYear();
      response = await requestChartCard(parseInt(getYear() ?? year.toString()));
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico:", error);
    const cardsData = {
      totalMeetings: 0,
      approvedRegisterClassrooms: 0,
      totalRegisterClassrooms: 0,
      totalClassrooms: 0,
      totalProjects: 0,
      totalUserSocialTechnologies: 0,
    };
    return cardsData;
  }
};

todo: getInicialPageMatriculatedData

const getInitialPageMatriculatedData = async (ts: number[], dates: Date[]) => {
  if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return null;

  const start = formatDate(dates[0]);
  const end = formatDate(dates[1]);

  try {
    const response = await requestChartMatriculated(start, end, ts ?? []);
    const data: Chart[] = response.data;

    const availableMonths = Array.from(
      new Set(data.map((item) => item.month))
    ).sort((a, b) => a - b);

    const mesInital = dates[0]?.getMonth() ?? 0;
    const mesFinal = dates[1]?.getMonth() ?? 0;

    const labels = dates[0]
      ? getMonthNumber(mesInital, mesFinal)
      : availableMonths.map((m) => month[m]);

    const datasets = [
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
    ];

    return new ChartLinesModel(labels, datasets);
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico de matrículas", error);
    return new ChartLinesModel([], []);
  }
};
todo: getInicialPageStatusClassesData

export const getInitialPageModel = async (ts: number[], dates: any[]) => {
  const [cardsdata, matriculateddata] = await Promise.all([
    getInitialPageCardsData(ts, dates),
    getInitialPageMatriculatedData(ts, dates),
  ]);

  if (matriculateddata) {
    return new InitialPageModel(cardsdata, matriculateddata);
  }
  return new InitialPageModel(cardsdata, new ChartLinesModel([], []));
};
