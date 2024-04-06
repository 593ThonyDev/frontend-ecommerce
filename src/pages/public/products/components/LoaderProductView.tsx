import { RiShoppingCartFill } from "react-icons/ri"

const LoaderProductView = () => {
    return (
        <div className="w-full animate-pulse">
            <section className="overflow-hidden bg-white  lg:py-10 font-poppins">
                <div className="max-w-6xl px-4  mx-auto md:px-6">
                    <div className="flex flex-wrap -mx-4 py-3">
                        <div className="w-full px-4 md:w-1/2">

                            <div className="sticky top-0 z-10 overflow-hidden ">
                                <div className="flex justify-center">
                                    <div className="relative w-full bg-black-100 h-80 rounded-3xl">
                                        <div className="w-full h-full rounded-3xl" />
                                    </div>
                                </div>
                                <div className="flex pt-3">
                                    <div className="w-1/3 p-2">
                                        <div
                                            className={`block rounded-3xl bg-black-100`}>
                                            <div className="object-cover w-full h-32 rounded-3xl " />
                                        </div>
                                    </div>
                                    <div className="w-1/3 p-2">
                                        <div className={`block rounded-3xl bg-black-100`}>
                                            <div className="object-cover w-full h-32 rounded-3xl " />
                                        </div>
                                    </div>
                                    <div className="w-1/3 p-2">
                                        <div className={`block rounded-3xl bg-black-100`}>
                                            <div className="object-cover w-full h-32 rounded-3xl " />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 grid">
                            <div className="lg:pl-20 h-2/3 ">
                                <div className="flex justify-between">
                                    <div className=" flex flex-col relative z-20 lg:pt-1 pt-4">
                                        <div className="w-44 h-2 bg-warning-500 mb-3 lg:mb-1" />
                                        <div className="font-bebas-neue uppercase text-5xl font-black flex  bg-black-100 w-72 rounded-full h-5 py-4 my-2" />
                                        <div className="w-28 h-2 bg-warning-500 mt-3 lg:mb-1" />
                                    </div>
                                </div>

                                <div className="my-10">
                                    <li className="flex mb-2 text-base text-black-800">
                                        <div className="font-bebas-neue uppercase text-5xl font-black flex  bg-black-100 w-72 rounded-full h-2 py-4 my-2" />
                                    </li>

                                    <li className="flex text-base text-black-800">
                                        <div className="flex justify-between w-full items-center">
                                            <div className=" text-black-800 text-lg font-semibold">Descripcion:</div>
                                        </div>
                                    </li>
                                    <div className="grid grid-cols-1 pt-2 gap-y-3">
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                    </div>
                                </div>
                                <div className="flex items-center text-xl cursor-pointer justify-center w-full px-2.5 py-4 bg-warning-400 hover:bg-warning-500 text-white rounded-xl">
                                    <RiShoppingCartFill className="mr-4 h-6 w-8" />
                                    Agregar al carrito
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LoaderProductView