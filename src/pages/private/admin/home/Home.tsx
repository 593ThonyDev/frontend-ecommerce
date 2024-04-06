import React, { useEffect, useState } from "react";
import { HeroModel } from "./model/HeroModel";
import { getData } from "./model/HeroApi";
import LoaderHome from "./components/LoaderHome";
import DropdownItem, { Dropdown } from "../../../../components/dropdown/DropDownOptions";
import { PATH_ADMIN_HERO_EDIT } from "../../../../routes/private/admin/PrivatePaths";

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
        loading ? (
            <LoaderHome />
        ) : (
            <React.Fragment>
                <div className="bg-primary-50 lg:bg-primary-100 flex relative z-20 items-center overflow-hidden rounded-3xl my-4">
                    <div className="container mx-auto lg:px-6 pl-3 flex relative flex-col-reverse sm:flex-row">
                        <div className="sm:w-2/3 lg:w-3/5 flex flex-col relative z-20 lg:pt-8">
                            <span className="w-28 h-2 bg-warning-500 mb-0"/>
                            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none text-primary-500">
                                {formData.slogan.slice(0, 6)}
                                <span className="text-4xl sm:text-6xl">
                                    {formData.slogan.slice(7, formData.slogan.length)}
                                </span>
                            </h1>
                            <p className="text-sm sm:text-base text-black-500 dark:text-white pt-2">
                                {formData.description}
                            </p>
                        </div>
                        <div className="sm:w-1/3 lg:w-3/5 relative pb-4">
                            <img src={"https://" + getCurrentImageUrl()} className="max-w-xs md:max-w-sm m-auto sm:mt-0 " alt={`img${currentSlide + 1}`} />
                        </div>
                    </div>
                    <div className="absolute right-3 top-3">
                        <Dropdown label={"•••"}>
                            <DropdownItem path={PATH_ADMIN_HERO_EDIT } text={"Editar hero section"} />
                        </Dropdown>
                    </div>
                </div>
            </React.Fragment>
        )
    );
}

export default Home;
