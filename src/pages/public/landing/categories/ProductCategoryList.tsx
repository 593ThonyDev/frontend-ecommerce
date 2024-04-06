import { PATH_PRODUCTOS_CATEGORY_NAME } from "../../../../routes/public/Paths";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoaderList from "./components/LoaderList";
import { Category } from "./model/Category";
import { getAllCategories } from "./model/CategoryApi";
import { Link } from "react-router-dom";

const ProductCategoryList = () => {

    const [data, setData] = useState<Category[]>([]);
    const [currentPage,] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, [currentPage]);


    const fetchData = () => {

        const fetchDataAndSetState = async () => {
            try {
                setIsLoading(true);
                const response = await getAllCategories(currentPage, setIsLoading);
                setData(response.content);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            }
        };
        fetchDataAndSetState();
    };



    return (
        <>
            {isLoading ? (
                <>
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="relative -mb-16 lg:mx-48 mt-5 backdrop-blur-md z-10">
                        {
                            <div className="container flex flex-row justify-around mx-auto bg-primary-200 md:rounded-3xl sm:rounded-3xl lg:rounded-3xl pb-6 lg:py-1 py-5 backdrop-blur-md">
                                <div className="max-w-[1640px] m-auto">
                                    <h1 className="text-white font-bold text-4xl text-center py-1 pt-3 pb-2 px-2">
                                        Categorias de nuestros servicios
                                    </h1>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:px-2 px-4 lg:pb-2 w-full">
                                        {
                                            [...Array(4)].map((_, index) => (
                                                <LoaderList key={index} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </motion.div>
                </>
            ) : (
                <div className=' relative -mb-16 lg:mx-48 mt-5'>
                    <div className="container flex flex-row justify-around mx-auto bg-primary-200 md:rounded-3xl sm:rounded-3xl lg:rounded-3xl pb- lg:py-1 py-5">
                        <div className="max-w-[1640px] m-auto">
                            <h1 className="text-white font-bold text-4xl text-center py-1 pt-3 pb-2 px-2">
                                Categorias de nuestros servicios
                            </h1>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:px-2 px-4 lg:pb-2">
                                {data.map((item, index) => (
                                    <Link
                                        to={PATH_PRODUCTOS_CATEGORY_NAME + item.name?.replace(/\s+/g, '-')}
                                        key={index}
                                        className="bg-gray-100 p-2 hover:bg-primary-100 cursor-pointer duration-500 rounded-lg  flex"
                                    >
                                        <img src={item.img ? "https://" + item.img : ""} alt={item.name} className="w-10 h-10 rounded-md my-auto" />
                                        <h2 className="text-sm font-semibold my-auto pl-2 line-clamp-2 text-primary-500">{item.name}</h2>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ProductCategoryList