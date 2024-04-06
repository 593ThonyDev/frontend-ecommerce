import { getEmployeById } from './model/EmployeApi'
import SytyleBackgroundView from './components/SytyleBackgroundView'
import customerPhoto from "../../../assets/cliente.png"
import { LoaderView } from './components/LoaderView'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Employe } from './model/Employe'
import BlogEmploye from './blog/BlogEmploye'
import NotFoundPublic from '../../error/NotFoundPublic'
import { PATH_NOSOTROS } from '../../../routes/public/Paths'
import { formatDate, scrollTop } from '../../../functions/Funtions'

const EmployeView = () => {

    const { id, name } = useParams<{ id: string; name: string }>();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Employe>({
        idEmploye: 0,
        fullName: "",
        created: "",
        description: "",
        photo: undefined,
    });

    useEffect(() => {
        scrollTop()
        const fetchDataAndSetState = async () => {
            try {
                setLoading(true);
                const data = await getEmployeById(parseInt(id?.toString() || '0'));
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


    return (
        <div className=' bg-white'>
            {loading ? (
                <LoaderView />
            ) : (
                formData.fullName?.replace(/\s+/g, '-') === name ?
                    <React.Fragment>
                        <div className=' w-full grid bg-white'>
                            <div className="justify-center flex-1 max-w-6xl mx-auto md:px-6 lg:pt-16 pt-10 w-full">
                                <div className="flex flex-wrap">
                                    <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                                        <div className="relative">
                                            <div className="flex items-center justify-center">
                                                <img src={formData.photo ? "https://" + formData.photo : customerPhoto} alt=""
                                                    className="relative z-40 object-cover rounded-full h-80 w-80 lg:h-96 lg:w-96 bg-primary-100" />
                                            </div>
                                        </div>
                                        <SytyleBackgroundView />
                                    </div>
                                    <div className="w-full px-4 mb-5 md:w-1/2 lg:mb-0 ">
                                        <div className="flex justify-between">
                                            <div className="grid">
                                                <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl uppercase">
                                                    {formData.fullName}
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
                                        <ul className="">
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

                                            <li className="flex text-base text-black-800">
                                                <span className="mr-3 text-primary-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                        className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                        <path
                                                            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                                    </svg>
                                                </span>
                                                <div className="grid">
                                                    <span className="text-black-500 text-lg font-semibold">Descripcion:</span>
                                                    <h3 className="text-black-700">
                                                        {formData.description}
                                                    </h3>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <BlogEmploye />
                    </React.Fragment>
                    : (
                        <NotFoundPublic error='404'
                            message='Registro no encontrado'
                            link={PATH_NOSOTROS}
                        />
                    )
            )}
        </div>

    )
}

export default EmployeView
