import Stadistics from "./Stadistics"
import Home from "./Home"
import ArticlesList from "./ArticlesList"

const HomeIndex = () => {

    return (
        <div className="lg:bg-white grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3 px-4">
            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                <div className=" grid h-full grid-cols-1">
                    <div className="col-span-1 h-fit w-full xl:col-span-1 md:col-span-1 2xl:col-span-2">
                        <Home />
                        <Stadistics />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 h-fit lg:sticky lg:top-20 overflow-y-scroll scroll-hidden pb-3">
                <span className=" text-primary-500 pb-3 text-xl">Articulos publicados recientemente</span>
                <ArticlesList/>
            </div>
        </div>
    )
}

export default HomeIndex