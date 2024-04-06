import { RiShoppingCartFill } from "react-icons/ri"

const ProductDetail = () => {
    return (
        <div>
            <section className="overflow-hidden bg-white py-8 lg:py-10 font-poppins dark:bg-gray-800">
                <div className="max-w-6xl px-4  mx-auto md:px-6">
                    <div className="flex flex-wrap -mx-4 py-3">
                        <div className="w-full px-4 md:w-1/2 ">
                            <div className="sticky top-0 z-10 overflow-hidden ">
                                <div className="flex justify-center">
                                    <div className="relative w-3/5 lg:h-1/3 ">
                                        <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                            className="object-cover w-full rounded-xl" />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-1/3 p-2">
                                        <a href="#"
                                            className="block ">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                className="object-cover w-full lg:h-32 rounded-lg" />
                                        </a>
                                    </div>
                                    <div className="w-1/3 p-2">
                                        <a href="#"
                                            className="block ">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                className="object-cover w-full lg:h-32 rounded-lg" />
                                        </a>
                                    </div>
                                    <div className="w-1/3 p-2 ">
                                        <a href="#"
                                            className="block ">
                                            <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                                className="object-cover w-full lg:h-32 rounded-lg" />
                                        </a>
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
                                            <span className="">Nike Air MX Super 2500</span>
                                        </h1>
                                        <span className="w-28 h-2 bg-warning-500 mt-3 lg:mb-1" />
                                    </div>
                                    <div className="my-7 flex justify-between">
                                        <p className="inline-block lg:text-4xl text-3xl font-bold text-black-700 my-auto">
                                            <span>$10000.99</span>
                                        </p>
                                    </div>
                                    <div className=" text-primary-800 text-lg">Descripcion:</div>
                                    <p className=" text-justify text-black-700 dark:text-gray-400">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae placeat ea eligendi
                                        modi laudantium provident eius sequi tempora nihil, quidem repellendus fuga distinctio
                                        facilis maxime corrupti minima, odio nobis repellat!
                                    </p>
                                </div>
                                <div className="flex items-center text-xl cursor-pointer justify-center w-full px-2.5 py-4 bg-warning-400 hover:bg-warning-500 text-white rounded-xl">
                                    <RiShoppingCartFill className="mr-4 h-6 w-8"/>
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

export default ProductDetail