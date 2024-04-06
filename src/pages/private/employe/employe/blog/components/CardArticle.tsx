import { ArticleDto } from "../model/Article"
import React from "react"
import { Link } from "react-router-dom"
import { formatDate } from "../../../../../../functions/Funtions"
import { PATH_ARTICLE_EMPLOYE_VIEW_ID, PATH_EMPLEADO_EMPLOYE_ID } from "../../../../../../routes/private/employe/PrivatePathsEmploye"
const CardArticle: React.FC<ArticleDto> = (props) => {
    return (
        <div className="group sm:flex lg:rounded-xl dark:focus:ring-black-600 bg-white lg:border lg:border-black-100">
            <div className="flex-shrink-0 relative lg:rounded-s-xl overflow-hidden w-full h-[200px] sm:w-[250px] sm:h-[350px]">
                <Link to={PATH_ARTICLE_EMPLOYE_VIEW_ID + props.idArticle}>
                    <img className="size-full absolute top-0 start-0 object-cover ring-0 bg-black-100"
                        src={"https://" + props.portada}
                    />
                </Link>
            </div>

            <div className="grow">
                <div className="p-4 flex flex-col h-full sm:p-6">
                    <Link to={PATH_ARTICLE_EMPLOYE_VIEW_ID + props.idArticle} className="text-lg sm:text-2xl w-fit font-bold hover:text-primary-800 text-primary-600 uppercase line-clamp-2">
                        {props.title}
                    </Link>
                    <p className="mt-2 text-black-600 dark:text-gray-400 line-clamp-5">
                        {props.description}
                    </p>

                    <div className="mt-5 sm:mt-auto">
                        <div className="flex items-center">
                            <Link
                                to={PATH_EMPLEADO_EMPLOYE_ID + props.employe.idEmploye + "/" + props.employe.fullName.replace(/\s+/g, '-')}
                                className="flex-shrink-0">
                                <img className="size-[46px] rounded-full bg-black-100 border border-primary-200"
                                    src={"https://" + props.employe.photo}
                                    alt="Image Description" />
                            </Link>
                            <div className="ms-2">
                                <Link
                                    to={PATH_EMPLEADO_EMPLOYE_ID + props.employe.idEmploye + "/" + props.employe.fullName.replace(/\s+/g, '-')}
                                    className="font-semibold text-black-500 hover:text-black-700 line-clamp-1">
                                    {props.employe.fullName}
                                </Link>
                                <p className="text-xs text-black-500 line-clamp-1">
                                    {formatDate(props.created)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardArticle