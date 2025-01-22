import http from "../axios";
import { logout } from "../localstorage";

export const requestChartMatriculated = (startDate: any, endDate:any, socialTech:number[]) => {

  let path = `/chart-bff/chart-matriculated-month`;

  let data = {
    startDate: startDate,
    endDate: endDate,
    socialTech: socialTech
  }
  return http
    .post(path, data)
    .then((response) => response)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });

};

export const requestChartStatusClasses = (startDate: string, endDate:string, socialTech:number[]) => {

  let path = `/chart-bff/chart-status-classes`;
  let data = {
    startDate: startDate,
    endDate: endDate,
    socialTech: socialTech
  }
  return http
    .post(path, data)
    .then((response) => response)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
}

export const requestChartCard = (year: number) => {
  //get
  let path = `/chart-bff/chart-card?year=${year}`;
  return http
    .get(path)
    .then((response) => response)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
}


export const requestChartTSCard = async (startDate: string, endDate:string, socialTech:number[]) => {
  //post
  
  let path = `/chart-bff/chart-ts-card`;
  let data = {
    startDate: startDate,
    endDate: endDate,
    socialTech: socialTech
  }
  return http
    .post(path, data)
    .then((response) => response)
    .catch((err) => {
      if (err.response.status === 401) {
        logout();
        window.location.reload();
      }
      throw err;
    });
}
