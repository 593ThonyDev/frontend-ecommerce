import { API_URL } from '../../../../../functions/ApiConst';
import axios, { AxiosResponse } from 'axios';
import { Product } from './Product';
import toast from 'react-hot-toast';
import { getCustomerOrEmploye, setToken } from '../../../../../functions/AuthApi';

export const getAllProducts = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Product[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Product[], totalElements: number }> = await axios.get(API_URL + 'product/list', {
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
    return axios.get(`${API_URL}product/search/${value}`)
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

export const saveProduct = async (product: Product): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", product.name);
        formDataToSend.append("descripcion", product.description);
        formDataToSend.append("precio", product.price.toString());
        formDataToSend.append("stock", product.stock.toString());

        if (product.Category?.idCategory) {
            formDataToSend.append("categoria", product.Category.idCategory?.toString());
        }

        if (product.created) {
            formDataToSend.append("empleado", product.created.toString());
        }

        if (product.img1) {
            formDataToSend.append("img1", product.img1);
        }

        if (product.img2) {
            formDataToSend.append("img2", product.img2);
        }

        if (product.img3) {
            formDataToSend.append("img3", product.img3);
        }

        if (getCustomerOrEmploye()) {
            const employe = getCustomerOrEmploye()?.toString();
            if (employe) {
                formDataToSend.append("empleado", employe);
            }
        }

        const request = axios.post(`${API_URL}product/save`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};

export const updateProduct = async (product: Product): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("nombre", product.name);
        formDataToSend.append("descripcion", product.description);
        formDataToSend.append("precio", product.price.toString());
        formDataToSend.append("stock", product.stock.toString());

        if (product.idProduct) {
            formDataToSend.append("idProducto", product.idProduct.toString());
        }

        if (product.Category?.idCategory) {
            formDataToSend.append("categoria", product.Category.idCategory?.toString());
        }

        if (product.created) {
            formDataToSend.append("empleado", product.created.toString());
        }

        const request = axios.patch(`${API_URL}product/update`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        return false;
    }
};

export const disableProductStatusById = async (idUser: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idProducto", idUser);
        const response = await axios.patch(`${API_URL}product/disableStatus`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};

export const enabbleProductStatusById = async (idUser: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idProducto", idUser);
        const response = await axios.patch(`${API_URL}product/enableStatus`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};

export const uploadImage = async (id: string | undefined, file: File, imageKey: "img1" | "img2" | "img3", fetchData: () => void, toast: any) => {
    setToken();
    if (id !== undefined) {
      const formDataToSend = new FormData();
      formDataToSend.append("idProducto", id);
      formDataToSend.append(imageKey, file);
  
      const promise = axios.patch(`${API_URL}product/updateImage`, formDataToSend).then((response) => {
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