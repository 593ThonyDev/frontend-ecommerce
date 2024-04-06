import { Category } from "./model/Category";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getAllCategories } from "./model/CategoryApi";
import LoaderList from "./components/LoaderList";
import { PATH_PRODUCTOS, PATH_PRODUCTOS_CATEGORY_NAME } from "../../../routes/public/Paths";
import NotFoundAdmin from "../../error/NotFoundAdmin";
import { scrollTop } from "../../../functions/Funtions";

const ProductCategoryIndex = () => {

    scrollTop();
    const [data, setData] = useState<Category[]>([]);
    const [currentPage,] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchData();
    }, [currentPage]);


    const fetchData = () => {

        const fetchDataAndSetState = async () => {
            try {
                setIsLoading(true);
                const response = await getAllCategories(currentPage, setIsLoading);
                setData(response.content);
                setTotalItems(response.totalElements);
            } catch (error) {
                console.error("Error fetching data:", error);
                setIsError(true);
                setIsLoading(false);
            }
        };
        fetchDataAndSetState();
    };

    const totalPages = Math.ceil(totalItems / 100);

    const visiblePages = 100;
    const firstVisiblePage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    const lastVisiblePage = Math.min(totalPages - 1, firstVisiblePage + visiblePages - 1);
    const visiblePagesArray = Array.from({ length: lastVisiblePage - firstVisiblePage + 1 }, (_, i) => i + firstVisiblePage);

    if (firstVisiblePage > 0) {
        visiblePagesArray.unshift(-1);
    }


    return (
        <>
            {isLoading ? (
                <>
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-4 grid-cols-2 gap-2 w-full px-2 pb-6">
                        {
                            [...Array(8)].map((_, index) => (
                                <LoaderList key={index} />
                            ))
                        }
                    </motion.div>
                </>
            ) : (
                <div className=" w-full px-2">
                    < div className="grid lg:grid-cols-4 grid-cols-2 gap-2 w-full pb-6" >
                        {
                            data.map(category => (
                                <Link to={PATH_PRODUCTOS_CATEGORY_NAME + category.name?.replace(/\s+/g, '-')}
                                    className="flex h-fit items-start justify-between cursor-pointer bg-primary-100 hover:rounded-xl rounded-xl" key={category.name}
                                >
                                    <div className="flex items-center gap-3 p-1 w-full rounded-xl hover:bg-black-100/50">
                                        <div className="relative h-10 max-h-10 w-10 items-start justify-start rounded-full">
                                            <img src={"https://" + category.img} className="h-10 max-h-10 max-w-10 w-10 rounded-lg" />
                                        </div>
                                        <div className="lg:flex lg:justify-between grid w-full">
                                            <div className="grid">
                                                <h5 className=" line-clamp-1 text-base font-bold text-black-700 dark:text-white">
                                                    {category.name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div >
                    {isError && (
                        <NotFoundAdmin error='404'
                            message='Registro no encontrado'
                            link={PATH_PRODUCTOS}
                        />
                    )}
                </div >
            )}
        </>
    )
}

export default ProductCategoryIndex;
