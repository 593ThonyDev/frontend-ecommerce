import { PATH_CLIENTES_ADMIN, PATH_ORDERS_ADMIN, PATH_PRODUCTOS_ADMIN } from "../../../../routes/private/admin/PrivatePaths"
import { BiUser, BiDollar } from "react-icons/bi"
import { FaBoxOpen } from "react-icons/fa"
import { Link } from "react-router-dom"

const Stadistics = () => {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-4 lg:pb-3 cursor-default">
            <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl">
                <div
                    className="group relative overflow-hidden bg-white lg:bg-primary-100 px-6 pt-5 pb-6 transition-all duration-300 sm:mx-auto sm:max-w-sm sm:rounded-lg">
                    <span className="absolute top-5 z-0 h-20 w-20 rounded-full bg-primary-400 transition-all duration-300 group-hover:scale-[10]"></span>
                    <div className="relative z-10 mx-auto max-w-md">
                        <div className="flex gap-x-4 content-center">
                            <Link to={PATH_CLIENTES_ADMIN} className="grid h-20 w-20 place-items-center rounded-full bg-primary-500 transition-all duration-300 group-hover:bg-primary-300">
                                <BiUser className="text-white h-16 w-16" />
                            </Link>
                            <div className=" grid my-auto text-base leading-7 text-black-600 transition-all duration-300 group-hover:text-white/90">
                                <Link to={PATH_CLIENTES_ADMIN} className="uppercase text-2xl font-bold">Clientes</Link>
                                <span className="uppercase text-xl">100000</span>
                            </div>
                        </div>
                        <div
                            className="pt-2 text-base leading-7 text-black-600 transition-all duration-300 group-hover:text-white/90">
                            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share
                                online.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl">
                <div
                    className="group relative overflow-hidden bg-white lg:bg-success-100 px-6 pt-5 pb-6 transition-all duration-300 sm:mx-auto sm:max-w-sm sm:rounded-lg">
                    <span className="absolute top-5 z-0 h-20 w-20 rounded-full bg-success-400 transition-all duration-300 group-hover:scale-[10]"></span>
                    <div className="relative z-10 mx-auto max-w-md">
                        <div className="flex gap-x-4 content-center">
                            <Link to={PATH_ORDERS_ADMIN} className="grid h-20 w-20 place-items-center rounded-full bg-success-500 transition-all duration-300 group-hover:bg-success-200">
                                <BiDollar className="text-white h-16 w-16" />
                            </Link>
                            <div className=" grid my-auto text-base leading-7 text-black-600 transition-all duration-300 group-hover:text-white/90">
                                <Link to={PATH_ORDERS_ADMIN} className="uppercase text-2xl font-bold ">Ventas</Link>
                                <span className="uppercase text-xl">$1000000.00</span>
                            </div>
                        </div>
                        <div
                            className="pt-2 text-base leading-7 text-black-600 transition-all duration-300 group-hover:text-white/90">
                            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share
                                online.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col justify-center overflow-hidden rounded-3xl">
                <div
                    className="group relative overflow-hidden bg-white lg:bg-warning-100 px-6 pt-5 pb-6 transition-all duration-300 sm:mx-auto sm:max-w-sm sm:rounded-lg">
                    <span className="absolute top-5 z-0 h-20 w-20 rounded-full bg-warning-400 transition-all duration-300 group-hover:scale-[10]"></span>
                    <div className="relative z-10 mx-auto max-w-md">
                        <div className="flex gap-x-4 content-center">
                            <Link to={PATH_PRODUCTOS_ADMIN} className="grid h-20 w-20 place-items-center rounded-full bg-warning-400 transition-all duration-300 group-hover:bg-warning-300">
                                <FaBoxOpen className="text-white h-10 w-16" />
                            </Link>
                            <div className=" grid my-auto text-base leading-7 text-black-600 transition-all duration-300 group-hover:text-white/90">
                                <Link to={PATH_PRODUCTOS_ADMIN} className="uppercase text-2xl font-bold">Productos</Link>
                                <span className="uppercase text-xl">90878</span>
                            </div>
                        </div>
                        <div
                            className="pt-2 text-base leading-7 text-black-600 transition-all duration-300 group-hover:text-white/90">
                            <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share
                                online.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Stadistics