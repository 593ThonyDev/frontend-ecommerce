import { PATH_PRODUCTO_ADMIN_ID, PATH_PRODUCTO_ADMIN_NEW } from "../../../../routes/private/admin/PrivatePaths";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoaderList from "./components/LoaderList";
import { useEffect, useState } from "react";
import { Product } from "./model/Product";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllProducts } from "./model/ProductApi";
import NotFoundAdmin from "../../../error/NotFoundAdmin";

const ProductList = () => {

    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                setIsLoading(true);
                const response = await getAllProducts(currentPage, setIsLoading);
                setData(response.content);
                setTotalItems(response.totalElements);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsError(true);
                setIsLoading(false);
                if (error instanceof Error) {
                    setErrorMessage(error.message.toString().toUpperCase());
                } else {
                    setErrorMessage('Error en la solicitud. Por favor, inténtalo de nuevo más tarde');
                }
            }
        };
        fetchDataAndSetState();
    }, [currentPage]);
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
                        className="grid w-full justify-items-center lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-4 pb-4">
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
                                <div className="relative  flex w-full max-w-xs flex-col overflow-hidden rounded-2xl bg-white border border-primary-100"
                                    key={product.idProduct}>
                                    <Link to={PATH_PRODUCTO_ADMIN_ID + product.idProduct + "/" + product.name?.replace(/\s+/g, '-')}
                                        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-2xl justify-center">
                                        <img loading="lazy" className="w-full bg-primary-50 backdrop-blur-md" src={"https://" + product.img1} alt="product image" />
                                        <span className={`absolute top-0 right-0 m-2 rounded-full backdrop-blur-md px-2 text-center text-lg text-white ${product.status === "ONLINE" ? "bg-success-500/50" : ""} ${product.status === "CREATED" ? "bg-warning-500/50" : ""} ${product.status === "OFFLINE" ? "bg-danger-500/50" : ""}`}>
                                            {product.status}
                                        </span>

                                    </Link>
                                    <div className="mt-1 px-5 pb-5">
                                        <Link to={PATH_PRODUCTO_ADMIN_ID + product.idProduct + "/" + product.name?.replace(/\s+/g, '-')}>
                                            <h5 className="text-xl tracking-tight text-primary-500 font-semibold line-clamp-1">
                                                {product.name}
                                            </h5>
                                        </Link>
                                        <h5 className="flex justify-between text-md tracking-tight text-center text-primary-500 pt-1">
                                            <span className="text-black-600 font-semibold">Categoria:</span>
                                            <span className="text-black-500 line-clamp-1">{product.category?.name}</span>
                                        </h5>
                                        <h5 className="flex justify-between text-md tracking-tight text-center text-primary-500">
                                            <span className="text-black-600 font-semibold">Stock:</span>
                                            <span className="text-black-500 clamp-1">{product.stock} unidades</span>
                                        </h5>
                                        <h5 className="flex justify-between text-md tracking-tight text-center text-primary-500">
                                            <span className="text-black-600 font-semibold">Valor:</span>
                                            <span className="text-success-500 font-semibold clamp-1">USD {parseFloat(product.price.toString()).toFixed(2)}</span>
                                        </h5>
                                    </div>
                                </div>
                            </div >
                        )) : <NotFoundAdmin message="No existen productos registrados" error="201" link={PATH_PRODUCTO_ADMIN_NEW} />
                    }

                    {!isError && totalItems === 0 && (  // Si no hay errores, muestra información de paginación
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
                                        registros
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
                        <div className="flex flex-col max-h-max lg:py-36  py-16 lg:px-16 justify-center  bg-white rounded-2xl">
                            <div className='text-9xl text-center'>
                                🔊
                            </div>
                            <br />
                            <div className=' text-3xl text-center lg:px-16 text-red-500'>
                                {errorMessage}
                            </div>
                        </div>
                    )}
                </div >
            )}
        </>
    )
}

export default ProductList;
