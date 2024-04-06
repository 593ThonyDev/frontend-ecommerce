import axios, { AxiosResponse } from "axios";
import { ArticleDto } from "./Article";
import { API_URL } from "../../../../../functions/ApiConst";

export const getAllProducts = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: ArticleDto[], totalElements: number }> => {
    try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: ArticleDto[], totalElements: number }> = await axios.get(API_URL + 'blog/public/articles', {
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
