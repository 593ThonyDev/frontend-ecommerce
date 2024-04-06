import React, { useState, useEffect } from "react";
import { AboutModel } from "./model/About";
import { getDataHero, updateAbout, uploadImage } from "./model/AboutApi";
import LoaderAbout from "./componets/LoaderAbout";
import TextArea from "../../../../components/fields/TextArea";
import toast from "react-hot-toast";
import { BiCamera } from "react-icons/bi";
import { PATH_ADMIN_ABOUT } from "../../../../routes/private/admin/PrivatePaths";
import { useNavigate } from "react-router-dom";

const AboutEdit = () => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AboutModel>({
        paragraph1: "",
        paragraph2: "",
        paragraph3: "",
        img1: "",
        img2: "",
        img3: ""
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getDataHero();
            setTimeout(() => {
                setFormData(data.content);
                setLoading(false);
            }, 800);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, imageKey: "img1" | "img2" | "img3", fetchData: () => void, toast: any) => {
        const file = event.target.files?.[0] ?? null;
        if (file) {
            uploadImage(file, imageKey, fetchData, toast);
        }
    };


    const validarAbout = (productData: AboutModel) => {
        const camposFaltantes: string[] = [];
        if (!productData.paragraph1) camposFaltantes.push("descripcion");
        if (!productData.paragraph2) camposFaltantes.push("mision");
        if (!productData.paragraph3) camposFaltantes.push("vision");
        return camposFaltantes;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validarAbout(formData);
        if (camposFaltantes.length === 0) {

            const loadingToast = toast.loading('Guardando registro...');
            try {
                const savedSuccessfully = await updateAbout(formData);
                if (savedSuccessfully) {
                    toast.dismiss(loadingToast);
                    navigate(PATH_ADMIN_ABOUT);
                } else {
                    toast.dismiss(loadingToast);
                }
            } catch (error) {
                toast.dismiss(loadingToast);
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")} de esta seccion`);
        }
    };


    return (loading ? <LoaderAbout /> :
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className="flex w-full justify-between sticky top-16 z-20 bg-white lg:px-14 px-3 py-2 border-b border-primary-100">
                    <div className=" uppercase my-auto font-semibold text-primary-400">Editar Seccion</div>
                    <button
                        type="submit"
                        className="text-white bg-primary-500 hover:bg-primary-600 py-1.5 px-3 rounded-full cursor-pointer"
                    >
                        Guardar cambios
                    </button>
                </div>
                <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0 bg-primary-200">
                    <div className="inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                        <svg
                            className="absolute left-0 hidden h-full text-warning-100 transform -translate-x-1/2 lg:block"
                            viewBox="0 0 100 100"
                            fill="currentColor"
                            preserveAspectRatio="none slice"
                        >
                            <path d="M50 0H100L50 100H0L50 0Z" />
                        </svg>
                        <div className="object-cover w-full h-56 rounded-2xl shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full">

                            <img
                                className="object-cover w-full h-56 rounded-2xl shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
                                src={"https://" + formData.img1}
                                alt=""
                            />
                            <div className=" relative">
                                <label htmlFor="fileInput1" className="absolute bottom-3 right-2 bg-primary-300/50 hover:bg-primary-300 backdrop-blur-lg p-3 rounded-full text-white">
                                    <BiCamera className="h-5 w-5" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="fileInput1"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, "img1", fetchData, toast)}
                                />
                            </div>
                        </div>


                    </div>
                    <div className="relative flex flex-col items-start w-full  px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                        <div className="mb-16 lg:my-52 lg:max-w-lg lg:pr-5 w-full">
                            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                NOSOTROS
                            </h2>
                            <div className="pr-5 mb-5 text-base text-black-500 md:text-lg">
                                <TextArea
                                    onChange={(e) => setFormData({ ...formData, paragraph1: e.target.value })}
                                    value={formData.paragraph1}
                                    placeholder={""}
                                    rows={6}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-20 bg-warning-50">
                    <div className="container m-auto px-6">
                        <div className="lg:flex justify-between items-center">
                            <div className="lg:w-5/12 order-1"
                                style={{ transform: 'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)' }}
                            >
                                <img
                                    src={"https://" + formData.img2}
                                    alt={formData.paragraph2}
                                    className="rounded-2xl"
                                />
                                <label htmlFor="fileInput2" className="absolute top-2 right-2 bg-primary-300/50 hover:bg-primary-300 backdrop-blur-lg p-3 rounded-full text-white">
                                    <BiCamera className="h-5 w-5" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="fileInput2"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, "img2", fetchData, toast)}
                                />

                            </div>
                            <div className="lg:w-6/12 lg:p-0 py-7 lg:px-7 order-2">
                                <div className="lg:p-0 p-7">
                                    <h1 className="text-3xl font-bold leading-tight mb-5 text-primary-400 uppercase">
                                        Nuestra mision
                                    </h1>
                                    <TextArea
                                        placeholder={""}
                                        rows={6}
                                        value={formData.paragraph2}
                                        onChange={(e) => setFormData({ ...formData, paragraph2: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-16 bg-success-100">
                    <div className="container m-auto px-6">

                        <div className="lg:flex justify-between items-center">
                            <div className="lg:w-6/12 lg:p-0 py-7">
                                <h1 className="text-3xl font-bold leading-tight mb-5 text-warning-400 uppercase">
                                    Nuestra vision
                                </h1>
                                <TextArea
                                    placeholder={""}
                                    rows={6}
                                    value={formData.paragraph3}
                                    onChange={(e) => setFormData({ ...formData, paragraph3: e.target.value })}
                                />
                            </div>
                            <div className="lg:w-5/12 order-2"
                                style={{ transform: 'scale(1) perspective(1040px) rotateY(11deg) rotateX(2deg) rotate(-2deg)' }}
                            >
                                <img
                                    src={"https://" + formData.img3}
                                    alt={formData.paragraph3}
                                    className="rounded-2xl"
                                />
                                <label htmlFor="fileInput3" className="absolute top-2 right-2 bg-primary-300/50 hover:bg-primary-300 backdrop-blur-lg p-3 rounded-full text-white">
                                    <BiCamera className="h-5 w-5" />
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="fileInput3"
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileChange(e, "img3", fetchData, toast)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    )
}

export default AboutEdit