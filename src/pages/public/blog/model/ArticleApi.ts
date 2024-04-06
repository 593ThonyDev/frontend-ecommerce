import axios, { AxiosResponse } from "axios";
import { Article, ArticleDto } from "./Article";
import { API_URL } from "../../../../functions/ApiConst";
import { setToken } from "../../../../functions/AuthApi";

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

export const getArticleById = async (id: number): Promise<Article> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}blog/public/article/${id}`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};