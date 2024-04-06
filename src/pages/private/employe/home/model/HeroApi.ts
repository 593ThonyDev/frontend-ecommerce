import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../../../../functions/ApiConst";
import { setToken } from "../../../../../functions/AuthApi";
import { HeroModel } from "./HeroModel";
import toast from "react-hot-toast";

export const uploadImage = async (file: File, imageKey: "img1" | "img2" | "img3", fetchData: () => void, toast: any) => {
    setToken();
    const formDataToSend = new FormData();
    formDataToSend.append(imageKey, file);

    const promise = axios.patch(`${API_URL}hero/updateImage`, formDataToSend).then((response) => {
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

export const getData = async (): Promise<HeroModel> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}hero/getData`);
        return response.data.content;
    } catch (error) {
        throw error;
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

export const updateHero = async (product: HeroModel): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("slogan", product.slogan);
        formDataToSend.append("description", product.description);        
        const request = axios.patch(`${API_URL}hero/update`, formDataToSend);
        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};