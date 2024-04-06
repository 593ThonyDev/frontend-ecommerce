import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoaderList from "../components/LoaderList";
import { useEffect, useState } from "react";
import { Product } from "../model/Product";
import { motion } from "framer-motion";
import { getAllProductsCategory } from "../model/ProductApi";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { PATH_PRODUCTOS } from "../../../../routes/public/Paths";
import NotFoundAdmin from "../../../error/NotFoundAdmin";
import NotFoundPublic from "../../../error/NotFoundPublic";

const ProductListCategory = () => {

    const { name } = useParams();
    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchDataAndSetState = async () => {
        try {
            setIsLoading(true);
            const response = await getAllProductsCategory(currentPage, setIsLoading, name || ''); // Utilizando el operador de acceso condicional opcional (?.) o proporcionando un valor predeterminado ''
            setData(response.content);
            setTotalItems(response.totalElements);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsError(true);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAndSetState();
    }, [currentPage, name]);

    const totalPages = Math.ceil(totalItems / 12);
    const visiblePages = 12;
    const firstVisiblePage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    const lastVisiblePage = Math.min(totalPages - 1, firstVisiblePage + visiblePages - 1);
    const visiblePagesArray = Array.from({ length: lastVisiblePage - firstVisiblePage + 1 }, (_, i) => i + firstVisiblePage);

    if (firstVisiblePage > 0) {
        visiblePagesArray.unshift(-1);
    }

    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            window.scrollTo(0, 0);
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="  flex w-full justify-center">
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="grid  w-full justify-items-center lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 pb-4">
                        {
                            [...Array(12)].map((_, index) => (
                                <LoaderList key={index} />
                            ))
                        }
                    </motion.div>
                </div>
            ) : (
                <div>
                    {
                        data && data.length > 0 ? data.map(product => (
                            < div className="grid lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 pb-4 " >
                                <ProductCard key={product.idProduct} product={product}
                                />
                            </div >
                        )) : <NotFoundPublic message={"No existen registros con la categoria: " + name} />
                    }
                    {!isError && totalItems == 0 && (  // Si no hay errores, muestra información de paginación
                        <div className="bg-claro mx-auto w-full my-8">
                            <div className="grid grid-cols-1  mx-auto w-full ">
                                <div className="flex justify-center">
                                    <span className="text-md text-black-600 text-center ">
                                        Mostrando rango de
                                        <span className='font-bold p-1'>
                                            {Math.min(currentPage * 12 + 1, totalItems)}
                                        </span>
                                        al
                                        <span className='font-bold p-1'>
                                            {Math.min((currentPage + 1) * 12, totalItems)}
                                        </span>
                                        de
                                        <span className='font-bold p-1'>
                                            {totalItems}
                                        </span>
                                        productos
                                    </span>
                                </div>
                                <div className="flex justify-center pt-3">
                                    <div className='flex gap-1 text-primary-500'>
                                        <div
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`cursor-pointer p-2 text-center 
                                                ${currentPage === 0 ? 'bg-primary-500/30' : 'bg-primary-500/30'}
                                                 hover:bg-primary-200  rounded-xl hover:text-primary-500/50 text-white `}
                                        >
                                            <FaAngleLeft className=" text-2xl" />
                                        </div>
                                        {visiblePagesArray.map(page => (
                                            <div
                                                key={page}
                                                onClick={() => page === -1 ? handlePageChange(0) : handlePageChange(page)}
                                                className={`cursor-pointer p-2 px-4 text-center 
                                                    ${page === -1 ? 'bg-primary-300  hover:bg-primary-300' : (currentPage === page ? 'bg-primary-800/30 text-white font-semibold' : 'bg-primary-100 hover:bg-primary-200/70 ')}
                                                   rounded-xl `}
                                            >
                                                {page === -1 ? "1" : page + 1}
                                            </div>
                                        ))}
                                        <div className={`cursor-pointer p-2 text-center 
                                            ${currentPage === totalPages - 1 ? 'bg-primary-500/30 hover:bg-primary-300/50 ' : 'bg-primary-500/30 hover:text-primary-500/50 hover:bg-primary-200  '}  text-white rounded-xl hover:text-primary-500/50 `}
                                            onClick={() => handlePageChange(currentPage + 1)}>
                                            <FaAngleRight className=" text-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {isError && (  // Si hay un error, muestra un mensaje de error
                        <NotFoundAdmin error='404'
                            message={"No se encontraron registros con la categoria: " + name?.toUpperCase()}
                            link={PATH_PRODUCTOS}
                        />
                    )}
                </div >
            )}
        </>
    )
}

export default ProductListCategory;
