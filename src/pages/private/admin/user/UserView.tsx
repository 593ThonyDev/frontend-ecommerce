import { PATH_CLIENTE_ADMIN_EDIT_ID, PATH_EMPLEADO_ADMIN_ID, PATH_USERS_ADMIN } from "../../../../routes/private/admin/PrivatePaths";
import DropdownItem, { Dropdown } from "../../../../components/dropdown/DropDownOptions";
import { getUserById, restorePasswordById, updateRoleById, updateStatusById, } from "./model/UserApi";
import SytyleBackgroundView from "./components/SytyleBackgroundView";
import { getCustomerById } from "../customer/model/CustomerApi";
import { getEmployeById } from "../employe/model/EmployeApi";
import { formatDate } from "../../../../functions/Funtions";
import customerPhoto from "../../../../assets/cliente.png"
import NotFoundAdmin from "../../../error/NotFoundAdmin";
import { Customer } from "../customer/model/Customer";
import { LoaderView } from "./components/LoaderView";
import { Employe } from "../employe/model/Employe";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { User } from "./model/User";
const UserView = () => {

    const { iduser, id, role, fullname } = useParams<{ iduser: string; id: string; role: string; fullname?: string }>();
    const parsedIdUser = iduser ? parseInt(iduser) : 0;
    const parsedId = id ? parseInt(id) : 0;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [employe, setEmploye] = useState<Employe | null>(null);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (role && ["CUSTOMER", "EMPLOYE", "ADMINISTRATOR"].includes(role.toUpperCase())) {
            fetchDataAndSetState();
        } else {
            setError("El rol del usuario no es válido");
            setLoading(false);
        }

    }, [parsedIdUser, parsedId, role, fullname]);

    const fetchDataAndSetState = async () => {
        try {
            setLoading(true);
            const userData = await getUserById(parsedIdUser);
            setUser(userData);
            setTimeout(async () => {
                setLoading(false);
                if (userData.role === "CUSTOMER") {
                    const customerData = await getCustomerById(parsedId);
                    setCustomer(customerData);
                    if (customerData.fullName?.replace(/\s+/g, '-') !== fullname || customerData.idCustomer !== parsedId) {
                        setError("El nombre o el ID no coinciden con los proporcionados");
                    }
                } else if (userData.role === "EMPLOYE" || userData.role === "ADMINISTRATOR") {
                    const employeData = await getEmployeById(parsedId);
                    setEmploye(employeData);
                    if (employeData.fullName?.replace(/\s+/g, '-') !== fullname || employeData.idEmploye !== parsedId) {
                        setError("El nombre o el ID no coinciden con los proporcionados");
                    }
                } else {
                    setError("El rol del usuario no es reconocido");
                }
            }, 1000);
        } catch (error) {
            setError("Registro no encontrado");
            setLoading(false);
        }
    };

    const restorePassword = async () => {
        try {
            await restorePasswordById(parsedIdUser.toString());
        } catch (error) {
            console.error('Error al llamar a la función restorePassword:', error);
        }
    };

    const updateUserRole = async () => {
        await updateRoleById(parsedIdUser.toString());
        fetchDataAndSetState();
    };

    const updateUserStatus = async () => {
        await updateStatusById(parsedIdUser.toString());
        fetchDataAndSetState();
    };


    return (
        <div>
            {loading ? (
                <LoaderView />
            ) : (
                <div>
                    {error ? (
                        <NotFoundAdmin error='404'
                            message={error}
                            link={PATH_USERS_ADMIN}
                        />
                    ) : (
                        <>
                            {user?.role?.toLowerCase() === "customer" && customer && (
                                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto md:px-6 lg:pt-16 pt-10">
                                    <div className="flex flex-wrap">
                                        <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                                            <div className="grid justify-center">
                                                <div className="flex items-center justify-center">
                                                    <img src={customer.photo ? "https://" + customer.photo : customerPhoto} alt=""
                                                        className="relative z-40 object-cover rounded-full h-80 w-80 lg:h-96 lg:w-96 bg-primary-100" />
                                                </div>
                                            </div>
                                            <SytyleBackgroundView />
                                        </div>
                                        <div className="w-full px-4 mb-10 md:w-1/2 lg:mb-0 ">
                                            <div className="flex justify-between">
                                                <div className="grid">
                                                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl uppercase">
                                                        Datos del cliente
                                                    </h2>
                                                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded">
                                                        <div className="flex-1 h-2 bg-primary-200">
                                                        </div>
                                                        <div className="flex-1 h-2 bg-primary-400">
                                                        </div>
                                                        <div className="flex-1 h-2 bg-primary-300">
                                                        </div>
                                                    </div>
                                                </div>
                                                <Dropdown label={'•••'}>
                                                    <DropdownItem text={'Editar cliente'} path={PATH_CLIENTE_ADMIN_EDIT_ID + customer.idCustomer + "/" + customer.fullName?.replace(/\s+/g, '-')} />
                                                    <DropdownItem text={'Restaurar contraseña'} onClick={restorePassword} />
                                                    <DropdownItem
                                                        text={
                                                            user.estado === "ONLINE" || user.estado === "UPDATE_PASS"
                                                                ? "Bloquear usuario"
                                                                : "Activar usuario"
                                                        }
                                                        onClick={updateUserStatus}
                                                    />

                                                </Dropdown>
                                            </div>
                                            <ul className="mb-10">
                                                <div className='grid lg:grid-cols-2'>
                                                    <li className="flex mb-4 text-base text-black-800">
                                                        <span className="mr-3 text-primary-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                        </span>
                                                        <div className="grid">
                                                            <span className="text-black-500 text-lg font-semibold">Nombres:</span>
                                                            <h3 className="text-black-700">{customer.fullName}</h3>
                                                        </div>
                                                    </li>
                                                    <li className="flex mb-4 text-base text-black-800">
                                                        <span className="mr-3 text-primary-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                        </span>
                                                        <div className="grid">
                                                            <span className="text-black-500 text-lg font-semibold">Se unio el:</span>
                                                            <h3 className="text-black-700">{formatDate(customer?.created)}</h3>
                                                        </div>
                                                    </li>
                                                </div>
                                                <div className='grid lg:grid-cols-2'>
                                                    <li className="flex mb-4 text-base text-black-800">
                                                        <span className="mr-3 text-primary-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                        </span>
                                                        <div className="grid">
                                                            <span className="text-black-500 text-lg font-semibold">Telefono:</span>
                                                            <h3 className="text-black-700">{customer.phone}</h3>
                                                        </div>
                                                    </li>
                                                    <li className="flex mb-4 text-base text-black-800">
                                                        <span className="mr-3 text-primary-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                        </span>
                                                        <div className="grid">
                                                            <span className="text-black-500 text-lg font-semibold">Email:</span>
                                                            <h3 className="text-black-700">{customer.email}</h3>
                                                        </div>
                                                    </li>
                                                </div>
                                                <div className='grid lg:grid-cols-2'>
                                                    <li className="flex mb-4 text-base text-black-800">
                                                        <span className="mr-3 text-primary-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                        </span>
                                                        <div className="grid">
                                                            <span className="text-black-500 text-lg font-semibold">Pais:</span>
                                                            <h3 className="text-black-700">{customer.country}</h3>
                                                        </div>
                                                    </li>
                                                    <li className="flex mb-4 text-base text-black-800">
                                                        <span className="mr-3 text-primary-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                                <path
                                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                            </svg>
                                                        </span>
                                                        <div className="grid">
                                                            <span className="text-black-500 text-lg font-semibold">Estado:</span>
                                                            <span className={` mx-auto font-semibold ${user.estado == "ONLINE" ? "text-success-500" :
                                                                user.estado == "UPDATE_PASS" ? "text-warning-400" :
                                                                    "text-danger-400"}`}>
                                                                {user.estado == "UPDATE_PASS" ? "ACTUALIZAR CLAVE  " : user.estado}
                                                            </span>
                                                        </div>
                                                    </li>
                                                </div>
                                                <li className="flex mb-4 text-base text-black-800">
                                                    <span className="mr-3 text-primary-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                        </svg>
                                                    </span>
                                                    <div className="grid">
                                                        <span className="text-black-500 text-lg font-semibold">Direccion:</span>
                                                        <h3 className="text-black-700">
                                                            {customer.address}
                                                        </h3>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(user?.role?.toLowerCase() === "employe" || user?.role?.toLowerCase() === "administrator") && employe && (
                                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto md:px-6 lg:pt-16 pt-10">
                                    <div className="flex flex-wrap">
                                        <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                                            <div className="grid">
                                                <div className="flex items-center justify-center">
                                                    <img src={employe.photo ? "https://" + employe.photo : customerPhoto} alt=""
                                                        className="relative z-40 object-cover rounded-full h-80 w-80 lg:h-96 lg:w-96 bg-primary-100" />
                                                </div>
                                            </div>
                                            <SytyleBackgroundView />
                                        </div>
                                        <div className="w-full px-4 mb-10 md:w-1/2 lg:mb-0 ">
                                            <div className="flex justify-between">
                                                <div className="grid">
                                                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl uppercase">
                                                        Datos del {user.role === "ADMINISTRATOR" ? "administrador" : "empleado"}
                                                    </h2>
                                                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded">
                                                        <div className="flex-1 h-2 bg-primary-200">
                                                        </div>
                                                        <div className="flex-1 h-2 bg-primary-400">
                                                        </div>
                                                        <div className="flex-1 h-2 bg-primary-300">
                                                        </div>
                                                    </div>
                                                </div>
                                                <Dropdown label={'•••'}>
                                                    <DropdownItem text={'Ver perfil'} path={PATH_EMPLEADO_ADMIN_ID + employe.idEmploye + "/" + employe.fullName?.replace(/\s+/g, '-')} />
                                                    <DropdownItem text={'Restaurar contraseña'} onClick={restorePassword} />
                                                    <DropdownItem text={user.role === "EMPLOYE" ? "Cambiar a Administrador" : "Cambiar a Empleado"} onClick={updateUserRole} />
                                                    <DropdownItem
                                                        text={
                                                            user.estado === "ONLINE" || user.estado === "UPDATE_PASS"
                                                                ? "Bloquear usuario"
                                                                : "Activar usuario"
                                                        }
                                                        onClick={updateUserStatus}
                                                    />

                                                </Dropdown>
                                            </div>
                                            <ul className="mb-10">
                                                <li className="flex mb-4 text-base text-black-800">
                                                    <span className="mr-3 text-primary-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                        </svg>
                                                    </span>
                                                    <div className="grid">
                                                        <span className="text-black-500 text-lg font-semibold">Nombres:</span>
                                                        <h3 className="text-black-700">{employe.fullName}</h3>
                                                    </div>
                                                </li>
                                                <li className="flex mb-4 text-base text-black-800">
                                                    <span className="mr-3 text-primary-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                        </svg>
                                                    </span>
                                                    <div className="grid">
                                                        <span className="text-black-500 text-lg font-semibold">Email:</span>
                                                        <h3 className="text-black-700">{employe.email}</h3>
                                                    </div>
                                                </li>
                                                <li className="flex mb-4 text-base text-black-800">
                                                    <span className="mr-3 text-primary-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                        </svg>
                                                    </span>
                                                    <div className="grid">
                                                        <span className="text-black-500 text-lg font-semibold">Se unio el:</span>
                                                        <h3 className="text-black-700">{formatDate(employe?.created)}</h3>
                                                    </div>
                                                </li>
                                                <li className="flex mb-4 text-base text-black-800">
                                                    <span className="mr-3 text-primary-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                        </svg>
                                                    </span>
                                                    <div className="grid">
                                                        <span className="text-black-500 text-lg font-semibold">Telefono:</span>
                                                        <h3 className="text-black-700">{employe.phone}</h3>
                                                    </div>
                                                </li>
                                                <li className="flex mb-4 text-base text-black-800">
                                                    <span className="mr-3 text-primary-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                        </svg>
                                                    </span>
                                                    <div className="grid">
                                                        <span className="text-black-500 text-lg font-semibold">Estado:</span>
                                                        <span className={` mx-auto font-semibold ${user.estado == "ONLINE" ? "text-success-500" :
                                                            user.estado == "UPDATE_PASS" ? "text-warning-400" :
                                                                "text-danger-400"}`}>
                                                            {user.estado == "UPDATE_PASS" ? "ACTUALIZAR CLAVE  " : user.estado}
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserView;
