import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../../../functions/ApiConst";
import toast from "react-hot-toast";

export const restorePassword = async (customerUser: string): Promise<boolean> => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("username", customerUser)
        const request = axios.post(`${API_URL}auth/restorePassword`, formDataToSend);
        return await handleResponse(request);
    } catch (error) {
        console.log("Error al crear al cliente! " + error);
        return false;
    }
};

const handleResponse = async (promise: Promise<AxiosResponse>): Promise<any> => {
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
