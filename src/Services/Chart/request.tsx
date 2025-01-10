import http from "../axios";
import { logout } from "../localstorage";

export const requestChartMatriculated = (startDate: any, endDate:any, ts:number) => {

  let path = `/chart-bff/chart-matriculated-month?startDate=${startDate}&endDate=${endDate}&ts=${ts}`;

    if (startDate && endDate) {
        return http.get(`/chart-bff/chart-matriculated-month?startDate=${startDate}&endDate=${endDate}&ts=${ts}`)
        .then((response) => response)
          .catch((err) => {
            if (err.response.status === 401) {
              logout();
              window.location.reload();
            }
            throw err;
          });
      } else {

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


  