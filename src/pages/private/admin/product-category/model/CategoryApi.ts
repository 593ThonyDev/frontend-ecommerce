import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../../functions/ApiConst';
import { Category } from './Category';
import { setToken } from '../../../../../functions/AuthApi';


export const getAllCategories = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Category[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Category[], totalElements: number }> = await axios.get(API_URL + 'category/list', {
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

export const getProductCategoryById = async (id: number): Promise<Category> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}category/${id}`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

export const searchCategoryProduct = (value: string) => {
    setToken();
    return axios.get(`${API_URL}category/search/${value}`)
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

const handleResponse = async (promise: Promise<AxiosResponse>): Promise<any> => {
    try {
        setToken();
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


export const saveOrUpdateProductCategory = async (category: Category, idCategory?: string): Promise<boolean> => {
    try {
        setToken();
        const form = new FormData();
        idCategory && form.append("idCategoria", idCategory);
        category.name && form.append("nombre", category.name);
        category.img && form.append("photo", category.img);

        const request = idCategory
            ? axios.patch(`${API_URL}category/update`, form)
            : axios.post(`${API_URL}category/save`, form);

        return await handleResponse(request);

    } catch (error) {
        return false;
    }
};

