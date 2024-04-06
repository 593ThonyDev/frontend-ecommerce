import { PATH_CLIENTES_ADMIN } from "../../../../routes/private/admin/PrivatePaths"
import InputField from "../../../../components/fields/InputField"
import { StyleBackground } from "./components/StyleBackground"
import TextArea from "../../../../components/fields/TextArea"
import UploadPhoto from "../../../../assets/UploadPhoto.png"
import { saveOrUpdateCustomer } from "./model/CustomerApi"
import { Link, useNavigate } from "react-router-dom"
import { Customer } from "./model/Customer"
import toast from "react-hot-toast"
import { useState } from "react"

const CustomerNew = () => {

    const navigate = useNavigate();

    const [customerData, setCustomerData] = useState<Customer>({
        names: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        zip: "",
        photo: undefined,
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCustomerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateCustomer = (customerData: Customer) => {
        const camposFaltantes: string[] = [];
        if (!customerData.names) camposFaltantes.push("nombres")
        if (!customerData.lastName) camposFaltantes.push("apellidos")
        if (!customerData.email) camposFaltantes.push("email")
        if (!customerData.phone) camposFaltantes.push("telefono")
        if (!customerData.address) camposFaltantes.push("direccion")
        if (!customerData.country) camposFaltantes.push("pais")
        if (!customerData.zip) camposFaltantes.push("codigo postal")
        return camposFaltantes;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validateCustomer(customerData);
        if (camposFaltantes.length === 0) {
            const loadingToast = toast.loading('Guardando registro...');
            try {
                const savedSuccessfully = await saveOrUpdateCustomer(customerData);
                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_CLIENTES_ADMIN);
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")}`)
        }
    };



    return (
        <div className="flex flex-wrap justify-center py-10">
            <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                <div className="grid justify-center">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300 uppercase">
                        Crear cliente
                    </h2>
                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                        <div className="flex-1 h-2 bg-primary-200">
                        </div>
                        <div className="flex-1 h-2 bg-primary-400">
                        </div>
                        <div className="flex-1 h-2 bg-primary-300">
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <div className="flex items-center justify-center">
                            <img src={UploadPhoto} alt=""
                                className="relative z-40 object-cover rounded-full w-56 h-56 bg-primary-300/20 backdrop-blur-md border border-primary-200" />
                        </div>
                    </div>
                    <div className="grid lg:pt-4">
                        <div className="grid lg:grid-cols-2 gap-3 pb-3">
                            <InputField
                                mode="text"
                                label="Nombres:"
                                value={customerData.names}
                                onChange={handleChange}
                                id="names"
                            />
                            <InputField
                                mode="text"
                                label="Apellidos:"
                                value={customerData.lastName}
                                onChange={handleChange}
                                id="lastName"
                            />
                            <InputField
                                mode="email"
                                label="Email:"
                                value={customerData.email}
                                onChange={handleChange}
                                id="email"
                            />
                            <InputField
                                mode="tel"
                                label="Telefono:"
                                value={customerData.phone}
                                onChange={handleChange}
                                id="phone"
                            />
                            <InputField
                                mode="text"
                                label="Pais:"
                                value={customerData.country}
                                onChange={handleChange}
                                id="country"
                            />
                            <InputField
                                mode="numeric"
                                label="Codigo postal:"
                                value={customerData.zip}
                                onChange={handleChange}
                                id="zip"
                            />
                        </div>
                        <div className="py-3">
                            <TextArea label="Direccion de residencia:"
                                placeholder={""}
                                rows={0}
                                value={customerData.address}
                                id="address"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid justify-center ">
                        <div className="flex justify-center pt-9 gap-x-5">
                            <Link to={PATH_CLIENTES_ADMIN} className="bg-danger-400 hover:bg-danger-500 py-2 px-3 rounded-xl text-white">Cancelar</Link>
                            <button type="submit" className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-3 rounded-xl cursor-pointer">Crear cliente</button>
                        </div>
                    </div>
                </form>

                <StyleBackground />
            </div>
        </div>
    )
}

export default CustomerNew