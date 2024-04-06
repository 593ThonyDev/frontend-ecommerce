import { BsSearch } from "react-icons/bs"
import ProductList from "./ProductList";
import ProductCategoryIndex from "../product-category/ProductCategoryIndex";
import { useState } from "react";
import ProductSearch from "./ProductSearch";
import { scrollTop } from "../../../functions/Funtions";

const ProductIndex = () => {
    scrollTop();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const openSearch = () => {
        setIsSearchOpen(true);
    };

    return (
        <div className=" bg-primary-50 lg:px-8">
            <div className="grid h-full grid-cols-1  rounded-2xl">


                <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-5 mb-2 px-5">
                    <div className="flex justify-between z-20 py-2 bg-primary-50">
                        <div className="lg:px-0">
                            <h2 className=" text-xl font-bold text-primary-900">
                                Productos
                            </h2>
                            <div className="flex flex-row-reverse w-32 mt-1 overflow-hidden rounded">
                                <div className="flex-1 h-2 bg-primary-200">
                                </div>
                                <div className="flex-1 h-2 bg-primary-400">
                                </div>
                                <div className="flex-1 h-2 bg-primary-300">
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-0 ">
                            <div className="cursor-pointer hover:bg-primary-400 flex bg-primary-300 h-fit py-0.5 px-2 rounded-xl justify-center text-white text-xl"
                                onClick={openSearch}>
                                <BsSearch className=" font-bold my-auto" />
                                <div className="my-auto pb-1">Buscar</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <ProductList />
                    </div>
                </div>
                <div className="px-2 lg:grid grid-cols h-fit lg:border-r-2 border-primary-50">
                    <div className=" pb-4 text-md font-bold text-black-400 px-2">Filtrar por categorias</div>
                    <ProductCategoryIndex />
                </div>

            </div>
            {isSearchOpen && (
                <ProductSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            )}
        </div>
    )
}

export default ProductIndex