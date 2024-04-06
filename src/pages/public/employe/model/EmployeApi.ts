import axios, { AxiosResponse } from 'axios';
import { Employe } from './Employe';
import { API_URL } from '../../../../functions/ApiConst';
import { setToken } from '../../../../functions/AuthApi';


export const getAllEmployes = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Employe[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Employe[], totalElements: number }> = await axios.get(API_URL + 'employe/public/list', {
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
        const response = await axios.get(`${API_URL}employe/public/${id}`);
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
