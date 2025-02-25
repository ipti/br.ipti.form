import http from "../axios";
import { logout } from "../localstorage";

export const requestState = () => {
    let path = "/state";
    return http
        .get(path)
        .then((response) => response.data)
        .catch((err) => {
            if (err.response.status === 401) {
                logout();
                window.location.reload();
            }
            throw err;
        });

};

export const requestCity = (state_id?: number) => {
    if (state_id) {
        let path = "/city?state_fk=" + state_id;
        return http
            .get(path)
            .then((response) => response.data)
            .catch((err) => {
                if (err.response.status === 401) {
                    logout();
                    window.location.reload();
                }
                throw err;
            });
    }
};