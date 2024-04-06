import Home from "./Home"
import ArticlesList from "../blog/ArticlesList"
import MyTeam from "../employe/MyTeam"

const HomeIndex = () => {

    return (
        <div className=" grid h-full grid-cols-1">
            <div className="col-span-1 h-fit w-full xl:col-span-1 md:col-span-1 2xl:col-span-2">
                <Home />
                <div className="lg:px-16">
                    <div className="w-full backdrop-blur-xl bg-primary-50/70 pb-2 pt-1 z-20 my-2 ">
                        <div className="grid grid-cols-1 w-full">
                            <div className="w-full grid px-3">
                                <h2 className="text-lg font-bold text-black-500 md:text-xl uppercase">
                                    Articulos publicados
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
                </div>
                <div className=" bg-primary-200">
                    <MyTeam />
                </div>
            </div>
        </div>
    )
}

export default HomeIndex