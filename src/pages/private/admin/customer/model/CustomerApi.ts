import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { API_URL } from '../../../../../functions/ApiConst';
import { Customer } from './Customer';
import { setToken } from '../../../../../functions/AuthApi';


export const getAllCustomers = async (currentPage: number, setIsLoading: (value: boolean) => void): Promise<{ content: Customer[], totalElements: number }> => {
    try {
        setToken();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const response: AxiosResponse<{ content: Customer[], totalElements: number }> = await axios.get(API_URL + 'customer/list', {
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

export const getCustomerById = async (id: number): Promise<Customer> => {
    try {
        setToken();
        const response = await axios.get(`${API_URL}customer/${id}`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

export const searchCustomer = (value: string) => {
    setToken();
    return axios.get(`${API_URL}customer/search/${value}`)
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


export const saveOrUpdateCustomer = async (customer: Customer, idCustomer?: string): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();


        if (idCustomer) {
            formDataToSend.append("idCliente", idCustomer);
        }
        formDataToSend.append("nombres", customer.fullName || (customer.names + " " + customer.lastName));
        formDataToSend.append("email", customer.email);
        formDataToSend.append("direccion", customer.address);
        formDataToSend.append("telefono", customer.phone);
        formDataToSend.append("pais", customer.country);
        formDataToSend.append("codigoPostal", customer.zip);

        const request = idCustomer ? axios.patch(`${API_URL}customer/update`, formDataToSend) :
            axios.post(`${API_URL}customer/save`, formDataToSend);

        return await handleResponse(request);
    } catch (error) {
        console.log("Error al crear al cliente! " + error);
        return false;
    }
};

export const updateCustomerPhoto = async (idCustomer: string, photo: File): Promise<boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idCliente", idCustomer);
        formDataToSend.append("photo", photo);

        const response = await axios.patch(`${API_URL}customer/updatePhoto`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al actualizar la foto del cliente';
        toast.error(errorMessage);
        return false;
    }
};