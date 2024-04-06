import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../../../../functions/ApiConst";
import { setToken } from "../../../../../functions/AuthApi";
import { AboutModel } from "./About";
import toast from "react-hot-toast";

export const getDataHero = () => {
    return axios.get(`${API_URL}about/getData`)
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

export const updateData = () => {

}

export const uploadImage = async (file: File, imageKey: "img1" | "img2" | "img3", fetchData: () => void, toast: any) => {

    setToken();
    const formDataToSend = new FormData();
    formDataToSend.append(imageKey, file);

    const promise = axios.patch(`${API_URL}about/updateImage`, formDataToSend).then((response) => {
        return response.data.message;
    }).catch((error) => {
        throw error.response.data.message;
    });

    toast.promise(
        promise,
        {
            loading: 'Actualizando recurso...',
            success: (message: any) => {
                fetchData();
                return message;
            },
            error: (errorMessage: any) => errorMessage,
        },
    );

};

export const updateAbout = async (product: AboutModel): Promise<boolean> => {
    try {

        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("parrafo1", product.paragraph1);
        formDataToSend.append("parrafo2", product.paragraph2);
        formDataToSend.append("parrafo3", product.paragraph3);

        const request = axios.patch(`${API_URL}about/update`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};

const handleResponse = async (promise: Promise<AxiosResponse>): Promise<any> => {
    setToken();
    try {
        const response = await promise;
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al realizar la operación';
        toast.error(errorMessage);
        return false;
    }
};