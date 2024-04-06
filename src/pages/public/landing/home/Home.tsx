import { Link } from "react-router-dom";
import { PATH_NOSOTROS, PATH_PRODUCTOS } from "../../../../routes/public/Paths";
import { useState, useEffect } from "react";
import { getData } from "../../../private/admin/home/model/HeroApi";
import { HeroModel } from "../../../private/admin/home/model/HeroModel";
import LoaderHome from "./components/LoaderHome";
import { Helmet } from "react-helmet";

const Home = () => {

    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [formData, setFormData] = useState<HeroModel>({
        slogan: "",
        description: "",
        img1: undefined,
        img2: undefined,
        img3: undefined,
    });

    const fetchDataAndSetState = async () => {
        try {
            setLoading(true);
            const data = await getData();
            setTimeout(() => {
                setFormData(data);
                setLoading(false);
            }, 800);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataAndSetState();
    }, []);

    const getCurrentImageUrl = () => {
        switch (currentSlide) {
            case 0:
                return formData.img1;
            case 1:
                return formData.img2;
            case 2:
                return formData.img3;
            default:
                return undefined;
        }
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 2 ? 0 : prevSlide + 1));
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 8000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        loading ? <LoaderHome /> :
            <div className="bg-primary-50 flex relative z-20 items-center overflow-hidden">
                <Helmet>
                    <meta name="description" content={formData.slogan} />
                    <meta name="content" content={formData.description} />
                    <meta name="keywords" content="Fundacion Gotitas del Rocio, Apoya a una gran causa" />
                </Helmet>
                <div className="container mx-auto px-6 flex relative py-4 lg:py-16 flex-col-reverse sm:flex-row">
                    <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20 lg:pt-8 lg:pl-16">
                        <span className="w-28 h-2 bg-warning-500 mb-0" />
                        <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none text-primary-500">
                            {formData.slogan.slice(0, 6)}
                            <span className="text-4xl sm:text-7xl">
                                {formData.slogan.slice(7, formData.slogan.length)}
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base text-black-500 dark:text-white pt-2">
                            {formData.description}
                        </p>
                        <div className="flex mt-4">
                            <Link to={PATH_PRODUCTOS} className="uppercase py-2 px-4 rounded-xl bg-warning-400 border-transparent text-white text-md mr-4 hover:bg-warning-500 font-bold">
                                Ayudanos
                            </Link>
                            <Link to={PATH_NOSOTROS} className="uppercase py-2 px-4 rounded-xl bg-transparent border-2 border-warning-400 text-warning-400 text-md hover:border-warning-500 hover:text-warning-500 font-bold">
                                Conocenos
                            </Link>
                        </div>
                    </div>
                    <div className="sm:w-1/3 lg:w-3/5 relative pb-4 -mt-2">
                        <img src={"https://" + getCurrentImageUrl()} className="max-w-xs md:max-w-sm m-auto sm:mt-0 " alt={`img${currentSlide + 1}`} />
                    </div>
                </div>
            </div>
    );
}

export default Home;
