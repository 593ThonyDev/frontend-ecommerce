import { saveToken, setCustomerOrEmploye, setFullName, setIdUser, setPhotoProfile, setUserName } from "../../../../functions/AuthApi";
import { PATH_ADMIN_HOME } from "../../../../routes/private/admin/PrivatePaths";
import { PATH_PRODUCTOS } from "../../../../routes/public/Paths";
import { API_URL } from "../../../../functions/ApiConst";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { PATH_EMPLOYE_HOME } from "../../../../routes/private/employe/PrivatePathsEmploye";

export const AuthByUsernamePassword = async (user: LoginResponse, navigate: NavigateFunction): Promise<boolean> => {
    try {

        const formDataToSend = new FormData();

        if (!user.username || !user.password) {
            toast.error("Debe proporcionar un nombre de usuario y una contraseña");
            return false;
        }

        formDataToSend.append("username", user.username);
        formDataToSend.append("password", user.password);

        const response = await axios.post(`${API_URL}auth/login`, formDataToSend);
        const responseData = response.data;

        if (responseData.userDetails) {
            const userDetails = responseData.userDetails;
            user.userDetails = userDetails;

            if (user.userDetails?.role === "ADMINISTRATOR") {

                if (user.userDetails?.idEmploye) {
                    setCustomerOrEmploye(user.userDetails?.idEmploye.toString())
                }

                if (user.userDetails?.fullName) {
                    setFullName(user.userDetails?.fullName)
                }

                if (user.userDetails?.idUser) {
                    setIdUser(user.userDetails?.idUser.toString())
                }

                if (user.userDetails?.photo) {
                    setPhotoProfile(user.userDetails?.photo)
                }

                if (user.userDetails?.username) {
                    setUserName(user.userDetails?.username)
                }

                if (responseData.token) {
                    saveToken(responseData.token);
                }
                navigate(PATH_ADMIN_HOME);

            } 

            else if ( user.userDetails?.role === "EMPLOYE") {

                if (user.userDetails?.idEmploye) {
                    setCustomerOrEmploye(user.userDetails?.idEmploye.toString())
                }

                if (user.userDetails?.fullName) {
                    setFullName(user.userDetails?.fullName)
                }

                if (user.userDetails?.idUser) {
                    setIdUser(user.userDetails?.idUser.toString())
                }

                if (user.userDetails?.photo) {
                    setPhotoProfile(user.userDetails?.photo)
                }

                if (user.userDetails?.username) {
                    setUserName(user.userDetails?.username)
                }

                if (responseData.token) {
                    saveToken(responseData.token);
                }
                navigate(PATH_EMPLOYE_HOME);

            } 
            
            else if (user.userDetails?.role === "CUSTOMER") {

                if (user.userDetails?.idCustomer) {
                    setCustomerOrEmploye(user.userDetails?.idCustomer.toString())
                }

                if (user.userDetails?.fullName) {
                    setFullName(user.userDetails?.fullName)
                }

                if (user.userDetails?.idUser) {
                    setIdUser(user.userDetails?.idUser.toString())
                }

                if (user.userDetails?.username) {
                    setUserName(user.userDetails?.username)
                }

                if (user.userDetails?.photo) {
                    setPhotoProfile(user.userDetails?.photo)
                }

                if (responseData.token) {
                    saveToken(responseData.token);
                }
                navigate(PATH_PRODUCTOS);
            }

        } else {
            return false;
        }

        return true;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error al realizar la operación';
        toast.error(errorMessage);
        return false;
    }
};
