import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../../functions/ApiConst';
import { Employe } from './Employe';
import { setToken } from '../../../../../functions/AuthApi';

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

export const saveOrUpdateEmploye = async (employe: Employe, idEmploye?: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        if (idEmploye) {
            formDataToSend.append("idEmpleado", idEmploye);
        }
        formDataToSend.append("nombres", employe.fullName || (employe.names + " " + employe.lastName));
        formDataToSend.append("email", employe.email);
        formDataToSend.append("descripcion", employe.description);
        formDataToSend.append("telefono", employe.phone);
        if (employe.photo) {
            formDataToSend.append("photo", employe.photo);
        }
        const request = idEmploye ? axios.patch(`${API_URL}employe/update`, formDataToSend) :
            axios.post(`${API_URL}employe/save`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};

export const updateEmployePhoto = async (idEmploye: string, photo: File): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idEmpleado", idEmploye);
        formDataToSend.append("photo", photo);

        const response = await axios.patch(`${API_URL}employe/updatePhoto`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al actualizar la foto del empleado';
        toast.error(errorMessage);
        return false;
    }
};

export const getAllEmployes = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Employe[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 0));
        const response: AxiosResponse<{ content: Employe[], totalElements: number }> = await axios.get(API_URL + 'employe/list', {
            params: {
                page: currentPage,
                size: 12
            }
        });
        setIsLoading(false);
        return response.data;
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
};

export const getEmployeById = async (id: number): Promise<Employe> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}employe/${id}`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

export const searchEmpleado = (value: string) => {
    setToken();
    return axios.get(`${API_URL}employe/search/${value}`)
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
