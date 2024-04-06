import { Helmet } from "react-helmet"
import { FaCamera } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import { disableArticleStatusById, enabbleArticleStatusById, getArticleById, uploadImage } from "./model/ArticleApi"
import { Article } from "./model/Article"
import React, { useState, useEffect } from "react"
import { PATH_ARTICLE_ADMIN_EDIT_ID, PATH_EMPLEADO_ADMIN_ID } from "../../../../routes/private/admin/PrivatePaths"
import { formatDate, scrollTop } from "../../../../functions/Funtions"
import LoaderArticle from "./components/LoaderArticle"
import DropdownItem, { Dropdown } from "../../../../components/dropdown/DropDownOptions"
import toast from "react-hot-toast"

const ArticleView = () => {

    scrollTop();
    const { id } = useParams<{ id: string; }>();
    const parsedIdArticle = id ? parseInt(id) : 0;
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Article>({
        idArticle: "",
        title: "",
        category: "",
        code: "",
        created: "",
        description: "",
        status: "",
        paragraph1: "",
        paragraph2: "",
        paragraph3: "",
        paragraph4: "",
        paragraph5: "",
        paragraph6: "",
        portada: "",
        img1: "",
        img2: "",
        img3: "",
        img4: "",
        img5: "",
        img6: "",
        employe: {
            idEmploye: "",
            fullName: "",
            photo: ""
        },
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getArticleById(parseInt(id?.toString() || '0'));
            setTimeout(() => {
                setFormData(data);
                setLoading(false);
            }, 800);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const disableArticleStatus = async () => {
        await disableArticleStatusById(parsedIdArticle.toString());
        fetchData();
    };

    const enableArticleStatus = async () => {
        await enabbleArticleStatusById(parsedIdArticle.toString());
        fetchData();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, id: string | undefined, imageKey: "portada" | "img1" | "img2" | "img3" | "img4" | "img5" | "img6", fetchData: () => void, toast: any) => {
        const file = event.target.files?.[0] ?? null;
        if (file) {
            uploadImage(id, file, imageKey, fetchData, toast);
        }
    };

    return (
        loading ? <LoaderArticle /> :
            <React.Fragment>
                <div className=" lg:px-36 bg-white lg:pt-4">
                    <div className="lg:px-3 text-black-900 rounded-xl lg:pt-1">
                        <Helmet>
                            <meta name="description" content={formData.description} />
                            <meta name="keywords" content={`Blog, Noticias, Informacion, ${formData.title}`} />
                        </Helmet>
                        <div className="lg:px-3 text-black-900">
                            <div className="flex flex-col justify-between w-full lg:h-80 h-52 bg-white/20 bg-center text-black-800 shadow-md overflow-hidden  bg-cover lg:rounded-xl"
                                style={{ backgroundImage: `url(https://${formData.portada})` }}
                            >
                                <div className=" flex justify-end gap-x-3">
                                    <label
                                        htmlFor="fileInputPortada"
                                        className="relative cursor-pointer top-2 p-1 text-md hover:bg-primary-300/20 bg-primary-300/10 backdrop-blur-md text-white rounded-xl">
                                        <div className="flex px-2">
                                            <FaCamera className="my-auto mr-2" />
                                            <span>Cambiar portada</span>
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="fileInputPortada"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleFileChange(e, id, "portada", fetchData, toast)}
                                    />
                                    <div className="relative cursor-pointer top-2 right-2 z-20">
                                        <Dropdown label="•••">
                                            <DropdownItem text={"Editar"}
                                                path={PATH_ARTICLE_ADMIN_EDIT_ID + formData.idArticle}
                                            />
                                            <DropdownItem
                                                onClick={() => {
                                                    if (formData.status === "CREATED" || formData.status === "OFFLINE") {
                                                        enableArticleStatus();
                                                    } else if (formData.status === "ONLINE") {
                                                        disableArticleStatus();
                                                    }
                                                }}
                                                text={formData.status == "CREATED" || formData.status == "OFFLINE" ? "Publicar y aprobar articulo " : "Dar de baja el articulo"}
                                            />
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:flex grid lg:pb-0 pb-1">
                                <Link to={PATH_EMPLEADO_ADMIN_ID + formData.employe.idEmploye + "/" + formData.employe.fullName.replace(/\s+/g, '-')} className="lg:ml-8 ml-4 lg:w-44 lg:h-44 h-32 w-32 relative lg:-mt-20 -mt-24 border-4 border-primary-200 rounded-full overflow-hidden z-20">
                                    <img className="bg-primary-100 object-center lg:h-44 h-32 bg-primary-100/50 backdrop-blur-md" src={"https://" + formData.employe.photo} />
                                </Link>
                                <div className="text-left pt-3">
                                    <h1 className="px-5 max-w-3xl font-semibold text-2xl text-primary-500 uppercase">
                                        {formData.title}
                                    </h1>
                                    <div className="flex justify-between px-5 items-end">
                                        <div className="flex">
                                            <span className="mr-1 font-semibold text-lg text-black-700 dark:text-white/60">Creador:</span>
                                            <Link
                                                to={PATH_EMPLEADO_ADMIN_ID + formData.employe.idEmploye + "/" + formData.employe.fullName.replace(/\s+/g, '-')}
                                                className="text-black-500 hover:text-primary-800 text-lg hover:underline line-clamp-1">
                                                {formData.employe.fullName}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-5 items-end">
                                        <div className="flex">
                                            <span className="mr-1 font-semibold text-lg text-black-700 dark:text-white/60">Publicado:</span>
                                            <p className="text-black-500 text-lg">{formatDate(formData.created)}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-5 items-end">
                                        <div className="flex">
                                            <span className="mr-1 font-semibold text-lg text-black-700 dark:text-white/60">Estado:</span>
                                            <span className={`rounded-full backdrop-blur-md px-2 text-center text-md text-white  ${formData.status === "ONLINE" ? "bg-success-500/50" : ""} ${formData.status === "CREATED" ? "bg-warning-500/50" : ""} ${formData.status === "OFFLINE" ? "bg-danger-500/50" : ""}`}>
                                                {formData.status == "CREATED" ? "Creado" : formData.status == "ONLINE" ? "En linea" : formData.status == "OFFLINE" ? "De baja" : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid lg:px-3 p-3 pt-10">
                            <div className=" grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3  rounded-2xl lg:pb-0 pb-3">
                                <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 mb-2">
                                    <h2
                                        className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                        {formData.description}
                                    </h2>
                                    <p
                                        className='text-black-500 text-lg font-normal font-sans text-justify lg:pb-3 pb-0'>
                                        {formData.paragraph1}
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 h-fit">
                                    <div className="container  py-2">
                                        <div className="-m-1 flex flex-wrap md:-m-2">
                                            <div className="flex w-full flex-wrap">
                                                <div className="w-1/2 p-1 md:p-2 my-auto">
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInputImg1">
                                                                <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                    <FaCamera className="w-4 h-4" />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <img
                                                            className="block max-h-32 bg-primary-100 w-full rounded-lg object-center"
                                                            src={"https://" + formData.img1}
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInputImg1"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, id, "img1", fetchData, toast)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-1/2 p-1 md:p-2 my-auto">
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInputImg2">
                                                                <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                    <FaCamera className="w-4 h-4" />
                                                                </div>
                                                            </label>
                                                        </div>

                                                        <img
                                                            className="block max-h-32 w-full rounded-lg bg-primary-100 object-center"
                                                            src={"https://" + formData.img2}
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInputImg2"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, id, "img2", fetchData, toast)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full p-1 md:p-2">
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInputImg3">
                                                                <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                    <FaCamera className="w-4 h-4" />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <img
                                                            className="block max-h-52 w-full rounded-lg bg-primary-100 object-center"
                                                            src={"https://" + formData.img3}
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInputImg3"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, id, "img3", fetchData, toast)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p
                                className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                {formData.paragraph2}
                            </p>
                            <p
                                className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                {formData.paragraph3}
                            </p>
                            <div className=" grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3  rounded-2xl lg:pb-0 pb-3">

                                <div className="grid grid-cols-1 h-fit">
                                    <div className="container mx-auto py-2">
                                        <div className="-m-1 flex flex-wrap md:-m-2">
                                            <div className="flex w-full flex-wrap">
                                                <div className="w-1/2 p-1 md:p-2 my-auto">
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInputImg4">
                                                                <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                    <FaCamera className="w-4 h-4" />
                                                                </div>
                                                            </label>
                                                        </div>

                                                        <img
                                                            className="block max-h-32  w-full rounded-lg bg-primary-100 object-center"
                                                            src={"https://" + formData.img4}
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInputImg4"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, id, "img4", fetchData, toast)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-1/2 p-1 md:p-2 my-auto">
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInputImg5">
                                                                <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                    <FaCamera className="w-4 h-4" />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <img
                                                            className="block max-h-32 w-full rounded-lg bg-primary-100 object-center"
                                                            src={"https://" + formData.img5}
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInputImg5"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, id, "img5", fetchData, toast)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full p-1 md:p-2">
                                                    <div className="relative">
                                                        <div className="relative z-20">
                                                            <label htmlFor="fileInputImg6">
                                                                <div className="absolute cursor-pointer top-2 p-2 text-2xl hover:bg-primary-300/70 bg-primary-300/50 backdrop-blur-md text-white rounded-full right-2">
                                                                    <FaCamera className="w-4 h-4" />
                                                                </div>
                                                            </label>
                                                        </div>
                                                        <img
                                                            className="block max-h-52 w-full rounded-lg bg-primary-100 object-center"
                                                            src={"https://" + formData.img6}
                                                        />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            id="fileInputImg6"
                                                            style={{ display: 'none' }}
                                                            onChange={(e) => handleFileChange(e, id, "img6", fetchData, toast)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 mb-2">
                                    <h2
                                        className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                        {formData.paragraph4}
                                    </h2>
                                    <p
                                        className='text-black-500 text-lg font-normal font-sans text-justify lg:pb-3 pb-0'>
                                        {formData.paragraph5}
                                    </p>
                                </div>
                            </div>

                            <div className=''>
                                <p
                                    className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                    {formData.paragraph6}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
}

export default ArticleView