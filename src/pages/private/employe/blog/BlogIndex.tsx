import { FaPlus } from "react-icons/fa"
import { Link } from "react-router-dom"
import ArticlesList from "./ArticlesList"
import { PATH_ARTICLE_EMPLOYE_NEW } from "../../../../routes/private/employe/PrivatePathsEmploye"

const BlogIndex = () => {
    return (
        <div className="grid lg:py-5 py-2 lg:px-32">
            <div className="flex justify-between lg:px-0 px-3">
                <div className="grid">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl uppercase dark:text-gray-300">
                        Blog
                    </h2>
                    <div className="flex w-32 mb-2.5 overflow-hidden rounded">
                        <div className="flex-1 h-2 bg-primary-200">
                        </div>
                        <div className="flex-1 h-2 bg-primary-400">
                        </div>
                        <div className="flex-1 h-2 bg-primary-300">
                        </div>
                    </div>
                </div>
                <div className="grid gap-x-1">                   
                    <Link to={PATH_ARTICLE_EMPLOYE_NEW}
                        className="px-2 py-2 h-fit text-white bg-success-400 rounded-xl hover:bg-success-500">
                        <div className="flex justify-center items-center flex-nowrap">
                            <FaPlus className="w-6" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex">
                <ArticlesList />
            </div>

        </div>
    )
}

export default BlogIndex