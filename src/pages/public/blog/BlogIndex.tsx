import ArticlesList from "./ArticlesList"

const BlogIndex = () => {
    return (
        <div className="grid lg:py-5 py-2 lg:px-32 bg-white">
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
               
            </div>
            <div className="flex">
                <ArticlesList />
            </div>

        </div>
    )
}

export default BlogIndex