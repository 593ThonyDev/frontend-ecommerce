import { PATH_CLIENTES_ADMIN} from "../../../../routes/private/admin/PrivatePaths";
import InputField from "../../../../components/fields/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { StyleBackground } from "./components/StyleBackground";
import TextArea from "../../../../components/fields/TextArea";
import customerPhoto from "../../../../assets/NotFound.png";
import NotFoundAdmin from "../../../error/NotFoundAdmin";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Customer } from "./model/Customer";
import { getCustomerById, saveOrUpdateCustomer } from "./model/CustomerApi";

const EmployeEdit = () => {
    const navigate = useNavigate();

    const { id, name } = useParams<{ id: string; name: string }>();
    const [customerData, setCustomerData] = useState<Customer>({
        idCustomer: 0,
        fullName: "",
        created: "",
        email: "",
        address: "",
        phone: "",
        zip: "",
        country: "",
        photo: undefined,
    });
    const [validURL, setValidURL] = useState<boolean>(true);

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await getCustomerById(parseInt(id?.toString() || "0"));
                setCustomerData(data);
                setValidURL(data.fullName?.replace(/\s+/g, "-") === name);
            } catch (error) {
                setValidURL(false);
            }
        };
        fetchDataAndSetState();
    }, [id, name]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = obtenerCamposFaltantes(customerData);
        if (camposFaltantes.length === 0) {
            const loadingToast = toast.loading("guardando cambios...");

            if (!id || !customerData.fullName) {
                return;
            }

            try {
                const savedSuccessfully = await saveOrUpdateCustomer(customerData, id);

                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_CLIENTES_ADMIN);
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                console.error("Error al guardar los cambios:", error);
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")}`);
        }
    };

    const obtenerCamposFaltantes = (employeData: Customer) => {
        const camposFaltantes: string[] = [];
        if (!employeData.fullName) camposFaltantes.push("fullName");
        if (!employeData.email) camposFaltantes.push("email");
        if (!employeData.phone) camposFaltantes.push("telefono");
        if (!employeData.address) camposFaltantes.push("direccion de envio");
        if (!employeData.zip) camposFaltantes.push("codigo postal");
        if (!employeData.country) camposFaltantes.push("pais");
        return camposFaltantes;
    };

    if (!validURL) {
        return (
            <NotFoundAdmin
                error="404"
                message="Registro no encontrado, puede que haya sido eliminado"
                link={PATH_CLIENTES_ADMIN}
            />
        );
    }

    return (
        <div className="flex flex-wrap justify-center py-10">
            <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                <div className="grid justify-center">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300 uppercase">
                        Editar cliente
                    </h2>
                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                        <div className="flex-1 h-2 bg-primary-200"></div>
                        <div className="flex-1 h-2 bg-primary-400"></div>
                        <div className="flex-1 h-2 bg-primary-300"></div>
                    </div>
                </div>
                <div className="relative">
                    <div className="flex items-center justify-center">
                        <img
                            src={
                                customerData.photo
                                    ? "https://" + customerData.photo
                                    : customerPhoto
                            }
                            alt=""
                            className="relative z-40 object-cover rounded-full w-56 h-56 bg-primary-300/20 backdrop-blur-md border border-primary-200"
                        />
                    </div>
                </div>
                <div className="grid lg:pt-4">
                    <div className=" py-3">
                        <InputField
                            mode="text"
                            label="Nombres y apellidos"
                            value={customerData.fullName}
                            id="fullName"
                            onChange={handleChange}
                            readOnly={!validURL}
                        />
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3 pb-3">
                        <InputField
                            value={customerData.email}
                            mode="email"
                            label="Email"
                            id="email"
                            onChange={handleChange}
                        />
                        <InputField
                            mode="tel"
                            label="Telefono"
                            value={customerData.phone}
                            id="phone"
                            onChange={handleChange}
                        />
                        <InputField
                            value={customerData.country}
                            mode="text"
                            label="Pais"
                            id="country"
                            onChange={handleChange}
                        />
                        <InputField
                            mode="text"
                            label="Codigo postal"
                            value={customerData.zip}
                            id="zip"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="py-3">
                        <TextArea
                            label="Descripcion del empleado"
                            placeholder={"Hola... esta es mi descripcion como empleado"}
                            value={customerData.address}
                            id="address"
                            onChange={handleChange}
                            rows={0}
                        />
                    </div>
                </div>
                <div className="grid justify-center ">
                    <div className="flex justify-center pt-9 gap-x-5">
                        <Link
                            to={PATH_CLIENTES_ADMIN}
                            className="bg-danger-400 hover:bg-danger-500 py-2 px-3 rounded-xl text-white"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-3 rounded-xl cursor-pointer"
                            onClick={handleSubmit}
                        >
                            Editar cliente
                        </button>
                    </div>
                </div>
                <StyleBackground />
            </div>
        </div>
    );
};

export default EmployeEdit;
