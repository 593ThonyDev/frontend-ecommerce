import { PATH_CLIENTE_ADMIN_EDIT_ID, PATH_EMPLEADOS_ADMIN } from '../../../../routes/private/admin/PrivatePaths'
import DropdownItem, { Dropdown } from '../../../../components/dropdown/DropDownOptions'
import { getCustomerById, updateCustomerPhoto } from './model/CustomerApi'
import SytyleBackgroundView from './components/SytyleBackgroundView'
import { formatDate } from '../../../../functions/Funtions'
import customerPhoto from "../../../../assets/cliente.png"
import NotFoundAdmin from '../../../error/NotFoundAdmin'
import LoaderView from './components/LoaderView'
import { useParams } from 'react-router-dom'
import { Customer } from './model/Customer'
import { useEffect, useState } from 'react'
import { BiCamera } from 'react-icons/bi'
import toast from 'react-hot-toast'

const CustomerView = () => {

    const { id, name } = useParams<{ id: string; name: string }>();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<Customer>({
        idCustomer: 0,
        fullName: "",
        created: "",
        email: "",
        address: "",
        phone: "",
        photo: undefined,
        country: "",
        zip: ""
    });

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                setLoading(true);
                const data = await getCustomerById(parseInt(id?.toString() || '0'));
                setTimeout(() => {
                    setFormData(data);
                    setLoading(false);
                }, 800);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchDataAndSetState();
    }, [id, name]);

    // Método para actualizar la foto del empleado
    const handleUpdatePhoto = async (photo: File) => {
        setLoading(true);
        const loadingToast = toast.loading('Actualizando imagen...');
        if (!formData.idCustomer) {
            return;
        }
        const success = await updateCustomerPhoto(formData.idCustomer.toString(), photo);
        if (success) {
            toast.dismiss(loadingToast);
            const updatedData = await getCustomerById(parseInt(id?.toString() || '0'));
            setFormData(updatedData);
        }
        setLoading(false);
    };

    return (
        <section className="flex">
            {loading ? (
                <LoaderView />
            ) : (
                formData.fullName?.replace(/\s+/g, '-') === name ?
                    <div className="justify-center flex-1 max-w-6xl py-4 mx-auto md:px-6 lg:pt-16 pt-10">
                        <div className="flex flex-wrap">
                            <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                                <div className="relative">
                                    <div className="flex items-center justify-center">
                                        <img src={formData.photo ? "https://" + formData.photo : customerPhoto} alt=""
                                            className="relative z-40 object-cover rounded-full h-80 w-80 lg:h-96 lg:w-96 bg-primary-100" />
                                        <label htmlFor="photo" className="absolute lg:top-80 bottom-4 z-40 lg:right-28 sm:right-60 lg:py-4 rounded-full right-10 p-4  cursor-pointer bg-primary-500/40 hover:bg-primary-600/40 backdrop-blur-lg text-white">
                                            <BiCamera className='my-auto' />
                                            {/* Manejar el evento de selección de archivo */}
                                        </label>
                                        <input type="file" id='photo' accept="image/*" onChange={(e) => handleUpdatePhoto(e.target.files?.[0] as File)} className="hidden" />
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
                                        <DropdownItem text={'Editar cliente'} path={PATH_CLIENTE_ADMIN_EDIT_ID + formData.idCustomer + "/" + formData.fullName?.replace(/\s+/g, '-')} />
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
                                                <h3 className="text-black-700">{formData.fullName}</h3>
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
                                                <h3 className="text-black-700">{formatDate(formData?.created)}</h3>
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
                                                <h3 className="text-black-700">{formData.phone}</h3>
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
                                                <h3 className="text-black-700">{formData.email}</h3>
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
                                                <h3 className="text-black-700">{formData.country}</h3>
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
                                                <span className="text-black-500 text-lg font-semibold">Codigo postal:</span>
                                                <h3 className="text-black-700">{formData.zip}</h3>
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
                                                {formData.address}
                                            </h3>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    : (
                        <NotFoundAdmin error='404'
                            message='Registro no encontrado'
                            link={PATH_EMPLEADOS_ADMIN}
                        />
                    )
            )}
        </section >
    )
}

export default CustomerView
