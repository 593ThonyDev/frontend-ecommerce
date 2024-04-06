import React, { useState } from "react"
import UploadPhoto from "../../../../assets/UploadPhoto.png"
import { FaCamera } from "react-icons/fa"
import { getCustomerOrEmploye, getFullName, getPhotoProfile } from "../../../../functions/AuthApi"
import TextArea from "../../../../components/fields/TextArea"
import InputField from "../../../../components/fields/InputField"
import { ArticleRequest } from "./model/Article"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { PATH_BLOG_ADMIN } from "../../../../routes/private/admin/PrivatePaths"
import { saveArticle } from "./model/ArticleApi"

const ArticleNew = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState<ArticleRequest>({
        employe: "",
        title: "",
        category: "",
        description: "",
        paragraph1: "",
        paragraph2: "",
        paragraph3: "",
        paragraph4: "",
        paragraph5: "",
        paragraph6: "",
        portada: undefined,
        img1: undefined,
        img2: undefined,
        img3: undefined,
        img4: undefined,
        img5: undefined,
        img6: undefined,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, imgIndex: number | string) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prevState => ({
                ...prevState,
                [imgIndex === "portada" ? "portada" : `img${imgIndex}`]: file
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const camposFaltantes = validarArticle(formData);
        if (camposFaltantes.length === 0) {
            const loadingToast = toast.loading('Guardando registro...');
            const customerOrEmploye = getCustomerOrEmploye();
            if (customerOrEmploye !== null) {
                formData.employe = customerOrEmploye.toString(); // Asigna el valor como cadena de texto
                try {
                    const savedSuccessfully = await saveArticle(formData);
                    if (savedSuccessfully) {
                        toast.dismiss(loadingToast);
                        navigate(PATH_BLOG_ADMIN);
                    } else {
                        toast.dismiss(loadingToast);
                    }
                } catch (error) {
                    toast.dismiss(loadingToast);
                }
            }
        } else {
            toast.error(`Debe agregar ${camposFaltantes.join(", ")} del articulo`);
        }
    };



    const validarArticle = (formData: ArticleRequest) => {
        const camposFaltantes: string[] = [];
        if (!formData.portada) camposFaltantes.push("portada");
        if (!formData.category) camposFaltantes.push("categoria");
        if (!formData.description) camposFaltantes.push("descripcion");
        if (!formData.paragraph1) camposFaltantes.push("parrafo 1");
        if (!formData.paragraph2) camposFaltantes.push("parrafo 2");
        if (!formData.paragraph3) camposFaltantes.push("parrafo 3");
        if (!formData.paragraph4) camposFaltantes.push("parrafo 4");
        if (!formData.paragraph5) camposFaltantes.push("parrafo 5");
        if (!formData.paragraph6) camposFaltantes.push("parrafo 6");
        if (!formData.img1) camposFaltantes.push("imagen 1");
        if (!formData.img2) camposFaltantes.push("imagen 2");
        if (!formData.img3) camposFaltantes.push("imagen 3");
        if (!formData.img4) camposFaltantes.push("imagen 4");
        if (!formData.img5) camposFaltantes.push("imagen 5");
        if (!formData.img6) camposFaltantes.push("imagen 6");
        return camposFaltantes;
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} autoComplete="false"
                className=" lg:px-36 bg-white lg:pt-4">
                <div className="lg:px-3 text-black-900 rounded-xl lg:pt-1">
                    <div className="lg:px-3 text-black-900">
                        <div className="flex flex-col justify-between w-full lg:h-80 h-52  bg-center text-black-800 shadow-md overflow-hidden bg-black-100 bg-cover lg:rounded-xl object-cover"
                            style={{ backgroundImage: formData.portada ? `url(${URL.createObjectURL(formData.portada)})` : `url(${UploadPhoto})` }}
                        >
                            <div className=" flex justify-end">
                                <label htmlFor="fileInputPortada" className="relative cursor-pointer top-2 right-2 p-1 text-md hover:bg-primary-300 bg-primary-200 backdrop-blur-md text-white rounded-xl">
                                    <div className="flex px-2">
                                        <FaCamera className="my-auto mr-2" />
                                        <span>Portada</span>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id={"fileInputPortada"}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handlePhotoChange(e, "portada")}
                                />
                            </div>
                        </div>
                        <div className="lg:flex grid lg:pb-0 pb-1">
                            <div className="lg:ml-8 ml-4 lg:w-44 lg:h-44 h-32 w-32 relative lg:-mt-20 -mt-24 border-4 border-primary-200 rounded-full overflow-hidden z-20">
                                <img className="object-center lg:h-44 h-32 bg-primary-100"
                                    src={getPhotoProfile()?.toString()} />
                            </div>
                            <div className="text-left pt-3">
                                <div className="flex justify-between px-5 items-end">
                                    <div className="flex">
                                        <span className="mr-1 font-semibold text-lg text-black-700 dark:text-white/60">Creador:</span>
                                        <div
                                            className="text-black-500 text-lg line-clamp-1">
                                            {getFullName()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid w-full px-3 gap-y-3">
                        <InputField placeholder={""}
                            label="Titulo del articulo:"
                            id="title"
                            onChange={handleChange}
                        />
                        <InputField placeholder={""}
                            label="Categoria del articulo:"
                            id="category"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="grid lg:px-3 p-3 pt-3">
                        <div className=" grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3  rounded-2xl lg:pb-0 pb-3">
                            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 mb-2">
                                <div
                                    className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        label="Descripcion del articulo:"
                                        id="description"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div
                                    className='text-black-500 text-lg font-normal font-sans text-justify lg:pb-3 pb-0'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        id="paragraph1"
                                        label="Parrafo 1:"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 h-fit">
                                <div className="container  py-2">
                                    <div className="-m-1 flex flex-wrap md:-m-2">
                                        <div className="flex w-full flex-wrap">
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <div className="relative z-20">
                                                        <label htmlFor="fileInput1">
                                                            <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <img
                                                        className="block max-h-32 bg-black-100  w-full rounded-2xl object-center"
                                                        src={formData[`img1`] ? URL.createObjectURL(formData[`img1`]) : UploadPhoto}
                                                    />
                                                    <input
                                                        type="file"
                                                        id={"fileInput1"}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhotoChange(e, 1)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <div className="relative z-20">
                                                        <label htmlFor="fileInput2">
                                                            <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <img
                                                        className="block max-h-32 w-full bg-black-100 rounded-2xl object-center"
                                                        src={formData[`img2`] ? URL.createObjectURL(formData[`img2`]) : UploadPhoto} />
                                                    <input
                                                        type="file"
                                                        id={"fileInput2"}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhotoChange(e, 2)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full p-1 md:p-2">
                                                <div className="relative">
                                                    <div className="relative z-20">
                                                        <label htmlFor="fileInput3">
                                                            <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <img
                                                        className="block max-h-52 bg-black-100 h-fit w-full rounded-2xl object-center"
                                                        src={formData[`img3`] ? URL.createObjectURL(formData[`img3`]) : UploadPhoto} />
                                                    <input
                                                        type="file"
                                                        id={"fileInput3"}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhotoChange(e, 3)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                            <TextArea
                                placeholder={""}
                                rows={5}
                                label="Parrafo 2:"
                                id="paragraph2"
                                onChange={handleChange}
                            />
                        </div>
                        <div
                            className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                            <TextArea
                                placeholder={""}
                                rows={5}
                                label="Parrafo 3:"
                                id="paragraph3"
                                onChange={handleChange}
                            />
                        </div>
                        <div className=" grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3  rounded-2xl lg:pb-0 pb-3">
                            <div className="grid grid-cols-1 h-fit">
                                <div className="container mx-auto py-2">
                                    <div className="-m-1 flex flex-wrap md:-m-2">
                                        <div className="flex w-full flex-wrap">
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <div className="relative z-20">
                                                        <label htmlFor="fileInput4">
                                                            <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <img
                                                        className="block max-h-32 bg-black-100  w-full rounded-2xl object-center"
                                                        src={formData[`img4`] ? URL.createObjectURL(formData[`img4`]) : UploadPhoto} />
                                                    <input
                                                        type="file"
                                                        id={"fileInput4"}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhotoChange(e, 4)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <div className="relative z-20">
                                                        <label htmlFor="fileInput5">
                                                            <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <img
                                                        className="block max-h-32 bg-black-100 w-full rounded-2xl object-center"
                                                        src={formData[`img5`] ? URL.createObjectURL(formData[`img5`]) : UploadPhoto} />
                                                    <input
                                                        type="file"
                                                        id={"fileInput5"}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhotoChange(e, 5)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full p-1 md:p-2">
                                                <div className="relative">
                                                    <div className="relative z-20">
                                                        <label htmlFor="fileInput6">
                                                            <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                <FaCamera className="w-4 h-4" />
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <img
                                                        className="block max-h-52 bg-black-100 w-full rounded-2xl object-center"
                                                        src={formData[`img6`] ? URL.createObjectURL(formData[`img6`]) : UploadPhoto} />
                                                    <input
                                                        type="file"
                                                        id={"fileInput6"}
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhotoChange(e, 6)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 mb-2">
                                <div
                                    className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        label="Parrafo 4:"
                                        id="paragraph4"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div
                                    className='text-black-500 text-lg font-normal font-sans text-justify lg:pb-3 pb-0'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        label="Parrafo 5:"
                                        id="paragraph5"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className=''>
                            <div
                                className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                <TextArea placeholder={""}
                                    rows={5}
                                    label="Parrafo 6:"
                                    id="paragraph6"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center py-5 pt-9 gap-x-5">
                    <Link
                        to={PATH_BLOG_ADMIN}
                        className="bg-danger-400 hover:bg-danger-500 py-2 px-4 rounded-xl text-white"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        className="text-white bg-primary-500 hover:bg-primary-600 py-2 px-4 rounded-xl cursor-pointer"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ArticleNew