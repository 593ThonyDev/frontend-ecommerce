import { Link } from "react-router-dom"
import ProductList from "./ProductList"
import { PATH_PRODUCTOS } from "../../../../routes/public/Paths"

const Product = () => {


    return (
        <div className=" bg-primary-50 lg:px-5 py-5">
            <div className="flex w-full justify-center h-full grid-cols-1 xl:grid-cols-1 2xl:grid-cols-6  rounded-2xl">
                <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-5 mb-2 px-5">
                    <div className="flex justify-venter z-20 py-2 bg-primary-50 pb-4">
                        <div className="md:text-center text-center justify-center w-full lg:px-0 px-2">
                            <h2 className="pb-2 text-2xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                                Ayudanos
                            </h2>
                            <div className="flex justify-center mx-auto flex-row-reverse w-32 mt-1 mb-5 overflow-hidden rounded">
                                <div className="flex-1 h-2 bg-primary-200">
                                </div>
                                <div className="flex-1 h-2 bg-primary-400">
                                </div>
                                <div className="flex-1 h-2 bg-primary-300">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center ">
                        <ProductList />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Link to={PATH_PRODUCTOS} className="flex items-center my-3 mb-5 justify-center rounded-xl bg-primary-500 hover:bg-primary-400 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700">
                    <span className="mr-3 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                            <path
                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                        </svg>
                    </span>
                    Ver todos los productos
                </Link>
            </div>
        </div>
    )
}

export default Product