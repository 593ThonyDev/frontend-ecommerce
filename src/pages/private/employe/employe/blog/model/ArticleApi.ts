import axios, { AxiosResponse } from "axios";
import { ArticleDto } from "./Article";
import { API_URL } from "../../../../../../functions/ApiConst";
import { setToken } from "../../../../../../functions/AuthApi";

export const getAllArticlesByEmploye = async (idEmploye: string, setIsLoading: (value: boolean) => void): Promise<ArticleDto[]> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<ArticleDto[]> = await axios.get(API_URL + 'blog/public/articles/employe/' + idEmploye);
        setIsLoading(false);
        return response.data;
    } catch (error) {
        setIsLoading(false);
        throw error;
    }
};
