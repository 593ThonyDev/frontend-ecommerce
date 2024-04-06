import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../../../functions/ApiConst";
import { createOrder } from "../cart/model/CartApi";
import { setToken } from "../../../functions/AuthApi";

export const updateOrderStatus = async (idCustomer: string, orderCode: string): Promise<Boolean> => {
    try {
        setToken();
        const formDataToSend = new FormData();
        formDataToSend.append("idCustomer", idCustomer);
        const response = await axios.patch(`${API_URL}order/updateStatus/${orderCode}`, formDataToSend);
        const message = response.data.message;
        toast.success(message);
        await createOrder(idCustomer);
        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al cambiar ';
        toast.error(errorMessage);
        return false;
    }
};