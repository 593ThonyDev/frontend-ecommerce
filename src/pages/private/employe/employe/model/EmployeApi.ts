import axios from 'axios';
import { API_URL } from '../../../../../functions/ApiConst';
import { Employe } from './Employe';
import { setToken } from '../../../../../functions/AuthApi';

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
