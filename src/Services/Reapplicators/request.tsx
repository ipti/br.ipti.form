import http from "../axios";

export const requestReapplicatorsList = async () => {
      return await http
        .get("/user-bff/reapplicators")
        .then((response) => response.data)
        .catch((err) => {
          // if(err.response.status === 401){
          //   logout()
          //   window.location.reload()
          // }
  
          throw err;
        });
  };