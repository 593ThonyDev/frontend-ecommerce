import LoaderHeroEdit from "./components/LoaderHeroEdit";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { HeroModel } from "../home/model/HeroModel";
import { getData, updateHero, uploadImage } from "../home/model/HeroApi";
import InputField from "../../../../components/fields/InputField";
import TextArea from "../../../../components/fields/TextArea";
import { PATH_ADMIN_HOME } from "../../../../routes/private/admin/PrivatePaths";
import { Link, useNavigate } from "react-router-dom";
import { BiCamera } from "react-icons/bi";

const HeroEdit = () => {

    const navigate = useNavigate();
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


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, imageKey: "img1" | "img2" | "img3", fetchData: () => void, toast: any) => {
        const file = event.target.files?.[0] ?? null;
        if (file) {
            uploadImage(file, imageKey, fetchData, toast);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validarHero(formData);
        if (camposFaltantes.length === 0) {
            const loadingToast = toast.loading('Guardando registro...');
            try {
                const savedSuccessfully = await updateHero(formData);
                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_ADMIN_HOME);
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")} del hero`);
        }
    };

    const validarHero = (heroData: HeroModel) => {
        const camposFaltantes: string[] = [];
        if (!heroData.slogan) camposFaltantes.push("slogan");
        if (!heroData.description) camposFaltantes.push("descripcion");
        return camposFaltantes;
    };


    return (
        <div className="flex">
            {loading ? (
                <LoaderHeroEdit />
            ) : (
                <div className="w-full">
                    <section className="overflow-hidden bg-white lg:pb-36 lg:py-10 font-poppins">
                        <div className="max-w-6xl px-4  mx-auto md:px-6">
                            <div className="flex flex-wrap -mx-4 py-3">
                                <div className="w-full px-4 md:w-1/2">

                                    <div className="sticky top-0 z-10 overflow-hidden ">
                                        <div className="flex justify-center">
                                            <div className="relative w-fit h-80">
                                                <img loading="lazy" src={"https://" + getCurrentImageUrl()} alt=""
                                                    className="w-full h-full rounded-3xl" />
                                            </div>
                                        </div>
                                        <div className="flex pt-3">
                                            <div className="w-1/3 p-2">
                                                <div
                                                    className={`block rounded-3xl`}>
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInput1">
                                                                <div className="absolute cursor-pointer top-2 p-1 text-2xl hover:bg-primary-500/70 bg-primary-500 backdrop-blur-md text-white rounded-full right-2">
                                                                    <BiCamera />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInput1"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, "img1", fetchDataAndSetState, toast)}
                                                        />
                                                    </div>
                                                    <img loading="lazy" src={formData.img1 ? "https://" + formData.img1 : ""} alt=""
                                                        className="w-full h-32 rounded-3xl bg-primary-50" />
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-2">
                                                <div
                                                    className={`block rounded-3xl`}
                                                >
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInput2">
                                                                <div className="absolute cursor-pointer top-2 p-1 text-2xl hover:bg-primary-500/70 bg-primary-500 backdrop-blur-md text-white rounded-full right-2">
                                                                    <BiCamera />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInput2"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, "img2", fetchDataAndSetState, toast)}
                                                        />
                                                    </div>
                                                    <img loading="lazy" src={formData.img2 ? "https://" + formData.img2 : ""} alt=""
                                                        className="w-full h-32 rounded-3xl bg-primary-50" />
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-2">
                                                <div
                                                    className={`block rounded-3xl`}
                                                >
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInput3">
                                                                <div className="absolute cursor-pointer top-2 p-1 text-2xl hover:bg-primary-500/70 bg-primary-500 backdrop-blur-md text-white rounded-full right-2">
                                                                    <BiCamera />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInput3"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, "img3", fetchDataAndSetState, toast)}
                                                        />
                                                    </div>
                                                    <img loading="lazy" src={formData.img3 ? "https://" + formData.img3 : ""} alt=""
                                                        className="w-full h-32 rounded-3xl bg-primary-50" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className=" text-black-300 px-2">Se recomienda que las imagenes sean de ("507px x 600px") </span>
                                    </div>
                                </div>
                                <div className="w-full px-4 md:w-1/2 grid">
                                    <div className="lg:pl-20 h-2/3 ">
                                        <div className="flex justify-between">
                                            <div className=" flex flex-col relative z-20 lg:pt-1 pt-4">
                                                <span className="w-44 h-2 bg-warning-500 mb-3 lg:mb-1" />
                                                <h1 className="font-bebas-neue uppercase text-5xl font-black flex  text-primary-500">
                                                    <span className="">Editar el hero</span>
                                                </h1>
                                                <span className="w-28 h-2 bg-warning-500 mt-3 lg:mb-1" />
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} autoComplete="false">

                                            <div className="my-10 grid gap-y-2">
                                                <InputField
                                                    label="Slogan:"
                                                    placeholder="Escribe el slogan para tu publico"
                                                    onChange={handleChange}
                                                    id="slogan"
                                                    value={formData.slogan}
                                                />
                                                <TextArea
                                                    label="¿A qué se dedica tu empresa?"
                                                    placeholder={""}
                                                    value={formData.description}
                                                    id="description"
                                                    onChange={handleChange}
                                                    rows={5}
                                                />
                                            </div>
                                            <div className="flex justify-center gap-x-5 mb-5">
                                                <Link
                                                    to={PATH_ADMIN_HOME}
                                                    className="bg-danger-400 hover:bg-danger-500 py-2 px-4 rounded-xl text-white"
                                                >
                                                    Cancelar
                                                </Link>
                                                <button
                                                    type="submit"
                                                    className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-4 rounded-xl cursor-pointer"
                                                >
                                                    Actualizar Hero
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div >
    )
}

export default HeroEdit;
