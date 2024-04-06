import React from "react"
import ArticlesList from "./ArticleList"

const BlogEmploye = () => {
    return (
        <React.Fragment>
            <div className=" w-full justify-center flex-1 max-w-6xl mx-auto md:px-6 lg:pt-8">
                <div className=" sticky top-16 w-full backdrop-blur-xl bg-primary-50/70 pb-2 pt-1 z-20 mb-2">
                    <div className="grid grid-cols-1 w-full">
                        <div className="w-full grid px-3">
                            <h2 className="text-lg font-bold text-black-500 md:text-xl uppercase">
                                Articulos creados
                            </h2>
                            <div className="flex w-32 mt-1 overflow-hidden rounded">
                                <div className="flex-1 h-2 bg-primary-200">
                                </div>
                                <div className="flex-1 h-2 bg-primary-400">
                                </div>
                                <div className="flex-1 h-2 bg-primary-300">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ArticlesList />
            </div >
        </React.Fragment>
    )
}

export default BlogEmploye