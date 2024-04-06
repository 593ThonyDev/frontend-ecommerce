import { PATH_CATEGORIA_PRODUCTOS_ADMIN, PATH_CATEGORIA_PRODUCTO_ADMIN_EDIT_ID } from '../../../../routes/private/admin/PrivatePaths'
import StyleBackgroundView from './components/StyleBackgroundView'
import UploadPhoto from "../../../../assets/UploadPhoto.png";
import { getProductCategoryById } from './model/CategoryApi'
import NotFoundAdmin from '../../../error/NotFoundAdmin'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Category } from './model/Category'

const ProductCategoryView = () => {

    const { id, name } = useParams<{ id: string; name: string }>();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<Category>({
        idCategory: 0,
        name: "",
        img: undefined
    });

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                setLoading(true);
                const data = await getProductCategoryById(parseInt(id?.toString() || '0'));
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
        <section>
            {loading ? (
                <div className="flex flex-wrap justify-center py-10">
                    <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                        <div className="relative">
                            <div className="flex items-center justify-center">
                                <div
                                    className="relative z-40 object-cover rounded-full w-56 h-56 bg-primary-300/20 backdrop-blur-md border border-primary-200"
                                />
                            </div>
                        </div>
                        <div className="grid justify-center">
                            <div className="my-8 mt-7 text-xl font-bold bg-black-100 h-5 w-32 rounded-full mx-auto" />
                            <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                                <div className="flex-1 h-2 bg-primary-200"></div>
                                <div className="flex-1 h-2 bg-primary-400"></div>
                                <div className="flex-1 h-2 bg-primary-300"></div>
                            </div>
                        </div>
                        <div className="grid justify-center py-5">
                            <div className="flex justify-center py-5 pt-9 gap-x-5">
                                <Link
                                    to={PATH_CATEGORIA_PRODUCTOS_ADMIN}
                                    className="bg-danger-400 hover:bg-danger-500 py-2 px-3 rounded-xl text-white"
                                >
                                    Cancelar
                                </Link>
                                <button
                                    type="submit"
                                    className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-3 rounded-xl cursor-pointer"
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                        <StyleBackgroundView />
                    </div>
                </div>
            ) : (
                formData.name?.replace(/\s+/g, '-') === name ?
                    <div className="flex flex-wrap justify-center py-10">
                        <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                            <div className="relative">
                                <div className="flex items-center justify-center">
                                    <img
                                        src={formData.img ? "https://" + formData.img : UploadPhoto}
                                        alt=""
                                        className="relative z-40 object-cover rounded-full w-56 h-56 bg-primary-300/20 backdrop-blur-md border border-primary-200"
                                    />
                                </div>
                            </div>
                            <div className="grid justify-center">
                                <h2 className="py-5 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                                    {formData.name}
                                </h2>
                                <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                                    <div className="flex-1 h-2 bg-primary-200"></div>
                                    <div className="flex-1 h-2 bg-primary-400"></div>
                                    <div className="flex-1 h-2 bg-primary-300"></div>
                                </div>
                            </div>
                            <div className="grid justify-center py-5">
                                <div className="flex justify-center py-5 pt-9 gap-x-5">
                                    <Link
                                        to={PATH_CATEGORIA_PRODUCTOS_ADMIN}
                                        className="bg-danger-400 hover:bg-danger-500 py-2 px-3 rounded-xl text-white"
                                    >
                                        Cancelar
                                    </Link>
                                    <Link to={PATH_CATEGORIA_PRODUCTO_ADMIN_EDIT_ID + formData.idCategory + "/" + formData.name?.replace(/\s+/g, '-')}
                                        className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-3 rounded-xl cursor-pointer"
                                    >
                                        Editar
                                    </Link>
                                </div>
                            </div>
                            <StyleBackgroundView />
                        </div>
                    </div>
                    : (
                        <NotFoundAdmin error='404'
                            message='Registro no encontrado'
                            link={PATH_CATEGORIA_PRODUCTOS_ADMIN}
                        />
                    )
            )}
        </section >
    )
}

export default ProductCategoryView
