import axios, { AxiosResponse } from 'axios';
import { API_URL } from '../../../../../functions/ApiConst';
import { Category } from './Category';
import { setToken } from '../../../../../functions/AuthApi';


export const getAllCategories = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Category[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Category[], totalElements: number }> = await axios.get(API_URL + 'category/public/list', {
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


export const searchCategoryProduct = (value: string) => {
    if (!value.trim()) {
        return null;
    }
    
    setToken();
    return axios.get(`${API_URL}category/search/${value}`)
        .then((response) => {
            if (response.data && response.data.length > 0) {
                return response.data.map((category: any) => ({
                    idCategory: category.idCategory.toString(),
                    categoryName: category.name || ''
                }));
            } else {
                return null;
            }
        })
        .catch((error) => {
            throw error;
        });
};