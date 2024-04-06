import { useState, useEffect } from "react";
import { ArticleDto } from "../blog/model/Article";
import { getAllProducts } from "../blog/model/ArticleApi";
import CardArticle from "./components/CardArticle";

const ArticlesList = () => {

    const [data, setData] = useState<ArticleDto[]>([]);
    const [, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchDataAndSetState();
    }, []);

    const fetchDataAndSetState = async () => {
        try {
            setIsLoading(true);
            const response = await getAllProducts(0, setIsLoading);
            setData(response.content);
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

            <div>
                < div className="grid md:grid-cols-1 gap-3" >
                    {
                        data.map(article => (
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
                        ))
                    }

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
        </>
    )
}

export default ArticlesList