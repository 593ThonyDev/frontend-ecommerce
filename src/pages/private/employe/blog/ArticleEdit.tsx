import React, { useEffect, useState } from "react";
import TextArea from "../../../../components/fields/TextArea";
import InputField from "../../../../components/fields/InputField";
import { Article, ArticleRequest } from "./model/Article";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PATH_BLOG_ADMIN } from "../../../../routes/private/admin/PrivatePaths";
import { getArticleById, updateArticle } from "./model/ArticleApi";
import { scrollTop } from "../../../../functions/Funtions";

const ArticleEdit = () => {
    
    scrollTop();
    const navigate = useNavigate();
    const { id } = useParams();
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
    });

    const [articleData, setArticleData] = useState<Article>({
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

    useEffect(() => {
        const fetchDataAndSetState = async () => {
            try {
                const data = await getArticleById(parseInt(id?.toString() || '0'));
                setArticleData(data);
                setFormData({
                    employe: data.employe.idEmploye,
                    title: data.title,
                    category: data.category,
                    description: data.description,
                    paragraph1: data.paragraph1,
                    paragraph2: data.paragraph2,
                    paragraph3: data.paragraph3,
                    paragraph4: data.paragraph4,
                    paragraph5: data.paragraph5,
                    paragraph6: data.paragraph6
                });
            } catch (error) {
                console.log("Error al listar los datos")
            }
        };
        fetchDataAndSetState();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const savedSuccessfully = await updateArticle(formData, id ? id : "0");
            if (savedSuccessfully) {
                navigate(PATH_BLOG_ADMIN);
            } 
        } catch (error) {
            toast.error('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit} autoComplete="false" className="lg:px-36 bg-white lg:pt-4">
                <div className="lg:px-3 text-black-900 rounded-xl lg:pt-1">
                    <div className="lg:px-3 text-black-900">
                        <div className="flex flex-col justify-between w-full lg:h-80 h-52 bg-center text-black-800 shadow-md overflow-hidden bg-black-100 bg-cover lg:rounded-xl object-cover"
                            style={{ backgroundImage: `url(${"https://" + articleData.portada.toString()})` }}
                        />
                        <div className="lg:flex grid lg:pb-0 pb-1">
                            <div className="lg:ml-8 ml-4 lg:w-44 lg:h-44 h-32 w-32 relative lg:-mt-20 -mt-24 border-4 border-primary-200 rounded-full overflow-hidden z-20">
                                <img className="object-center lg:h-44 h-32 bg-primary-100"
                                    src={"https://" + articleData.employe.photo} />
                            </div>
                            <div className="text-left pt-3">
                                <div className="flex justify-between px-5 items-end">
                                    <div className="flex">
                                        <span className="mr-1 font-semibold text-lg text-black-700 dark:text-white/60">Creador:</span>
                                        <div
                                            className="text-black-500 text-lg line-clamp-1">
                                            {articleData.employe.fullName}
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
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <InputField placeholder={""}
                            label="Categoria del articulo:"
                            id="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grid lg:px-3 p-3 pt-3">
                        <div className="grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3 rounded-2xl lg:pb-0 pb-3">
                            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 mb-2">
                                <div className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        label="Descripcion del articulo:"
                                        id="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='text-black-500 text-lg font-normal font-sans text-justify lg:pb-3 pb-0'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        id="paragraph1"
                                        label="Parrafo 1:"
                                        value={formData.paragraph1}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 h-fit">
                                <div className="container py-2">
                                    <div className="-m-1 flex flex-wrap md:-m-2">
                                        <div className="flex w-full flex-wrap">
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <img
                                                        className="block max-h-32 bg-black-100 w-full rounded-2xl object-center"
                                                        src={"https://" + articleData.img1}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <img
                                                        className="block max-h-32 w-full bg-black-100 rounded-2xl object-center"
                                                        src={"https://" + articleData.img2}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full p-1 md:p-2">
                                                <div className="relative">
                                                    <img
                                                        className="block max-h-52 bg-black-100 h-fit w-full rounded-2xl object-center"
                                                        src={"https://" + articleData.img3}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                            <TextArea
                                placeholder={""}
                                rows={5}
                                label="Parrafo 2:"
                                id="paragraph2"
                                value={formData.paragraph2}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                            <TextArea
                                placeholder={""}
                                rows={5}
                                label="Parrafo 3:"
                                id="paragraph3"
                                value={formData.paragraph3}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3 rounded-2xl lg:pb-0 pb-3">
                            <div className="grid grid-cols-1 h-fit">
                                <div className="container mx-auto py-2">
                                    <div className="-m-1 flex flex-wrap md:-m-2">
                                        <div className="flex w-full flex-wrap">
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <img
                                                        className="block max-h-32 bg-black-100 w-full rounded-2xl object-center"
                                                        src={"https://" + articleData.img4}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/2 p-1 md:p-2 my-auto">
                                                <div className="relative">
                                                    <img
                                                        className="block max-h-32 bg-black-100 w-full rounded-2xl object-center"
                                                        src={"https://" + articleData.img5}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full p-1 md:p-2">
                                                <div className="relative">
                                                    <img
                                                        className="block max-h-52 bg-black-100 w-full rounded-2xl object-center"
                                                        src={"https://" + articleData.img6}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2 mb-2">
                                <div className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        label="Parrafo 4:"
                                        id="paragraph4"
                                        value={formData.paragraph4}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className='text-black-500 text-lg font-normal font-sans text-justify lg:pb-3 pb-0'>
                                    <TextArea
                                        placeholder={""}
                                        rows={5}
                                        label="Parrafo 5:"
                                        id="paragraph5"
                                        value={formData.paragraph5}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className=''>
                            <div className='text-black-500 text-lg font-normal font-sans text-justify pb-3'>
                                <TextArea placeholder={""}
                                    rows={5}
                                    label="Parrafo 6:"
                                    id="paragraph6"
                                    value={formData.paragraph6}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center py-5 pb-14 gap-x-5">
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
                        Guardar cambios
                    </button>
                </div>
            </form>
        </React.Fragment>
    )
}

export default ArticleEdit;
