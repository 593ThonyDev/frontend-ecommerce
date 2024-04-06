import { PATH_EMPLEADOS_ADMIN } from "../../../../routes/private/admin/PrivatePaths";
import InputField from "../../../../components/fields/InputField";
import { StyleBackground } from "./components/StyleBackground";
import TextArea from "../../../../components/fields/TextArea";
import UploadPhoto from "../../../../assets/UploadPhoto.png"
import { saveOrUpdateEmploye } from "./model/EmployeApi";
import { Link, useNavigate } from "react-router-dom";
import { Employe } from "./model/Employe";
import { BiCamera } from "react-icons/bi";
import toast from "react-hot-toast";
import { useState } from "react";

const EmployeNew = () => {

    const navigate = useNavigate();

    const [employeData, setEmployeData] = useState<Employe>({
        names: '',
        lastName: '',
        email: '',
        description: '',
        phone: '',
        photo: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setEmployeData(prevState => ({
                ...prevState,
                photo: file
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validarEmpleado(employeData);
        if (camposFaltantes.length === 0) {
            const loadingToast = toast.loading('Guardando registro...');
            try {
                const savedSuccessfully = await saveOrUpdateEmploye(employeData);
                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_EMPLEADOS_ADMIN); 
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")}`)
        }
    };


    const validarEmpleado = (employeData: Employe) => {
        const camposFaltantes: string[] = [];
        if (!employeData.names) camposFaltantes.push("nombres");
        if (!employeData.lastName) camposFaltantes.push("apellidos");
        if (!employeData.email) camposFaltantes.push("email");
        if (!employeData.phone) camposFaltantes.push("telefono");
        if (!employeData.description) camposFaltantes.push("descripción del empleado");
        if (!employeData.photo) camposFaltantes.push("foto de perfil");
        return camposFaltantes;
    };


    return (
        <div className="flex flex-wrap justify-center py-10">
            <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                <div className="grid justify-center">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300 uppercase">
                        Crear empleado
                    </h2>
                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                        <div className="flex-1 h-2 bg-primary-200"></div>
                        <div className="flex-1 h-2 bg-primary-400"></div>
                        <div className="flex-1 h-2 bg-primary-300"></div>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <div className="flex items-center justify-center">
                            <img src={employeData.photo ? URL.createObjectURL(employeData.photo) : UploadPhoto} alt=""
                                className="relative z-40 object-cover rounded-full w-56 h-56 bg-primary-300/20 backdrop-blur-md border border-primary-200" />
                            <label htmlFor="photoInput">
                                <div className="absolute  bottom-2 z-40 right-14 lg:right-52 py-4 rounded-full px-4  cursor-pointer bg-primary-500/40 hover:bg-primary-700/40  backdrop-blur-lg text-white">
                                    <BiCamera />
                                </div>
                            </label>
                            <input type="file"
                                id="photoInput"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange} />
                        </div>
                    </div>
                    <div className="grid lg:pt-4">
                        <div className="grid lg:grid-cols-2 gap-3 pb-3">
                            <InputField
                                mode="text"
                                label="Nombres"
                                id="names"
                                value={employeData.names}
                                onChange={handleChange}
                            />
                            <InputField
                                mode="text"
                                label="Apellidos"
                                id="lastName"
                                value={employeData.lastName}
                                onChange={handleChange}
                            />
                            <InputField
                                mode="email"
                                label="Email"
                                id="email"
                                value={employeData.email}
                                onChange={handleChange}
                            />
                            <InputField
                                mode="tel"
                                label="Telefono"
                                id="phone"
                                value={employeData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="py-3">
                            <TextArea
                                label="Descripcion del empleado"
                                placeholder=""
                                rows={2}
                                id="description"
                                value={employeData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid justify-center ">
                        <div className="flex justify-center pt-9 gap-x-5">
                            <Link to={PATH_EMPLEADOS_ADMIN} className="bg-danger-400 hover:bg-danger-500 py-2 px-3 rounded-xl text-white">Cancelar</Link>
                            <button type="submit" className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-3 rounded-xl cursor-pointer">Crear empleado</button>
                        </div>
                    </div>
                </form>
                <StyleBackground />
            </div>
        </div>
    );
}

export default EmployeNew;
