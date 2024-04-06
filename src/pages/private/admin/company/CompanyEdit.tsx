import { Link, useNavigate } from "react-router-dom"
import InputField from "../../../../components/fields/InputField"
import { PATH_ADMIN_COMPANY } from "../../../../routes/private/admin/PrivatePaths"
import TextArea from "../../../../components/fields/TextArea"
import { useState, useEffect } from "react"
import { setToken } from "../../../../functions/AuthApi"
import { Company } from "./model/Company"
import { getCompanyData, updateData } from "./model/CompanyApi"

const CompanyEdit = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<Company>({
        idCompany: 0,
        name: "",
        email: "",
        password: "",
        port: "",
        host: "",
        logo: "",
        phone: "",
        address: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        whatsapp: ""
    });

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await updateData(formData);
            navigate(PATH_ADMIN_COMPANY)
        } catch (error) {
            console.error("Error al guardar los datos:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setToken();
            const response = await getCompanyData();
            setFormData(response);
        } catch (error) { }
    };


    return (
        <section className="flex justify-center  font-poppins dark:bg-gray-800 lg:py-12 pt-4">
            <div className="w-full px-4 mb-10 md:w-1/2 lg:mb-0 ">
                <div className="flex justify-center">
                    <div className="grid justify-center">
                        <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                            Editar empresa
                        </h2>
                        <div className="flex justify-center w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                            <div className="flex-1 h-2 bg-primary-200">
                            </div>
                            <div className="flex-1 h-2 bg-primary-400">
                            </div>
                            <div className="flex-1 h-2 bg-primary-300">
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} autoComplete="false">

                    <div className="grid lg:grid-cols-2 gap-3">
                        <InputField
                            mode="text"
                            label="Nombre de la empresa"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="tel"
                            label="Telefono"
                            id="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="text"
                            label="Facebook"
                            id="facebook"
                            value={formData.facebook}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="tel"
                            label="Instagram"
                            id="instagram"
                            value={formData.instagram}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="text"
                            label="WhatsApp"
                            id="whatsApp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="tel"
                            label="Tiktok"
                            id="tiktok"
                            value={formData.tiktok}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="pt-3">
                        <TextArea
                            label="Direccion de la empresa"
                            placeholder={""}
                            rows={0}
                            id="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex justify-center pt-10">
                        <div className="grid justify-center">
                            <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                                Configuracion del email
                            </h2>
                            <div className="flex justify-center w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                                <div className="flex-1 h-2 bg-primary-200">
                                </div>
                                <div className="flex-1 h-2 bg-primary-400">
                                </div>
                                <div className="flex-1 h-2 bg-primary-300">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-3">
                        <InputField
                            mode="text"
                            label="Email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="text"
                            label="Clave del email"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="text"
                            label="Host"
                            id="host"
                            value={formData.host}
                            onChange={handleInputChange}
                        />
                        <InputField
                            mode="numeric"
                            label="Puerto"
                            id="port"
                            value={formData.port}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex justify-center py-5 pt-9 gap-x-5">
                        <Link to={PATH_ADMIN_COMPANY} className="bg-danger-400 hover:bg-danger-500 py-2 px-3 rounded-xl text-white">Cancelar</Link>
                        <button type="submit" className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-3 rounded-xl cursor-pointer">Guardar cambios</button>
                    </div>
                </form>

            </div>
        </section>
    )
}

export default CompanyEdit