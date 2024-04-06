import { getCustomerOrEmploye, getToken } from "../../../functions/AuthApi";
import NotFoundPublic from "../../error/NotFoundPublic";
import { getOrderListCustomer } from "./model/OrderApi";
import { scrollTop } from "../../../functions/Funtions";
import CardOrder from "./componentse/CardOrder";
import { useEffect, useState } from "react";
import { OrderModel } from "./model/Order";

const MyOrdersIndex = () => {
    
    scrollTop();
    const [orders, setOrders] = useState<OrderModel[]>([]);

    const obtenerDatos = async () => {
        try {
            const idCliente = getCustomerOrEmploye();
            if (idCliente) {
                const respuesta = await getOrderListCustomer(idCliente);
                if (respuesta === null) {
                    setOrders([]);
                } else {
                    const content = respuesta.content;
                    setOrders(content.reverse());
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        obtenerDatos();
    }, []);

    return (
        !getToken() ?
            <div className="bg-white overflow-hidden w-full">
                <NotFoundPublic error="401" message="Debes iniciar sesión para ver tus compras realizadas" />
            </div>
            :
            <div className="h-fit w-full xl:col-span-1 2xl:col-span-5  bg-white ">
                <div className="px-4 pt-5 md:text-center text-center">
                    <h2 className="pb-2 text-2xl font-bold text-primary-900 md:text-4xl">
                        Historial de compras
                    </h2>
                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded mx-auto">
                        <div className="flex-1 h-2 bg-primary-200"></div>
                        <div className="flex-1 h-2 bg-primary-400"></div>
                        <div className="flex-1 h-2 bg-primary-300"></div>
                    </div>
                </div>
                <div className="flex">
                    <div className="grid grid-cols-1 gap-2 w-full lg:px-16 pt-0 pb-8 px-3">
                        {orders.map((orden) => (
                            <CardOrder key={orden.code}
                                code={orden.code}
                                ammount={orden.ammount}
                                email={orden.email}
                                status={orden.status == "PAID" ? "PAGADO" : "nose"}
                                date={orden.date}
                            />
                        ))}
                    </div>
                </div>
            </div>
    );
};

export default MyOrdersIndex;
