import { Link } from "react-router-dom"
import imgCustomer from "../../../../../assets/cliente.png"
import { PATH_ORDER_ADMIN_CODE } from "../../../../routes/private/admin/PrivatePaths"
import { formatDate } from "../../../../functions/Funtions"
import { OrderModel } from "../../../private/admin/order/model/Order"

const CardOrder: React.FC<OrderModel> = (props) => {
    return (
        <Link to={PATH_ORDER_ADMIN_CODE + props.customer.idCustomer + "/" + props.code} className="flex h-fit items-start justify-between cursor-pointer bg-white hover:rounded-xl rounded-xl w-full" key={1}>
            <div className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-black-100/50">
                <div className="relative h-16 max-h-16 w-16 items-start justify-start rounded-full">
                    <img src={props.customer.photo ? "https://" + props.customer.photo : imgCustomer} className="h-16 max-h-16 max-w-16 w-16 rounded-full" />
                </div>
                <div className="lg:flex lg:justify-between grid w-full">
                    <div className="grid">
                        <h5 className="uppercase line-clamp-1 text-base font-bold text-black-800 dark:text-white">
                            {props.customer.fullName}
                        </h5>
                        <div className="flex flex-wrap">
                            <div className="flex pr-3">
                                <span className=" text-black-700 font-bold pr-1">Codigo:</span>
                                <span className=" text-black-500 line-clamp-1">{props.code}</span>
                            </div>
                            <div className="flex ">
                                <span className=" text-black-700 font-bold pr-1">Fecha:</span>
                                <span className=" text-black-500 line-clamp-1">{formatDate(props.date)}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="flex ">
                                <span className=" text-black-700 font-bold pr-1">Valor total:</span>
                                <span className=" text-success-600 font-semibold">{parseFloat(props.ammount).toFixed(2)} USD</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <span className="lg:hidden text-black-700 font-bold pr-1 my-auto">Estado:</span>
                        <div className={`h-fit w-fit my-auto ${props.status == "DISPATCHING" || props.status == "PAID" ? "bg-success-500" : props.status == "CREATED" ? "bg-warning-400" : "bg-danger-400"}  px-2 pb-1 rounded-full line-clamp-1 text-base text-black-50`}>
                            {props.status == "CREATED" ? "CREADO" : props.status == "PAID" ? "PAGADO" : props.status == "DISPATCHING" ? "ENVIADO" : props.status == "PAYMENT_FAILTURE" ? "PAGO FALLIDO" : props.status}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardOrder