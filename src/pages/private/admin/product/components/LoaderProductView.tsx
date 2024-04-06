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
                                        <div className="mr-3 text-primary-500 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="text-black-700 text-lg font-semibold">Precio:</div>
                                            <div className="bg-black-200 h-2.5 w-16 rounded-full my-auto" />
                                        </div>
                                    </li>
                                    <li className="flex mb-2 text-base text-black-800">
                                        <div className="mr-3 text-primary-500 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="text-black-700 text-lg font-semibold">Stock:</div>
                                            <div className="bg-black-200 h-2.5 w-16 rounded-full my-auto" />
                                        </div>
                                    </li>
                                    <li className="flex mb-2 text-base text-black-800">
                                        <div className="mr-3 text-primary-500 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="text-black-700 text-lg font-semibold">Estado:</div>
                                            <div className="bg-black-200 h-2.5 w-16 rounded-full my-auto" />
                                        </div>
                                    </li>
                                    <li className="flex mb-2 text-base text-black-800">
                                        <div className="mr-3 text-primary-500 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="text-black-700 text-lg font-semibold">Categoria:</div>
                                            <div className="bg-black-200 h-2.5 w-16 rounded-full my-auto" />
                                        </div>
                                    </li>
                                    <li className="flex mb-2 text-base text-black-800">
                                        <div className="mr-3 text-primary-500 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className="text-black-700 text-lg font-semibold">Creado:</div>
                                            <div className="bg-black-200 h-2.5 w-56 rounded-full my-auto" />
                                        </div>
                                    </li>
                                    <li className="flex text-base text-black-800">
                                        <div className="mr-3 text-primary-500 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                                            </svg>
                                        </div>
                                        <div className="flex justify-between w-full items-center">
                                            <div className=" text-black-800 text-lg font-semibold">Descripcion:</div>
                                        </div>
                                    </li>
                                    <div className="grid grid-cols-1 pl-8 pt-2 gap-y-3">
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                        <div className="bg-black-200 h-2.5 w-full rounded-full my-auto" />
                                    </div>

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