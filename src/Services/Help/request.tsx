import http from "../axios";

export const requestHelp = async () => {
      return await http
        .get("/help")
        .then((response) => response.data)
        .catch((err) => {
          // if(err.response.status === 401){
          //   logout()
          //   window.location.reload()
          // }
          throw err;
        });
    
  };