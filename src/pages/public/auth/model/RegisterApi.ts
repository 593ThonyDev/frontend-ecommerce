import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../../functions/ApiConst";
import { RegisterModel } from "./RegisterModel";

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


export const signIn = async (customerUser: RegisterModel): Promise<boolean> => {
    try {
        const formDataToSend = new FormData();
        formDataToSend.append("name", customerUser.name)
        formDataToSend.append("lastName", customerUser.lastName)
        formDataToSend.append("email", customerUser.email)
        formDataToSend.append("phone", customerUser.phone)
        formDataToSend.append("country", customerUser.country)
        formDataToSend.append("zipCode", customerUser.zip)
        formDataToSend.append("address", customerUser.address)
        const request = axios.post(`${API_URL}auth/sign-in`, formDataToSend);
        return await handleResponse(request);
    } catch (error) {
        console.log("Error al crear al cliente! " + error);
        return false;
    }
};