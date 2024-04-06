import { BiCamera } from "react-icons/bi";
import InputField from "../../../../components/fields/InputField";
import { PATH_CATEGORIA_PRODUCTOS_ADMIN } from "../../../../routes/private/admin/PrivatePaths";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import UploadPhoto from "../../../../assets/UploadPhoto.png";
import { Category } from "./model/Category";
import { saveOrUpdateProductCategory } from "./model/CategoryApi";
import StyleBackground from "./components/StyleBackground";

const ProductCategoryNew = () => {
    const navigate = useNavigate();

    const [categoryData, setCategoryData] = useState<Category>({
        name: '',
        img: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCategoryData(prevState => ({
                ...prevState,
                img: file
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validarEmpleado(categoryData);
        if (camposFaltantes.length === 0) {
            const loadingToast = toast.loading('Guardando registro...');
            try {
                const savedSuccessfully = await saveOrUpdateProductCategory(categoryData);
                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_CATEGORIA_PRODUCTOS_ADMIN);
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                console.error('Error al guardar los cambios:', error);
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")}`);
        }
    };

    const validarEmpleado = (categoryData: Category) => {
        const camposFaltantes: string[] = [];
        if (!categoryData.name) camposFaltantes.push("nombres");
        if (!categoryData.img) camposFaltantes.push("imagen de la categoría del producto");
        return camposFaltantes;
    };

    return (
        <div className="flex flex-wrap justify-center py-10">
            <div className="relative w-full px-4 mb-10 md:w-1/2 lg:mb-0 z-10">
                <div className="grid justify-center">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                        Nueva categoría de producto
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
                            <img
                                src={categoryData.img ? URL.createObjectURL(categoryData.img) : UploadPhoto}
                                alt=""
                                className="relative z-40 object-cover rounded-full w-56 h-56 bg-primary-300/20 backdrop-blur-md border border-primary-200"
                            />
                            <label htmlFor="photoInput">
                                <div className="absolute bottom-2 z-40 right-14 lg:right-52 py-4 rounded-full px-4 cursor-pointer bg-primary-500/40 hover:bg-primary-700/40 backdrop-blur-lg text-white">
                                    <BiCamera />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="photoInput"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </div>
                    </div>
                    <div className="grid justify-center py-5">
                        <InputField
                            id="name"
                            mode="text"
                            label="Nombre de la categoría"
                            value={categoryData.name}
                            onChange={handleChange}
                        />
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
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>
                <StyleBackground />
            </div>
        </div>
    );
};

export default ProductCategoryNew;
