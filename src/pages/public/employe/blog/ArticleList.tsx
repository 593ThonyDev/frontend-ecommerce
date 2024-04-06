import { getAllArticlesByEmploye } from "./model/ArticleApi";
import { useState, useEffect } from "react";
import { ArticleDto } from "./model/Article";
import { motion } from "framer-motion";
import LoaderList from "./components/LoaderList";
import CardArticle from "./components/CardArticle";
import { useParams } from "react-router-dom";
import NotFoundPublic from "../../../error/NotFoundPublic";

const ArticlesList = () => {

    const { id } = useParams()
    const [data, setData] = useState<ArticleDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchDataAndSetState();
    }, []);

    const fetchDataAndSetState = async () => {
        try {
            setIsLoading(true);
            const response = await getAllArticlesByEmploye(id ? id : "1", setIsLoading);
            setData(response);
            console.log(data)
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


    return (
        <>
            {isLoading ? (
                <div className="  flex w-full justify-center">
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6 w-full">
                        {
                            [...Array(12)].map((_, index) => (
                                <LoaderList key={index} />
                            ))
                        }
                    </motion.div>
                </div>
            ) : (
                <div>
                    < div className="grid lg:grid-cols-2 md:grid-cols-1 lg:gap-6 pb-6" >
                        {data && data.length > 0 ? data.map((article) => (
                            <CardArticle
                                key={article.idArticle}
                                idArticle={article.idArticle}
                                title={article.title}
                                description={article.description}
                                portada={article.portada}
                                status={article.status}
                                created={article.created}
                                employe={{
                                    idEmploye: article.employe.idEmploye,
                                    fullName: article.employe.fullName,
                                    photo: article.employe.photo
                                }}
                            />
                        )):<NotFoundPublic error="201" message="No existen articulos publicados por este autor" link=""/>}

                    </div >
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

export default ArticlesList