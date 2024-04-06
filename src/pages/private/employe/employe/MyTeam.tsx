
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Employe } from "./model/Employe";
import { Link } from "react-router-dom";
import { PATH_EMPLEADO_EMPLOYE_ID } from "../../../../routes/private/employe/PrivatePathsEmploye";
import { formatDate } from "../../../../functions/Funtions";
import { getAllEmployes } from "../../admin/employe/model/EmployeApi";

const MyTeam = () => {

    const [data, setData] = useState<Employe[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                setIsLoading(true);
                const response = await getAllEmployes(currentPage, setIsLoading);
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
        }
    };

    return (
        <div>
            <div className="grid w-full justify-center py-4">
                <h2 className="py-2 text-xl font-bold text-center text-white md:text-4xl uppercase dark:text-gray-300">
                    Nuestro equipo
                </h2>
                <div className="flex w-32 mb-2.5 overflow-hidden rounded mx-auto">
                    <div className="flex-1 h-2 bg-primary-100">
                    </div>
                    <div className="flex-1 h-2 bg-primary-400">
                    </div>
                    <div className="flex-1 h-2 bg-primary-300">
                    </div>
                </div>
            </div>
            {isLoading ? (
                null
            ) : (
                <div className="w-full justify-center">
                    < div className="grid lg:grid-cols-4  md:grid-cols-2 gap-5 w-full lg:px-16" >
                        {
                            data.map(employe => (
                                <Link to={PATH_EMPLEADO_EMPLOYE_ID + employe.idEmploye + "/" + employe.fullName?.replace(/\s+/g, '-')} className="border border-primary-400/40 flex-shrink-0 relative overflow-hidden bg-primary-100 rounded-3xl max-w-xs mx-auto w-full h-screen/2">
                                    <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: 1 }}>
                                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                                    </svg>
                                    <div className="relative flex items-center justify-center">
                                        <img className="w-full h-64 max-h-64 bg-primary-300/20 backdrop-blur-md" src={"https://" + employe.photo} alt="" />
                                    </div>
                                    <div className="relative text-white px-6 py-6">
                                        <span className="block font-semibold text-xl text-center line-clamp-1 text-primary-500">{employe.fullName}</span>
                                        <span className="block opacity-75 -mb-1 text-center text-black-400">{formatDate(employe.created)}</span>
                                    </div>
                                </Link>
                            ))
                        }
                    </div >
                    {!isError && (
                        <div className="bg-claro mx-auto w-full py-8">
                            <div className="grid grid-cols-1 mx-auto w-full ">
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
                                        empleados
                                    </span>
                                </div>
                                <div className="flex justify-center pt-3">
                                    <div className='flex gap-1 text-primary-500'>
                                        <div
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`cursor-pointer p-2 text-center 
                                                ${currentPage === 0 ? 'bg-primary-500/30' : 'bg-primary-500/30'} hover:bg-primary-200  rounded-xl hover:text-primary-500/50 text-white `}
                                        >
                                            <FaAngleLeft className=" text-2xl" />
                                        </div>
                                        {visiblePagesArray.map(page => (
                                            <div
                                                key={page}
                                                onClick={() => page === -1 ? handlePageChange(0) : handlePageChange(page)}
                                                className={`cursor-pointer p-2 rounded-xl px-4 text-center 
                                                    ${page === -1 ? 'bg-primary-300  hover:bg-primary-300' : (currentPage === page ? 'bg-primary-800/30 text-white font-semibold' : 'bg-primary-100 hover:bg-primary-200/70 ')}rounded-xl `}
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
                    {isError && (
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
        </div>
    )
}

export default MyTeam;
