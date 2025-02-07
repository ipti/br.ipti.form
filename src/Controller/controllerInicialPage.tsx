import { InitialPageModel } from "../Pages/InitialPage/initialPageModel";
import {
  requestChartCard,
  requestChartMatriculated,
  requestChartTSCard,
} from "../Services/Chart/request";
import { getYear } from "../Services/localstorage";


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

//todo: getInicialPageMatriculatedData

const getInicialPageStatusClassesData = async (ts: number[], dates: any[]) => {
  const start = formatDate(dates[0]);
  const end = formatDate(dates[1]);

  try {
    const response = await requestChartMatriculated(start, end, ts);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do gráfico:", error);
    return [];
  }
}


//todo: getInicialPageStatusClassesData

export const getInitialPageModel = async (ts: number[], dates: any[]) => {
  const cardsData = await getInitialPageCardsData(ts, dates);
  return new InitialPageModel(cardsData);
};
