import axios, { AxiosResponse } from "axios";
import { setToken } from "../../../../../functions/AuthApi";
import { API_URL } from "../../../../../functions/ApiConst";
import { Article, ArticleDto, ArticleRequest } from "./Article";
import toast from "react-hot-toast";

export const getAllArticles = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: ArticleDto[], totalElements: number }> => {
    try {
        setToken();
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

export const saveArticle = async (article: ArticleRequest): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        if (
            article.employe &&
            article.img1 &&
            article.img2 &&
            article.img3 &&
            article.img4 &&
            article.img5 &&
            article.img6
        ) {
            formDataToSend.append("employe", article.employe);
            formDataToSend.append("title", article.title);
            formDataToSend.append("category", article.category);
            formDataToSend.append("description", article.description);
            formDataToSend.append("paragraph1", article.paragraph1);
            formDataToSend.append("paragraph2", article.paragraph2);
            formDataToSend.append("paragraph3", article.paragraph3);
            formDataToSend.append("paragraph4", article.paragraph4);
            formDataToSend.append("paragraph5", article.paragraph5);
            formDataToSend.append("paragraph6", article.paragraph6);

            // Verifica si la imagen de la portada está definida antes de agregarla
            if (article.portada) {
                formDataToSend.append("portada", article.portada);
            }

            // Verifica si las imágenes de los párrafos están definidas antes de agregarlas
            if (article.img1) {
                formDataToSend.append("img1", article.img1);
            }
            if (article.img2) {
                formDataToSend.append("img2", article.img2);
            }
            if (article.img3) {
                formDataToSend.append("img3", article.img3);
            }
            if (article.img4) {
                formDataToSend.append("img4", article.img4);
            }
            if (article.img5) {
                formDataToSend.append("img5", article.img5);
            }
            if (article.img6) {
                formDataToSend.append("img6", article.img6);
            }
        }

        const request = axios.post(`${API_URL}blog/save`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};

export const updateArticle = async (article: ArticleRequest, idArticle: string): Promise<boolean> => {
    try {
        const formDataToSend = new FormData();

        formDataToSend.append("idArticle", idArticle);
        formDataToSend.append("title", article.title);
        formDataToSend.append("category", article.category);
        formDataToSend.append("description", article.description);
        formDataToSend.append("paragraph1", article.paragraph1);
        formDataToSend.append("paragraph2", article.paragraph2);
        formDataToSend.append("paragraph3", article.paragraph3);
        formDataToSend.append("paragraph4", article.paragraph4);
        formDataToSend.append("paragraph5", article.paragraph5);
        formDataToSend.append("paragraph6", article.paragraph6);

        const request = axios.patch(`${API_URL}blog/update`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};


const handleResponse = async (promise: Promise<AxiosResponse>): Promise<any> => {
    setToken();
    try {
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

export const disableArticleStatusById = async (idArticle: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idArticle", idArticle);
        const response = await axios.patch(`${API_URL}blog/dissableArticle`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};

export const enabbleArticleStatusById = async (idArticle: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idArticle", idArticle);
        const response = await axios.patch(`${API_URL}blog/enableArticle`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};

export const uploadImage = async (id: string | undefined, file: File, imageKey: "portada" | "img1" | "img2" | "img3" | "img4" | "img5" | "img6", fetchData: () => void, toast: any) => {
    setToken();
    if (id !== undefined) {
        const formDataToSend = new FormData();
        formDataToSend.append("idArticle", id);
        formDataToSend.append(imageKey, file);

        const promise = axios.patch(`${API_URL}blog/updateImage`, formDataToSend).then((response) => {
            return response.data.message;
        }).catch((error) => {
            throw error.response.data.message;
        });
        toast.promise(
            promise,
            {
                loading: 'Actualizando recurso...',
                success: (message: any) => {
                    fetchData();
                    return message;
                },
                error: (errorMessage: any) => errorMessage,
            },
        );
    }
};