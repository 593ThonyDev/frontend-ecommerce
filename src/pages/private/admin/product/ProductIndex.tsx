import { PATH_PRODUCTO_ADMIN_NEW } from "../../../../routes/private/admin/PrivatePaths"
import { FaPlus, FaSearch } from "react-icons/fa"
import { Link } from "react-router-dom"
import ProductList from "./ProductList"
import { useState } from "react"
import ProductSearch from "./ProductSearch"

const ProductIndex = () => {

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const openSearch = () => {
        setIsSearchOpen(true);
    };


    return (
        <div className="grid lg:px-6 px-3">
            <div className=" bg-primary-50 lg:px-28">
                <div className="grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-6  rounded-2xl">
                    <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-6 mb-2">
                        <div className="flex justify-between pt-5">
                            <div className="grid">
                                <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                                    Productos
                                </h2>
                                <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded">
                                    <div className="flex-1 h-2 bg-primary-200">
                                    </div>
                                    <div className="flex-1 h-2 bg-primary-400">
                                    </div>
                                    <div className="flex-1 h-2 bg-primary-300">
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-1">
                                <div
                                    onClick={openSearch}
                                    className="px-2 py-2 h-fit text-white bg-primary-400 rounded-xl hover:bg-primary-500">
                                    <div className="flex justify-center items-center flex-nowrap">
                                        <FaSearch className="w-6" />
                                    </div>
                                </div>
                                <Link to={PATH_PRODUCTO_ADMIN_NEW}
                                    className="px-2 py-2 h-fit text-white bg-success-400 rounded-xl hover:bg-success-500">
                                    <div className="flex justify-center items-center flex-nowrap">
                                        <FaPlus className="w-6" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-center pb-4">
                            <ProductList />
                        </div>
                    </div>
                </div>
            </div>
            {isSearchOpen && (
                <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            )}
        </div>
    )
}

export default ProductIndex