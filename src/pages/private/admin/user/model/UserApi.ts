import axios, { AxiosResponse } from "axios";
import { User } from "./User";
import { API_URL } from "../../../../../functions/ApiConst";
import toast from "react-hot-toast";
import { setToken } from "../../../../../functions/AuthApi";

export const getAllUsers = async (setIsLoading: (value: boolean) => void): Promise<User[]> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: User[] }> = await axios.get(API_URL + 'user/list');
        setIsLoading(false);
        return response.data.content;
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
};

export const getUserById = async (id: number): Promise<User> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}user/${id}`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

export const restorePasswordById = async (idUser: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idUsuario", idUser);

        const response = await axios.patch(`${API_URL}user/restorePassword`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al restaurar la contraseña';
        toast.error(errorMessage);
        return false;
    }
};

export const updateRoleById = async (idUser: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idUsuario", idUser);
        const response = await axios.patch(`${API_URL}user/updateRole`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al restaurar la contraseña';
        toast.error(errorMessage);
        return false;
    }
};

export const updateStatusById = async (idUser: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idUsuario", idUser);
        const response = await axios.patch(`${API_URL}user/updateStatus`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};

export const searchUser = (value: string) => {
    setToken();
    return axios.get(`${API_URL}user/search/${value}`)
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