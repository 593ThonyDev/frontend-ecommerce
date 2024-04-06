import { useEffect, useState } from "react";
import { User } from "./model/User";
import { getAllUsers } from "./model/UserApi";
import { Link } from "react-router-dom";
import { PATH_USER_ADMIN_VIEW_ID } from "../../../../routes/private/admin/PrivatePaths";
import LoaderList from "./components/LoaderList";
import userImg from "../../../../assets/cliente.png"
import NotFoundAdmin from "../../../error/NotFoundAdmin";

const UserList = () => {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                setIsLoading(true);
                const users = await getAllUsers(setIsLoading);
                setData(users);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
                if (error instanceof Error) {
                    setErrorMessage(error.message.toString().toUpperCase());
                } else {
                    setErrorMessage('Error en la solicitud. Por favor, inténtalo de nuevo más tarde');
                }
            }
        };
        fetchDataAndSetState();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="grid lg:grid-cols-2 gap-2 w-full">
                    {[...Array(10)].map((_, index) => (
                        <LoaderList key={index} />
                    ))}
                </div>
            ) : (
                <div className="w-full">
                    <div className="grid lg:grid-cols-2 gap-2 w-full">
                        {data && data.length > 0 ? data.map((user) => (
                            <Link
                                to={PATH_USER_ADMIN_VIEW_ID + user.iduser + "/" + user.role?.toLowerCase() + "/" + user.id + "/" + user.fullname?.replace(/\s+/g, '-')}
                                className="flex h-fit items-start justify-between cursor-pointer bg-white hover:rounded-xl rounded-xl"
                                key={user.id}
                            >
                                <div className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-black-50/50">
                                    <div className="relative h-16 max-h-16 w-16 items-start justify-start rounded-full">
                                        <img src={user.photo ? "https://" + user.photo : userImg} className="h-16 max-h-16 max-w-16 w-16 rounded-full border border-primary-100 bg-primary-100" alt="user" />
                                    </div>
                                    <div className="lg:flex lg:justify-between grid w-full">
                                        <div className="grid">
                                            <h5 className="uppercase line-clamp-1 text-base font-bold text-black-700 dark:text-white">
                                                {user.fullname}
                                            </h5>
                                            <div className="flex overflow-ellipsis line-clamp-1">
                                                <span className="text-black-700 font-bold pr-1">Email:</span>
                                                <span className="text-black-500 line-clamp-1">{user.username}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-black-700 font-bold pr-1 line-clamp-1">Role:</span>
                                                <span className="text-black-500 line-clamp-1">{user.role == "CUSTOMER" ? "Cliente" : user.role == "EMPLOYE" ? "Empleado" : "Administrador"}</span>
                                            </div>
                                            <div className="flex">
                                                <span className="text-black-700 font-bold pr-1">Estado:</span>
                                                <span className={` font-semibold ${user.status == "ONLINE" ? "text-success-500" :
                                                    user.status == "UPDATE_PASS" ? "text-warning-400" :
                                                        "text-danger-400"}`}>
                                                    {user.status == "UPDATE_PASS" ? "Actualizar clave  " : user.status?.toLowerCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )) : <NotFoundAdmin message="No existen registros" error="201" />}
                    </div>
                    {isError && (
                        <div className="flex flex-col max-h-max lg:py-36 py-16 lg:px-16 justify-center bg-white rounded-2xl">
                            <div className="text-9xl text-center">🔊</div>
                            <br />
                            <div className="text-3xl text-center lg:px-16 text-red-500">{errorMessage}</div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default UserList;
