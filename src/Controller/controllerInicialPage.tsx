import { InitialPageModel } from "../Pages/InitialPage/initialPageModel";
import {
  requestChartCard,
  requestChartTSCard,
} from "../Services/Chart/request";
import { getYear } from "../Services/localstorage";

export const getInitialPageCardsData = () => {
  //   if (!dates || dates.length < 2 || !dates[0] || !dates[1]) return;

  //   const start = formatDate(dates[0]);
  //   const end = formatDate(dates[1]);

  //   try {
  //     let response;
  //     if (ts && ts.length > 0) {
  //       response = await requestChartTSCard(start, end, ts);
  //     } else {
  //       const year = new Date().getFullYear();
  //       response = await requestChartCard(parseInt(getYear() ?? year.toString()));
  //     }
  //     return response.data;
  //   } catch (error) {
  //     console.error("Erro ao buscar dados do gráfico:", error);
  //   } finally {
  //   }

  const cardsData = {
    totalMeetings: 10,
    approvedRegisterClassrooms: 10,
    totalRegisterClassrooms: 10,
    totalClassrooms: 10,
    totalProjects: 10,
    totalUserSocialTechnologies: 10,
  };
  return cardsData;
};

export const getInitialPageModel = () => {
  const cardsData = getInitialPageCardsData();
  return new InitialPageModel(cardsData);
};
