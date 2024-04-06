import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { RiCloseFill, RiMenuFill } from "react-icons/ri";
import CartIndex from "../../../pages/public/cart/CartIndex";
import DropDownCustomer from "../../dropdown/DropDownCustomer";
import { SESSION_ORDER_CUSTOMER } from "../../../functions/ApiConst";
import { getCustomerOrEmploye, getToken } from "../../../functions/AuthApi";
import { PATH_BLOG, PATH_HOME, PATH_LOGIN, PATH_NOSOTROS, PATH_PAYMENT_CODE, PATH_PRODUCTOS } from "../../../routes/public/Paths";
import { createOrder } from "../../../pages/public/cart/model/CartApi";
import toast from "react-hot-toast";
import imgLogo from "../../../assets/LogoIcono.png";

const Navbar = () => {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Productos', href: PATH_PRODUCTOS },
        { name: 'Nosotros', href: PATH_NOSOTROS },
        { name: 'Blog', href: PATH_BLOG }
    ];

    const createNewOrder = async () => {
        try {
            const customerId = getCustomerOrEmploye();
            if (customerId && getToken()) {
                const response = await createOrder(customerId);
                if (response && response.content && response.content.code) {
                    const code: string = response.content.code;
                    localStorage.setItem(SESSION_ORDER_CUSTOMER, code);
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
        createNewOrder();
    }, []);

    return (
        <header className={`h-16 sm:h-16 flex items-center z-30 w-full sticky top-0 bg-primary-50 outline-none border-b border-primary-100`}>
            <div className="container mx-auto lg:px-6 md:px-2 px-1 flex items-center justify-between">
                <div className="flex items-center justify-center">
                    <div onClick={() => setMobileMenuOpen(true)} className="relative inline-flex items-center p-3 lg:hidden lg:ml-4 md:ml-2 hover:bg-black-100/50 px-3 rounded-full text-sm font-medium text-center text-black-300">
                        <RiMenuFill className="w-6 h-6" />
                    </div>
                    <Link to={PATH_HOME} className="flex w-fit">
                        <span className="my-auto mr-1">
                            <img
                                className="h-8 w-auto"
                                src={imgLogo}
                                alt=""
                            />
                        </span>
                        <div className="flex flex-col">
                            <small className=" text-xs lg:text-sm text-black-600">Fundacion</small>
                            <small className=" text-xs lg:text-sm text-black-600">Gotitas del Rocio</small>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center">
                    <nav className="font-poppins text-black-400 uppercase text-lg lg:flex items-center hidden">
                        {navigation.map((item) => (
                            <Link key={item.name} to={item.href} className="py-2 px-6 flex">
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="z-50 relative inline-flex items-center px-1 text-sm font-medium text-center text-success-200 rounded-lg">
                        {getToken() ? (
                            <div className="flex justify-center content-center my-auto">
                                {!location.pathname.includes(PATH_PAYMENT_CODE) ? (
                                    <div className=" my-auto">
                                        <CartIndex />
                                    </div>
                                ) : (null)
                                }
                                <DropDownCustomer />
                            </div>
                        ) : (
                            <Link
                                className="uppercase py-2 px-4 rounded-full bg-primary-400 border-transparent text-white text-md hover:bg-primary-500 font-bold"
                                to={PATH_LOGIN}
                            >
                                Ayudanos
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
                <div className="fixed inset-0 z-50 backdrop-blur-sm" tabIndex={-1}></div>
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto lg:border-l md:border-primary-100 md:border-l border-primary-100 bg-primary-50 px-6 py-3 sm:max-w-sm">
                    <div className="flex items-center justify-between">
                        <div className="uppercase text-black-500 font-black lg:text-3xl text-2xl pt-1">
                            Menú
                        </div>
                        <div
                            className="-m-2.5 rounded-full p-2.5 font-bold bg-primary-100 hover:bg-primary-200/50 text-black-300"
                            onClick={() => setMobileMenuOpen(false)}
                            tabIndex={0}
                        >
                            <RiCloseFill className="h-6 w-6" aria-hidden="true" />
                        </div>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className={`-my-6  divide-primary-200 ${getToken() ? null : " divide-y-primary-200"}`}>
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        onClick={() => setMobileMenuOpen(false)}
                                        key={item.name}
                                        to={item.href}
                                        className={`-mx-auto block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-center text-primary-300 bg-white ${location.pathname === item.href ? 'text-green-500' : 'text-primary-400'}`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="grid py-6 gap-2 text-center">
                                {getToken() ? null : (
                                    <Link
                                        onClick={() => setMobileMenuOpen(false)}
                                        to={PATH_LOGIN}
                                        className="block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary-300 hover:text-primary-300 bg-white"
                                        tabIndex={0}
                                    >
                                        Iniciar sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
};

export default Navbar;
