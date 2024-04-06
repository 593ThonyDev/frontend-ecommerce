import toast from "react-hot-toast";
import { setToken } from "../../../../../functions/AuthApi";
import { API_URL } from "../../../../../functions/ApiConst";
import axios, { AxiosResponse } from "axios";
import { Company } from "./Company";

const handleResponse = async (promise: Promise<AxiosResponse>): Promise<boolean> => {
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

export const getCompanyData = async (): Promise<Company> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}company/list`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

export const updateData = async (company: Company): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();

        if (company.name !== undefined) {
            formDataToSend.append("nombre", company.name);
        }
        if (company.email !== undefined) {
            formDataToSend.append("email", company.email);
        }
        if (company.password !== undefined) {
            formDataToSend.append("clave", company.password);
        }
        if (company.port !== undefined) {
            formDataToSend.append("puerto", company.port);
        }
        if (company.host !== undefined) {
            formDataToSend.append("host", company.host);
        }
        if (company.phone !== undefined) {
            formDataToSend.append("telefono", company.phone);
        }
        if (company.address !== undefined) {
            formDataToSend.append("direccion", company.address);
        }
        if (company.facebook !== undefined) {
            formDataToSend.append("facebook", company.facebook);
        }
        if (company.instagram !== undefined) {
            formDataToSend.append("instagram", company.instagram);
        }
        if (company.tiktok !== undefined) {
            formDataToSend.append("tiktok", company.tiktok);
        }
        if (company.whatsapp !== undefined) {
            formDataToSend.append("whatsapp", company.whatsapp);
        }

        const request = axios.patch(`${API_URL}company/update`, formDataToSend);

        return await handleResponse(request);

    } catch (error) {
        return false;
    }
};

export const updateLogo = async (photo: File): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("logo", photo);

        const response = await axios.patch(`${API_URL}company/updateLogo`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al actualizar el logo de la empresa';
        toast.error(errorMessage);
        return false;
    }
};
