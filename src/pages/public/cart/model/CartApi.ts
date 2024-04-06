import axios from "axios";
import { API_URL } from "../../../../functions/ApiConst";
import toast from "react-hot-toast";
import { setToken } from "../../../../functions/AuthApi";

export const createOrder = (idCustomer: string) => {

    setToken();
    return axios.post(`${API_URL}order/create/${idCustomer}`)
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

export const addProduct = async (orderCode: string, idProduct: string): Promise<Boolean> => {

    setToken();
    try {
        setToken();
        const formDataToSend = new FormData();

        formDataToSend.append("orderCode", orderCode);
        formDataToSend.append("idProduct", idProduct);

        const response = await axios.post(`${API_URL}order/addProduct`, formDataToSend)
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};

export const updateProduct = (orderCode: string, idProduct: string, quantity: string) => {
    setToken();

    const formDataToSend = new FormData();

    formDataToSend.append("orderCode", orderCode);
    formDataToSend.append("idProduct", idProduct);
    formDataToSend.append("quantity", quantity);

    return axios.post(`${API_URL}order/updateProduct`, formDataToSend)
        .then((response) => {
            if (response.data == null) {
                return null;
            } else {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
};

export const deleteProduct = (orderCode: string, idProduct: string) => {

    setToken();
    const formDataToSend = new FormData();

    formDataToSend.append("orderCode", orderCode);
    formDataToSend.append("idProduct", idProduct);

    return axios.post(`${API_URL}order/deleteProduct`, formDataToSend)
        .then((response) => {
            if (response.data == null) {
                return null;
            } else {
                return response.data;
            }
        })
        .catch((error) => {
            throw error;
        });
};

export const getOrder = (idCustomer: string, orderCode: string) => {

    setToken();
    return axios.get(`${API_URL}order/getOrder/${idCustomer}/${orderCode}`)
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

export const checkStatusOrder = (idCustomer: string, orderCode: string) => {
    setToken();
    return axios.get(`${API_URL}order/check-list/${idCustomer}/${orderCode}`)
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