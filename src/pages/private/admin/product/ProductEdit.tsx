import React, { useEffect, useState } from 'react';
import { updateProduct } from "./model/ProductApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "./model/Product";
import toast from "react-hot-toast";
import { getFullName, setToken } from "../../../../functions/AuthApi";
import DropDownSearchData from "./DropDownSearchData";
import { PATH_PRODUCTOS_ADMIN } from "../../../../routes/private/admin/PrivatePaths";
import InputField from "../../../../components/fields/InputField";
import TextArea from "../../../../components/fields/TextArea";
import imgProduct from "../../../../assets/UploadPhoto.png";
import axios from 'axios';
import { API_URL } from '../../../../functions/ApiConst';

const ProductEdit = () => {
    const { id, name } = useParams<{ id: string, name: string }>();
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const [formData, setFormData] = useState<Product>({
        idProduct: 0,
        stock: 0,
        price: "",
        name: "",
        description: "",
        status: "",
        created: "",
        category: {
            idCategory: 0,
            name: ""
        }
    });
    const validarProduct = (productData: Product) => {
        const camposFaltantes: string[] = [];
        if (!productData.name) camposFaltantes.push("nombre");
        if (!productData.description) camposFaltantes.push("descripcion");
        if (!productData.price) camposFaltantes.push("precio");
        if (!productData.stock) camposFaltantes.push("stock");
        return camposFaltantes;
    };

    const fetchData = async () => {
        try {
            setToken();
            const response = await axios.get(`${API_URL}product/${id}`);
            const data = response.data.content;
            setFormData(data);
        } catch (error) {
            console.error('Error al obtener los datos del producto:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id, name]);

    const navigate = useNavigate();
    const fullName = getFullName() || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validarProduct(formData);
        if (camposFaltantes.length === 0) {
            const categoryId = parseInt(selectedCategory);

            if (formData.Category) {
                formData.Category.idCategory = categoryId;
            } else {
                formData.Category = { idCategory: categoryId };
            }

            const loadingToast = toast.loading('Guardando registro...');
            try {
                const savedSuccessfully = await updateProduct(formData);
                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_PRODUCTOS_ADMIN);
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")} del producto`);
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };


    return (
        <div className="flex flex-wrap justify-center py-10">
            <div className="grid px-4 mb-10 lg:mb-0 z-10">
                <div className="grid justify-center">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                        EDITAR PRODUCTO
                    </h2>
                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                        <div className="flex-1 h-2 bg-primary-200"></div>
                        <div className="flex-1 h-2 bg-primary-400"></div>
                        <div className="flex-1 h-2 bg-primary-300"></div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((index) => (
                            <div className="flex justify-center" key={index}>
                                <div className="relative">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={formData.img1 ? "https://" + formData[`img${index}`] : imgProduct}
                                            alt=""
                                            className="my-auto z-40 object-cover max-h-40 max-w-40 w-40 rounded-3xl align-middle h-40 bg-white backdrop-blur-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} autoComplete='false'>
                    <div className="grid mt-2">
                        <div>
                            <InputField
                                mode="text"
                                label="Nombre del producto"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type='hidden'
                                id="idProduct"
                                value={formData.idProduct}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="py-3">
                            <TextArea
                                label="Descripcion del producto"
                                placeholder={""}
                                rows={0}
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3 pb-3">
                            <InputField
                                mode="text"
                                label="Precio"
                                id="price"
                                value={formData.price.toString()}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                            <InputField
                                mode="numeric"
                                label="Stock"
                                id="stock"
                                value={formData.stock.toString()}
                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="grid lg:grid-cols-2 gap-3 pb-3">
                            <div className=" grid">
                                <div className=" text-primary-700/70  text-sm">Categoria del producto</div>
                                <DropDownSearchData
                                    buttonText={formData.category?.name ? formData.category.name : "Seleccionar Categoria"}
                                    onCategoryIdChange={handleCategoryChange}
                                />
                            </div>
                            <InputField
                                mode="text"
                                label="Creador"
                                id="creator"
                                value={fullName}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center py-5 pt-9 gap-x-5">
                        <Link
                            to={PATH_PRODUCTOS_ADMIN}
                            className="bg-danger-400 hover:bg-danger-500 py-2 px-4 rounded-xl text-white"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-4 rounded-xl cursor-pointer"
                        >
                            Actualizar producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductEdit;
