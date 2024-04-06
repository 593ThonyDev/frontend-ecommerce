import { API_URL } from '../../../../../functions/ApiConst';
import axios, { AxiosResponse } from 'axios';
import { Product } from './Product';
import { setToken } from '../../../../../functions/AuthApi';

export const getAllProducts = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Product[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Product[], totalElements: number }> = await axios.get(API_URL + 'product/public/list', {
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

export const searchProduct = (value: string) => {
    setToken();
    return axios.get(`${API_URL}product/public/search/${value}`)
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

