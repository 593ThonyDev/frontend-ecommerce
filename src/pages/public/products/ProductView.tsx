import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, SESSION_ORDER_CUSTOMER } from "../../../functions/ApiConst";
import { Product } from "./model/Product";
import { RiShoppingCartFill } from "react-icons/ri";
import LoaderProductView from "./components/LoaderProductView";
import NotFoundAdmin from "../../error/NotFoundAdmin";
import { PATH_PRODUCTOS } from "../../../routes/public/Paths";
import toast from "react-hot-toast";
import { getToken } from "../../../functions/AuthApi";
import { addProduct } from "../cart/model/CartApi";

const ProductView = () => {

    const { id, name } = useParams<{ id: string; name: string }>();
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState<Product>({
        idProduct: 0,
        stock: 0,
        price: 0,
        name: "",
        img1: undefined,
        img2: undefined,
        img3: undefined,
        description: "",
        status: "",
        created: "",
        category: {
            idCategory: 0,
            name: ""
        }
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}product/public/${id}`);
            const data = response.data.content;
            setTimeout(() => {
                setFormData({
                    idProduct: data.idProduct,
                    stock: data.stock,
                    price: data.price,
                    name: data.name,
                    img1: data.img1,
                    img2: data.img2,
                    img3: data.img3,
                    description: data.description,
                    status: data.status,
                    created: data.created,
                    category: {
                        idCategory: data.category.idCategory,
                        name: data.category.name,
                        img: data.category.img
                    }
                });
                setSelectedImage("https://" + data.img1);
                setLoading(false);
            }, 800);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    useEffect(() => {
        fetchData();
    }, [id, name]);

    const handleAddToCart = async (idProduct: string) => {
        if (!getToken()) {
            toast.error("¡Inicia sesion para agregar a tu carrito!");
        } else {
            const orderCode = localStorage.getItem(SESSION_ORDER_CUSTOMER);
            if (orderCode && idProduct) {
                await addProduct(orderCode, idProduct);
            }
        }
    };


    return (
        <div>
            {loading ? (
                <LoaderProductView />
            ) : (
                formData.name?.replace(/\s+/g, '-') === name ?
                    <section className="overflow-hidden bg-white lg:py-10 font-poppins dark:bg-gray-800">
                        <div className="max-w-6xl px-4  mx-auto md:px-6">
                            <div className="flex flex-wrap -mx-4 py-3">
                                <div className="w-full px-4 md:w-1/2">
                                    <div className="sticky top-0 z-10 overflow-hidden ">
                                        <div className="flex justify-center">
                                            <div className="relative w-full h-80">
                                                <img loading="lazy" src={(selectedImage || "https://" + formData.img1) ?? "https://" + formData.img1} alt=""
                                                    className="w-full h-full rounded-3xl" />
                                            </div>
                                        </div>
                                        <div className="flex pt-3">
                                            <div className="w-1/3 p-2">
                                                <div
                                                    className={`block rounded-3xl ${selectedImage === "https://" + formData.img1 ? 'border border-primary-300' : 'border-primary-100/60 border'}`}
                                                    onClick={() => formData.img1 && handleClick("https://" + formData.img1)}>
                                                    <img loading="lazy" src={formData.img1 ? "https://" + formData.img1 : ""} alt=""
                                                        className="w-full h-32 rounded-3xl " />
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-2">
                                                <div
                                                    className={`block rounded-3xl ${selectedImage === "https://" + formData.img2 ? 'border border-primary-300' : 'border-primary-100/60 border'}`}
                                                    onClick={() => formData.img2 && handleClick("https://" + formData.img2)}>
                                                    <img loading="lazy" src={formData.img2 ? "https://" + formData.img2 : ""} alt=""
                                                        className="w-full h-32 rounded-3xl " />
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-2">
                                                <div
                                                    className={`block rounded-3xl ${selectedImage === "https://" + formData.img3 ? 'border border-primary-300' : 'border-primary-100/60 border'}`}
                                                    onClick={() => formData.img3 && handleClick("https://" + formData.img3)}>
                                                    <img loading="lazy" src={formData.img3 ? "https://" + formData.img3 : ""} alt=""
                                                        className="w-full h-32 rounded-3xl " />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full px-4 md:w-1/2 grid">
                                    <div className="lg:pl-20 h-2/3 ">
                                        <div className="mb-8 pb-8">
                                            <div className=" flex flex-col relative z-20 lg:pt-1 pt-4">
                                                <span className="w-44 h-2 bg-warning-500 mb-3 lg:mb-1" />
                                                <h1 className="font-bebas-neue uppercase text-5xl font-black flex  text-primary-500">
                                                    <span className="">{formData.name}</span>
                                                </h1>
                                                <span className="w-28 h-2 bg-warning-500 mt-3 lg:mb-1" />
                                            </div>
                                            <div className="my-7 flex justify-between">
                                                <p className="inline-block lg:text-4xl text-3xl font-bold text-black-700 my-auto">
                                                    <span>${formData.price.toFixed(2)} DOLARES</span>
                                                </p>
                                            </div>
                                            <div className="flex w-full items-center justify-between">
                                                <span className="text-primary-700 text-lg font-semibold">Stock:</span>
                                                <span className="text-black-500 text-lg pl-3">{formData.stock} unidades</span>
                                            </div>
                                            <div className=" text-primary-700 text-lg font-semibold">Descripcion:</div>
                                            <p className=" text-justify text-black-700 dark:text-gray-400">
                                                {formData.description}
                                            </p>
                                        </div>
                                        <div
                                            onClick={() => handleAddToCart(formData.idProduct ? formData.idProduct.toString() : "")}
                                            className="flex items-center text-xl cursor-pointer justify-center w-full px-2.5 py-4 mb-8 bg-warning-400 hover:bg-warning-500 text-white rounded-xl">
                                            <RiShoppingCartFill className="mr-4 h-6 w-8" />
                                            Agregar al carrito
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    : (
                        <NotFoundAdmin error='404'
                            message='Registro no encontrado'
                            link={PATH_PRODUCTOS}
                        />
                    )
            )}
        </div>
    )
}

export default ProductView