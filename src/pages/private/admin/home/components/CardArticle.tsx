import { formatDate } from "../../../../../functions/Funtions"
import React from "react"
import { Link } from "react-router-dom"
import { PATH_ARTICLE_ADMIN_VIEW_ID, PATH_EMPLEADO_ADMIN_ID } from "../../../../../routes/private/admin/PrivatePaths"
import { ArticleDto } from "../../blog/model/Article"

const CardArticle: React.FC<ArticleDto> = (props) => {
    return (
        <div className="group sm:flex rounded-xl dark:focus:ring-black-600 bg-primary-100 lg:border lg:border-black-100">            
            <div className="grow">
                <div className="p-4 flex flex-col h-full sm:p-6">
                    <Link to={PATH_ARTICLE_ADMIN_VIEW_ID + props.idArticle} className="text-lg sm:text-2xl w-fit font-bold hover:text-primary-800 text-primary-600 uppercase line-clamp-2">
                        {props.title}
                    </Link>
                    <p className="mt-2 text-black-600 dark:text-gray-400 line-clamp-3">
                        {props.description}
                    </p>

                    <div className="mt-5 sm:mt-auto">
                        <div className="flex items-center">
                            <Link
                                to={PATH_EMPLEADO_ADMIN_ID + props.employe.idEmploye + "/" + props.employe.fullName.replace(/\s+/g, '-')}
                                className="flex-shrink-0">
                                <img className="size-[46px] rounded-full bg-black-100 border border-primary-200"
                                    src={"https://" + props.employe.photo}
                                    alt="Image Description" />
                            </Link>
                            <div className="ms-2">
                                <Link
                                    to={PATH_EMPLEADO_ADMIN_ID + props.employe.idEmploye + "/" + props.employe.fullName.replace(/\s+/g, '-')}
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