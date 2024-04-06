import axios, { AxiosResponse } from 'axios';
import { Category } from './Category';
import { API_URL } from '../../../../functions/ApiConst';


export const getAllCategories = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Category[], totalElements: number }> => {
    try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Category[], totalElements: number }> = await axios.get(API_URL + 'category/public/list', {
            params: {
                page: currentPage,
                size: 100
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
    
    return axios.get(`${API_URL}category/search/${value}`)
        .then((response) => {
            if (response.data && response.data.length > 0) {
                return response.data.map((category: any) => ({
                    idCategory: category.idCategory.toString(),
                    categoryName: category.name || ''
                }));
            } else {
                return null; // Si no hay resultados, devolvemos null
            }
        })
        .catch((error) => {
            throw error;
        });
};