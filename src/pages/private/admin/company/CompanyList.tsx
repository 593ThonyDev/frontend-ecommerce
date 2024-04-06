import { BiCamera } from 'react-icons/bi'
import { FaPencil } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import notFoundImg from "../../../../assets/NotFound.png"
import { PATH_ADMIN_COMPANY_EDIT } from '../../../../routes/private/admin/PrivatePaths'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { API_URL } from '../../../../functions/ApiConst'
import { Company } from './model/Company'
import SytyleBackgroundView from './components/SytyleBackgroundView'
import { setToken } from '../../../../functions/AuthApi'
import { updateLogo } from './model/CompanyApi'
import toast from 'react-hot-toast'

const CompanyList = () => {

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

    const fetchData = async () => {
        try {
            setToken()
            const response = await axios.get(`${API_URL}company/list`);
            const data = response.data.content;
            setFormData({
                idCompany: data.idCompany,
                name: data.name,
                email: data.email,
                password: data.password,
                port: data.port,
                host: data.host,
                logo: data.logo,
                phone: data.phone,
                address: data.address,
                facebook: data.facebook,
                instagram: data.instagram,
                tiktok: data.tiktok,
                whatsapp: data.whatsapp
            });
        } catch (error) { }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdatePhoto = async (photo: File) => {
        const loadingToast = toast.loading('Actualizando imagen...');
        const success = await updateLogo(photo);
        if (success) {
            toast.dismiss(loadingToast);
            fetchData()
        }
    };

    return (
        <div className="flex flex-wrap">
            <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                <div className="relative">
                    <div className="flex items-center justify-center">
                        <img src={formData.logo ? "https://" + formData.logo : notFoundImg} alt=""
                            className="relative z-40 object-cover rounded-full h-80 w-80 lg:h-96 lg:w-96 bg-primary-200/50 border border-primary-200 backdrop-blur-md" />
                        <label htmlFor='logo' className="absolute lg:top-80 bottom-4 z-40 lg:right-28 sm:right-60 lg:py-4 rounded-full right-10 p-4  cursor-pointer bg-warning-400 hover:bg-warning-500/40 backdrop-blur-lg text-white">
                            <BiCamera className='my-auto' />
                        </label>
                        <input type="file" id='logo' accept="image/*" onChange={(e) => handleUpdatePhoto(e.target.files?.[0] as File)} className="hidden" />
                    </div>
                </div>
                <SytyleBackgroundView />
            </div>
            <div className="w-full px-4 mb-10 md:w-1/2 lg:mb-0 ">
                <div className="flex justify-between">
                    <div className="grid">
                        <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                            Datos de la empresa
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
                    <Link to={PATH_ADMIN_COMPANY_EDIT}
                        className="px-2 py-2 h-fit text-white bg-warning-400 rounded-xl hover:bg-warning-500">
                        <div className="flex justify-center items-center flex-nowrap">
                            <FaPencil className="w-6" />
                            <span className="px-1 text-nowrap">Editar</span>
                        </div>
                    </Link>
                </div>
                <ul className="mb-10">
                    <div className="grid lg:grid-cols-2">
                        <li className="flex mb-4 text-base text-black-800">
                            <span className="mr-3 text-primary-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                </svg>
                            </span>
                            <div className="grid">
                                <span className="text-black-500 text-lg font-semibold">Nombre:</span>
                                <h3 className="text-black-700">{formData.name}</h3>
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
                                <h3 className="text-black-700">{formData.phone}</h3>
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
                            <h3 className="text-black-700">{formData.address}</h3>

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
                            <span className="text-black-500 text-lg font-semibold">Facebook:</span>
                            <a href={formData.facebook} target="blank" className="text-black-700 hover:text-primary-600">{formData.facebook}</a>
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
                            <span className="text-black-500 text-lg font-semibold">Instagram:</span>
                            <a href={formData.instagram} target="blank" className="text-black-700 hover:text-primary-600">{formData.instagram}</a>
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
                            <span className="text-black-500 text-lg font-semibold">Tiktok:</span>
                            <a href={formData.tiktok} target="blank" className="text-black-700 hover:text-primary-600">{formData.tiktok}</a>
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
                            <span className="text-black-500 text-lg font-semibold">WhatsApp:</span>
                            <h3 className="text-black-700">{formData.whatsapp}</h3>
                        </div>
                    </li>
                </ul>
                <div className="flex justify-between">
                    <div className="grid">
                        <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                            Configuracion del email
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

                </div>
                <ul className="mb-10 grid lg:grid-cols-2">
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
                            <h3 className="text-black-700">{formData.email}</h3>

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
                            <span className="text-black-500 text-lg font-semibold">Clave del email:</span>
                            <h3 className="text-black-700">{formData.password}</h3>

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
                            <span className="text-black-500 text-lg font-semibold">Host o proveedor:</span>
                            <h3 className="text-black-700">{formData.host}</h3>
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
                            <span className="text-black-500 text-lg font-semibold">Puerto:</span>
                            <h3 className="text-black-700">{formData.port}</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CompanyList