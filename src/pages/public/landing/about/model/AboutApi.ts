import axios from "axios";
import { API_URL } from "../../../../../functions/ApiConst";

export const getDataHero = () => {
    return axios.get(`${API_URL}about/hero`)
        .then((response) => {
            if (response.data == null) {
                return null;
            } else if (response.status == 204) {
                return null;
            } else {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
};