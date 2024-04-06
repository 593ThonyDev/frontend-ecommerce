import { useState, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { PATH_HOME, PATH_PRODUCTOS } from "../../../routes/public/Paths";
import toast from "react-hot-toast";
import { getCustomerOrEmploye, getFullName, getToken } from "../../../functions/AuthApi";
import NotFoundPublic from "../../error/NotFoundPublic";
import { checkStatusOrder } from "../cart/model/CartApi";
import { formatDate, scrollTop } from "../../../functions/Funtions";

const checkOrder = () => {
  scrollTop();
  const { orderCode } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const checkOrderStatus = async () => {
    try {
      const customerId = getCustomerOrEmploye();
      if (customerId && orderCode) {
        const responseDetails = await checkStatusOrder(customerId, orderCode);
        if (responseDetails) {
          setOrderDetails(responseDetails);
        } else {
          setError("Error al obtener los detalles de la orden");
          toast.error("Error al obtener los detalles de la orden");
        }
      }
    } catch (error) {
      setError("No se pudo obtner la orden de compra");
    }
  };

  useEffect(() => {
    checkOrderStatus();
  }, [orderCode]);

  return (
    !getToken() ?
      <div className="bg-white overflow-hidden w-full">
        <NotFoundPublic error="401" message="Debes iniciar sesión para realizar esta operación" />
      </div>
      : (<div className="flex justify-center bg-white z-10 pb-16">
        <div className="bg-white rounded-lg overflow-hidden w-full max-w-md">
          <div className="p-4">
            <div className="grid justify-center items-center pt-8 pb-4 w-full">
              <h2 className="text-3xl uppercase font-semibold text-black-500">Orden de compras</h2>
              <div className="flex mx-auto w-32 mt-1 overflow-hidden rounded">
                <div className="flex-1 h-2 bg-primary-200"></div>
                <div className="flex-1 h-2 bg-primary-400"></div>
                <div className="flex-1 h-2 bg-primary-300"></div>
              </div>
            </div>
            <div className="mt-4">
              {error ? (
                <NotFoundPublic error="404"
                  link={PATH_HOME}
                  message="No se pudo obtener el contenido de la orden de compra, posiblemente no exista!" />
              ) : (
                <>
                  {orderDetails && orderDetails.content && orderDetails.content.length === 0 ? (
                    <div className="flex flex-col items-center h-84 py-32">
                      <RiShoppingCartFill className="text-6xl text-black-400" />
                      <p className="text-black-600 mt-2">Tu carrito está vacío</p>
                      <p className="text-black-600 mb-2">¡Agrega productos para comprar!</p>
                      <Link to={PATH_PRODUCTOS} className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-blue-600">
                        Ver productos
                      </Link>
                    </div>
                  ) : (
                    <>
                      {orderDetails && (
                        <div className="grid w-full">
                          <div className="grid">
                            <span className=" text-lg text-black-500 uppercase font-semibold pb-1">Datos de facturacion:</span>
                            <div className="flex justify-between gap-x-3">
                              <span className="text-primary-600 font-semibold uppercase">Codigo:</span>
                              <span className=" line-clamp-1">{orderDetails.extracontent.code}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className=" text-primary-600 font-semibold uppercase ">Cliente:</span>
                              <span className=" line-clamp-1 ml-auto">{getFullName()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-primary-600 font-semibold uppercase">Fecha:</span>
                              <span className=" line-clamp-1">{formatDate(orderDetails.extracontent.date)}</span>
                            </div>
                          </div>
                            <span className=" text-lg text-black-500 uppercase font-semibold pt-4 pb-1">Detalles de la orden:</span>
                          <div className="space-y-2 z-10 py-3 w-full pt-1">
                            {orderDetails.content.map((item: any) => (
                              <div className="flex w-full bg-primary-50 py-2 px-2 rounded-xl" key={item.product.idProduct}>
                                <div className={`rounded-3xl`}>
                                  <img src={"https://" + item.product.img1} alt="Product Image" className="mr-4 rounded-xl max-w-16 max-h-16 w-16 h-16 object-cover bg-primary-100 border border-primary-200" />
                                </div>
                                <div className="grid w-full">
                                  <div className="grid">
                                    <div className="font-semibold text-primary-600 line-clamp-1 uppercase">
                                      {item.product.name}
                                    </div>
                                  </div>
                                  <div className="flex justify-between -mt-1.5">
                                    <div className="flex justify-start">
                                      <span className="text-black-600">Precio:</span>
                                      <span className=" font-bold text-black-600 pl-1">$ {parseFloat(item.price).toFixed(2)}</span>

                                    </div>
                                    <div className="flex justify-start">
                                      <span className="text-black-600">Cantidad:</span>
                                      <span className=" font-bold text-black-600 pl-2">{item.quantity}</span>
                                    </div>
                                  </div>
                                  <div className="flex justify-between -mt-1">
                                    <span className="text-black-600">Total:</span>
                                    <div className=" ml-auto flex items-center justify-center">
                                      <span className=" font-bold text-black-600">USD {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            <div className="flex justify-between items-center pb-8 pt-4">
                              <span className="text-black-500 text-xl font-semibold">Total pagado:</span>
                              <span className="text-success-500 text-xl font-semibold">${orderDetails.extracontent && orderDetails.extracontent.ammount ? `${orderDetails.extracontent.ammount.toFixed(2)}` : " 0.00"}</span>
                            </div>

                            <Link to={PATH_PRODUCTOS} className="flex w-full mt-5 uppercase font-semibold hover:bg-primary-400 bg-primary-300 items-center py-3 rounded-xl text-center justify-center text-white">
                              Comprar mas productos
                            </Link>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>)
  );
};

export default checkOrder;
