import customerPhoto from "../../../../assets/cliente.png"
import { useState, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import NotFoundPublic from "../../../error/NotFoundPublic";
import { getToken, setToken } from "../../../../functions/AuthApi";
import axios from "axios";
import { API_URL } from "../../../../functions/ApiConst";
import toast from "react-hot-toast";
import { PATH_CLIENTE_ADMIN_ID, PATH_ORDERS_ADMIN } from "../../../../routes/private/admin/PrivatePaths";
import { formatDate } from "../../../../functions/Funtions";
import React from "react";
import SytyleBackgroundView from "./SytyleBackgroundView";

const checkOrder = () => {
  const { idCustomer, code } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const checkOrderStatus = async () => {
    try {
      if (idCustomer && code) {
        setToken();
        const responseDetails = await axios.get(`${API_URL}order/check/${idCustomer}/${code}`);
        if (responseDetails) {
          setOrderDetails(responseDetails.data); // Corregir aquí
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
  }, [idCustomer, code]);

  return (
    !getToken() ?
      <div className="bg-primary-50 overflow-hidden w-full">
        <NotFoundPublic error="401" message="Debes iniciar sesión para realizar esta operación" />
      </div>
      : (
        <div className="flex justify-center bg-primary-50 z-10">
          <div className="rounded-lg w-full lg:mx-16">
            {error ? (
              <NotFoundPublic error="404"
                link={PATH_ORDERS_ADMIN}
                message="¡La orden de compra no existe!" />
            ) : (
              <React.Fragment>
                {orderDetails && orderDetails.content && orderDetails.content.length === 0 ? (
                  <div className="flex flex-col items-center h-84 py-32">
                    <RiShoppingCartFill className="text-6xl text-black-400" />
                    <p className="text-black-600 mb-2">¡esta orden, no contiene productos!</p>
                  </div>
                ) : (
                  <React.Fragment>
                    {orderDetails && orderDetails.extracontent && (
                      <div className="grid gap-x-6 md:grid-cols-2 lg:grid-cols-2 w-full">
                        <div className="grid h-fit py-2 lg:bg-primary-50 rounded-2xl px-3 lg:px-4 lg:py-4 md:sticky md:-top-40 lg:sticky lg:top-16">
                          <div className=" relative w-full px-4 md:w-1/2 mx-auto lg:mb-0 z-10">
                            <div className="grid justify-center">
                              <div className="flex items-center justify-center">
                                <img src={orderDetails.extracontent.customer.photo ? "https://" + orderDetails.extracontent.customer.photo : customerPhoto} alt=""
                                  className="relative z-40 object-cover rounded-full  h-40 w-40 max-h-40 max-w-40 bg-primary-100" />
                              </div>
                            </div>
                            <SytyleBackgroundView />
                          </div>
                          <div className="grid justify-center items-center pb-4 w-full lg:pt-0 md:pt-0 pt-2">
                            <h2 className="lg:text-xl text-xl uppercase font-semibold text-black-500">Datos de facturacion</h2>
                            <div className="flex w-32 mt-1 mx-auto overflow-hidden rounded">
                              <div className="flex-1 h-2 bg-primary-200"></div>
                              <div className="flex-1 h-2 bg-primary-400"></div>
                              <div className="flex-1 h-2 bg-primary-300"></div>
                            </div>
                          </div>
                          <div className=" gap-y-2">
                            <div className="flex justify-between">
                              <span className="text-primary-600 font-semibold uppercase">Estado:</span>
                              <div className={`h-fit w-fit my-auto ${orderDetails.extracontent.status == "DISPATCHING" || orderDetails.extracontent.status == "PAID" ? "bg-success-500" : orderDetails.extracontent.status == "CREATED" ? "bg-warning-400" : "bg-danger-400"}  px-2 pb-1 rounded-full line-clamp-1 text-base text-black-50`}>
                                {orderDetails.extracontent.status == "CREATED" ? "CREADO (POR PAGAR)" : orderDetails.extracontent.status == "PAID" ? "PAGADO" : orderDetails.extracontent.status == "DISPATCHING" ? "ENVIADO" : orderDetails.extracontent.status == "PAYMENT_FAILTURE" ? "PAGO FALLIDO" : orderDetails.extracontent.status}
                              </div>
                            </div>
                            <div className="flex justify-between items-center py-1">
                              <span className="text-primary-600 font-semibold uppercase">{orderDetails.extracontent.status == "CREATED" ? "MONTO A PAGAR" : orderDetails.extracontent.status == "PAID" ? "PAGADO" : orderDetails.extracontent.status == "DISPATCHING" ? "PAGADO" : orderDetails.extracontent.status == "PAYMENT_FAILTURE" ? "POR PAGAR" : orderDetails.extracontent.status}:</span>
                              <span className="text-success-500 text-xl font-semibold">${orderDetails.extracontent && orderDetails.extracontent.ammount ? `${orderDetails.extracontent.ammount.toFixed(2)}` : " 0.00"}</span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span className="text-primary-600 font-semibold uppercase">Fecha:</span>
                              <span className=" line-clamp-1 text-black-500">{formatDate(orderDetails.extracontent.date)}</span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span className=" text-primary-600 font-semibold uppercase ">Cliente:</span>
                              <Link to={PATH_CLIENTE_ADMIN_ID + orderDetails.extracontent.customer.idCustomer + "/" + orderDetails.extracontent.customer.fullName?.replace(/\s+/g, '-')}
                                className=" line-clamp-1 ml-2 text-black-500 font-bold hover:underline hover:text-primary-900">
                                {orderDetails.extracontent.customer.fullName}
                              </Link>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span className=" text-primary-600 font-semibold uppercase ">Email:</span>
                              <span className=" line-clamp-1 ml-2 text-black-500">{orderDetails.extracontent.customer.email}</span>
                            </div>
                            <div className="flex justify-between pt-1">
                              <span className=" text-primary-600 font-semibold uppercase ">Postal:</span>
                              <span className=" line-clamp-1 ml-2 text-black-500">{orderDetails.extracontent.customer.country.toUpperCase() + " - " + orderDetails.extracontent.customer.zip}</span>
                            </div>
                            <div className="grid justify-between pt-1">
                              <span className="text-primary-600 font-semibold uppercase">Codigo de identificador:</span>
                              <span className=" line-clamp-1 lg:mb-0 mb-1 text-black-500">{code}</span>
                            </div>
                            <div className="grid justify-between pt-1">
                              <span className=" text-primary-600 font-semibold uppercase ">Direccion de envio:</span>
                              <span className="text-justify line-clamp-3 text-black-500">{orderDetails.extracontent.customer.address}</span>
                            </div>
                          </div>
                        </div>

                        <div className="lg:my-4 md:my-4 md:px-3">
                          <div className=" bg-primary-100 px-3 h-fit lg:mt-0 mt-5 lg:rounded-xl md:rounded-xl">
                            <div className="grid justify-center items-center p-2 pb-3 w-full sticky top-16 mb-1 bg-primary-100">
                              <h2 className="text-xl lg:text-3xl uppercase font-semibold text-black-500">Detalles de la venta</h2>
                              <div className="flex mx-auto w-32 mt-1 overflow-hidden rounded">
                                <div className="flex-1 h-2 bg-primary-200"></div>
                                <div className="flex-1 h-2 bg-primary-400"></div>
                                <div className="flex-1 h-2 bg-primary-500"></div>
                              </div>
                            </div>
                            <div className="space-y-2 z-10 pb-3 w-full">
                              {orderDetails.content.map((item: any) => (
                                <div className="flex w-full bg-primary-50 py-2 px-2 rounded-xl" key={item.product.idProduct}>
                                  <div className={`rounded-3xl`}>
                                    <img src={"https://" + item.product.img1} className="rounded-xl max-w-16 max-h-16 w-16 h-16 object-cover bg-primary-100 border border-primary-100" />
                                  </div>
                                  <div className="grid w-full pl-1.5">
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
                              <div className="flex justify-between items-center py-2">
                                <span className="text-black-500 text-xl font-semibold uppercase">TOTAL {orderDetails.extracontent.status == "CREATED" ? "POR PAGAR" : orderDetails.extracontent.status == "PAID" ? "PAGADO" : orderDetails.extracontent.status == "DISPATCHING" ? "PAGADO" : orderDetails.extracontent.status == "PAYMENT_FAILTURE" ? "POR PAGAR" : orderDetails.extracontent.status}:</span>
                                <span className="text-success-500 text-xl font-semibold">${orderDetails.extracontent && orderDetails.extracontent.ammount ? `${orderDetails.extracontent.ammount.toFixed(2)}` : " 0.00"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      )
  );
};

export default checkOrder;
