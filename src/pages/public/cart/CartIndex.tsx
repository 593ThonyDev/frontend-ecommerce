import { Dialog } from "@headlessui/react";
import { useState, useEffect } from "react";
import { RiShoppingCartFill, RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { PATH_PAYMENT_CODE, PATH_PRODUCTOS, PATH_PRODUCTO_ID } from "../../../routes/public/Paths";
import toast from "react-hot-toast";
import { updateProduct, createOrder, deleteProduct, getOrder } from "./model/CartApi";
import { getCustomerOrEmploye } from "../../../functions/AuthApi";
import { BiTrash, BiMinus, BiPlus } from "react-icons/bi";
import { SESSION_ORDER_CUSTOMER } from "../../../functions/ApiConst";
import { scrollTop } from "../../../functions/Funtions";

const CartIndex = () => {

    scrollTop();
    const [shopOpen, setShopOpen] = useState(false);
    const [orderCode, setOrderCode] = useState<string | null>(null);
    const [orderDetails, setOrderDetails] = useState<any>(null);

    const createNewOrder = async () => {
        try {
            const customerId = getCustomerOrEmploye();
            if (customerId) {
                const response = await createOrder(customerId);
                if (response && response.content && response.content.code) {
                    const code: string = response.content.code;
                    setOrderCode(code);
                    localStorage.setItem(SESSION_ORDER_CUSTOMER,code);
                    const responseDetails = await getOrder(customerId, code);
                    if (responseDetails) {
                        setOrderDetails(responseDetails);
                    } else {
                        toast.error("Error al obtener los detalles de la orden");
                    }
                } else {
                    toast.error("Error al crear la orden");
                }
            }
        } catch (error) {
            console.error('Error al crear la orden:', error);
            toast.error("Error al crear la orden");
        }
    };
    useEffect(() => {

        if (shopOpen) {
            createNewOrder();
        }
    }, [shopOpen]);

    const updateCartItemQuantity = async (idProduct: string, newQuantity: number) => {
        console.log(newQuantity)
        if (newQuantity <= 0) {
            return toast.error("No se permiten valores menor a 1");
        }
        try {
            if (orderCode) {
                const sucess = await updateProduct(orderCode, idProduct, newQuantity.toString());
                if (sucess) {
                    const customerId = getCustomerOrEmploye();
                    if (customerId) {
                        const responseDetails = await getOrder(customerId, orderCode);
                        if (responseDetails) {
                            setOrderDetails(responseDetails);
                        } else {
                            toast.error("Error al obtener los detalles de la orden");
                        }
                    }
                    toast.success("Carrito actualizado")
                }
                // Después de actualizar la cantidad, actualiza los detalles de la orden
            } else {
                toast.error("Código de orden inválido");
            }
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
            toast.error("Error al actualizar la cantidad del producto");
        }
    };

    const deleteCartItem = async (idProduct: string) => {
        try {
            if (orderCode) {
                const success = await deleteProduct(orderCode, idProduct);
                if (success) {

                    // Después de eliminar el producto, actualiza los detalles de la orden
                    const customerId = getCustomerOrEmploye();
                    if (customerId) {
                        const responseDetails = await getOrder(customerId, orderCode);
                        if (responseDetails) {
                            setOrderDetails(responseDetails);
                            toast.success("Producto eliminado del carrito")
                        } else {
                            toast.error("Error al obtener los detalles de la orden");
                        }
                    }
                }
            } else {
                toast.error("Código de orden inválido");
            }
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            toast.error("Error al eliminar el producto del carrito");
        }
    };


    return (
        <div className="outline-none">
            <div
                onClick={() => setShopOpen(true)}
                className="relative inline-flex items-center p-2 text-sm font-medium text-center text-primary-300 hover:text-primary-400"
            >
                <RiShoppingCartFill className="w-8 h-8" />
            </div>
            <Dialog
                as="div"
                className="bg-black-100"
                open={shopOpen}
                onClose={() => setShopOpen(false)}
            >
                <div className="fixed inset-0 z-50 backdrop-blur-sm" tabIndex={-1}></div>
                <Dialog.Panel className="shadow-2xl fixed inset-y-0 right-0 z-50 w-full overflow-y-auto lg:border-l md:border-primary-200 lg:bg-white md:border-l border-primary-200 bg-primary-50 px-6 sm:max-w-sm">
                    <div className="flex flex-col h-full justify-between">
                        <div className="lg:bg-white bg-primary-50 z-40">
                            <div className="flex w-full justify-between sticky pt-3 pb-1 top-0 lg:bg-white bg-primary-50 z-50">
                                <div className="uppercase text-black-500 font-black text-xl pt-1">
                                    Carrito de compras
                                </div>
                                <div
                                    className="rounded-full p-2.5 font-bold md:bg-black-50 md:hover:bg-black-100 bg-black-100 hover:bg-black-200/70 text-black-300 outline-none"
                                    onClick={() => setShopOpen(false)}
                                    tabIndex={0}
                                >
                                    <RiCloseFill className="h-6 w-6" aria-hidden="true" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-3.5">
                                {orderDetails && orderDetails.content && orderDetails.content.length > 0 ? (
                                    orderDetails && orderDetails.content && orderDetails.content.map((item: any) => (
                                        <div className="flex w-full" key={item.product.idProduct}>
                                            <div className={`rounded-3xl`}>
                                                <div className="relative">
                                                    <div className="absolute cursor-pointer p-1 text-lg hover:bg-danger-500/70 bg-danger-300 backdrop-blur-md text-white rounded-full ">
                                                        <BiTrash onClick={() => deleteCartItem(item.product.idProduct.toString())} />
                                                    </div>
                                                </div>
                                                <img src={"https://" + item.product.img1} alt="Product Image" className="mr-4 rounded-xl max-w-16 max-h-16 w-16 h-16 object-cover bg-primary-100 border border-primary-200" />
                                            </div>
                                            <div className="grid w-full -ml-2.5">
                                                <div className="grid">
                                                    <Link
                                                        onClick={() => { setShopOpen(false) }}
                                                        to={PATH_PRODUCTO_ID + item.product.idProduct + "/" + (item.product.name?.replace(/\s+/g, '-') ?? '')}
                                                        className="font-semibold text-primary-500 hover:text-primary-600 line-clamp-1 uppercase -mt-1">
                                                        {item.product.name}
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between -mt-1.5">

                                                    <div className="flex justify-start">
                                                        <span className="text-black-600">Precio:</span>
                                                        <span className=" font-semibold text-black-600 pl-1">${item.price.toFixed(2) }</span>
                                                    </div>
                                                    <div className="flex justify-start">
                                                        <span className="text-black-600">Total:</span>
                                                        <span className=" font-semibold text-black-600 pl-1">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between -mt-1">
                                                    <span className="text-black-600">Cantidad:</span>
                                                    <div className=" ml-auto flex items-center justify-center mt-0.5">
                                                        <div className="bg-primary-200 text-primary-500 hover:bg-primary-300 hover:text-primary-100 rounded-lg px-2 py-1" onClick={() => updateCartItemQuantity(item.product.idProduct.toString(), item.quantity - 1)}>
                                                            <BiMinus />
                                                        </div>
                                                        <span className="px-2 text-black-600">{item.quantity}</span>
                                                        <div className="bg-primary-200 text-primary-500 hover:bg-primary-300 hover:text-primary-100 rounded-lg px-2 py-1" onClick={() => updateCartItemQuantity(item.product.idProduct.toString(), item.quantity + 1)}>
                                                            <BiPlus />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="grid justify-center items-center w-full h-fit mt-36">
                                        <RiShoppingCartFill className="text-primary-200 h-32 w-32 mx-auto" />
                                        <span className="text-black-300 font-bold text-xl mt-6">Tu carrito esta vacio</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="sticky bottom-0 lg:bg-white bg-primary-50 pb-4 z-50">
                            {orderDetails && orderDetails.extracontent && orderDetails.extracontent.ammount !== 0 ? (
                                <div>
                                    <div className="flex justify-between pt-3">
                                        <span className="text-black-500 font-bold">Total a pagar:</span>
                                        <span className="text-black-500 font-bold">
                                            {orderDetails.extracontent && orderDetails.extracontent.ammount ? `$${orderDetails.extracontent.ammount.toFixed(2)}` : "$ 0.00"}
                                        </span>
                                    </div>
                                    <div className="flex pb-3">
                                        <small className="text-black-500 text-sm">Las tazas están calculadas en la orden de compra.</small>
                                    </div>
                                    <Link
                                        onClick={() => setShopOpen(false)}
                                        to={PATH_PAYMENT_CODE + orderCode} className="flex justify-center w-full bg-primary-300 hover:bg-primary-400 text-white font-bold rounded-2xl py-3 uppercase text-center">
                                        Ir al checkout
                                    </Link>
                                </div>
                            ) : (
                                <Link
                                    onClick={() => setShopOpen(false)}
                                    to={PATH_PRODUCTOS} className="flex justify-center w-full bg-primary-300 hover:bg-primary-400 text-white font-bold rounded-2xl py-3 uppercase text-center">
                                    Ver productos
                                </Link>
                            )}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
};

export default CartIndex;
