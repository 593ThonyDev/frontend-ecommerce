import LoaderProductView from "./components/LoaderProductView";
import { API_URL } from "../../../../functions/ApiConst";
import NotFoundAdmin from "../../../error/NotFoundAdmin";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "./model/Product";
import axios from "axios";
import { setToken } from "../../../../functions/AuthApi";
import { PATH_PRODUCTOS_EMPLOYE } from "../../../../routes/private/employe/PrivatePathsEmploye";

const ProductView = () => {

  const { id, name } = useParams<{ id: string; name: string }>();
  

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState<Product>({
    idProduct: 0,
    stock: 0,
    price: "",
    name: "",
    img1: undefined,
    img2: undefined,
    img3: undefined,
    description: "",
    status: "",
    created: "",
    category: {
      idCategory: 0,
      name: ""
    }
  });

  const fetchData = async () => {
    try {
      setToken();
      const response = await axios.get(`${API_URL}product/public/${id}`);
      const data = response.data.content;
      setTimeout(() => {
        setFormData({
          idProduct: data.idProduct,
          stock: data.stock,
          price: data.price,
          name: data.name,
          img1: data.img1,
          img2: data.img2,
          img3: data.img3,
          description: data.description,
          status: data.status,
          created: data.created,
          category: {
            idCategory: data.category.idCategory,
            name: data.category.name,
            img: data.category.img
          }
        });
        setSelectedImage("https://" + data.img1);
        setLoading(false);
      }, 800);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, name]);

  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  
  return (
    <div className="flex">
      {loading ? (
        <LoaderProductView />
      ) : (
        formData.name?.replace(/\s+/g, '-') === name ?
          <div className="w-full">
            <section className="overflow-hidden bg-white  lg:py-10 font-poppins">
              <div className="max-w-6xl px-4  mx-auto md:px-6">
                <div className="flex flex-wrap -mx-4 py-3">
                  <div className="w-full px-4 md:w-1/2">

                    <div className="sticky top-0 z-10 overflow-hidden ">
                      <div className="flex justify-center">
                        <div className="relative w-full h-80">
                          <img loading="lazy" src={(selectedImage || "https://" + formData.img1) ?? "https://" + formData.img1} alt=""
                            className="w-full h-full rounded-3xl" />
                        </div>
                      </div>
                      <div className="flex pt-3">
                        <div className="w-1/3 p-2">
                          <div
                            className={`block rounded-3xl ${selectedImage === "https://" + formData.img1 ? 'border border-primary-300' : 'border-primary-100/60 border'}`}
                            onClick={() => formData.img1 && handleClick("https://" + formData.img1)}>                           
                            <img loading="lazy" src={formData.img1 ? "https://" + formData.img1 : ""} alt=""
                              className="object-cover w-full h-32 rounded-3xl " />
                          </div>
                        </div>
                        <div className="w-1/3 p-2">
                          <div
                            className={`block rounded-3xl ${selectedImage === "https://" + formData.img2 ? 'border border-primary-300' : 'border-primary-100/60 border'}`}
                            onClick={() => formData.img2 && handleClick("https://" + formData.img2)}>                            
                            <img loading="lazy" src={formData.img2 ? "https://" + formData.img2 : ""} alt=""
                              className="object-cover w-full h-32 rounded-3xl " />
                          </div>
                        </div>
                        <div className="w-1/3 p-2">
                          <div
                            className={`block rounded-3xl ${selectedImage === "https://" + formData.img3 ? 'border border-primary-300' : 'border-primary-100/60 border'}`}
                            onClick={() => formData.img3 && handleClick("https://" + formData.img3)}>                            
                            <img loading="lazy" src={formData.img3 ? "https://" + formData.img3 : ""} alt=""
                              className="object-cover w-full h-32 rounded-3xl " />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2 grid">
                    <div className="lg:pl-20 h-2/3 ">
                      <div className="flex justify-between">
                        <div className=" flex flex-col relative z-20 lg:pt-1 pt-4">
                          <span className="w-44 h-2 bg-warning-500 mb-3 lg:mb-1" />
                          <h1 className="font-bebas-neue uppercase text-5xl font-black flex  text-primary-500">
                            <span className="">{formData.name}</span>
                          </h1>
                          <span className="w-28 h-2 bg-warning-500 mt-3 lg:mb-1" />
                        </div>                        
                      </div>

                      <div className="my-10">
                        <li className="flex mb-2 text-base text-black-800">
                          <span className="mr-3 text-primary-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path
                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                          </span>
                          <div className="flex justify-between w-full items-center">
                            <span className="text-black-700 text-lg font-semibold">Precio:</span>
                            <span className="text-black-500 text-lg">{parseFloat(formData.price.toString()).toFixed(2)} USD</span>
                          </div>
                        </li>
                        <li className="flex mb-2 text-base text-black-800">
                          <span className="mr-3 text-primary-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path
                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                          </span>
                          <div className="flex justify-between w-full items-center">
                            <span className="text-black-700 text-lg font-semibold">Stock:</span>
                            <span className="text-black-500 text-lg">{formData.stock} unidades</span>
                          </div>
                        </li>                      
                        <li className="flex mb-2 text-base text-black-800">
                          <span className="mr-3 text-primary-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path
                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                          </span>
                          <div className="flex justify-between w-full items-center">
                            <span className="text-black-700 text-lg font-semibold">Categoria:</span>
                            <span className="text-black-500 text-lg">{formData.category?.name}</span>
                          </div>
                        </li>
                        <li className="flex text-base text-black-800">
                          <span className="mr-3 text-primary-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                              className="w-5 h-5 bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path
                                d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                          </span>
                          <div className="flex justify-between w-full items-center">
                            <div className=" text-black-800 text-lg font-semibold">Descripcion:</div>
                          </div>
                        </li>
                        <p className=" text-justify text-black-500 dark:text-gray-400 pl-8">
                          {formData.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          : (
            <NotFoundAdmin error='404'
              message='Registro no encontrado'
              link={PATH_PRODUCTOS_EMPLOYE}
            />
          )
      )}
    </div >
  )
}

export default ProductView;
