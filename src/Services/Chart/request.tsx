import http from "../axios";
import { logout } from "../localstorage";

export const requestChartMatriculated = (startDate: any, endDate:any) => {

  let path = `/chart-bff/chart-matriculated-month?startDate=${startDate}&endDate=${endDate}`;

    if (startDate && endDate) {
        return http.get(`/chart-bff/chart-matriculated-month?startDate=${startDate}&endDate=${endDate}`)
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


export const requestChartMeetingFrequency = (socialTechnologyId:any, startDate: any, endDate:any) => {
  let path = `/chart-bff/chart-meeting-frequency?socialTechnologyId=${socialTechnologyId}&startDate=${startDate}&endDate=${endDate}`;

  if (socialTechnologyId && startDate && endDate) {
    return http.get(`/chart-bff/chart-meeting-frequency?socialTechnologyId=${socialTechnologyId}&startDate=${startDate}&endDate=${endDate}`)
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