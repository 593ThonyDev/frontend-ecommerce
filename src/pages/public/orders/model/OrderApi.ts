import { API_URL } from "../../../../functions/ApiConst";
import axios from "axios";
import { setToken } from "../../../../functions/AuthApi";

export const getOrderListCustomer = (idCustomer: string) => {
    setToken();
    return axios.get(`${API_URL}order/list/${idCustomer}`)
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