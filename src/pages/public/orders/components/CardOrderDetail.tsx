// import { Link } from "react-router-dom"
// import { getPhotoProfile } from "../../../../functions/AuthApi"
// import { PATH_CHECK_ORDER_CODE } from "../../../../routes/public/Paths"
// import { OrderModel } from "../model/Order"
// import { formatDate } from "../../../../functions/Funtions"

// const CardOrder: React.FC<OrderModel> = (props) => {
//     return (
//         <Link to={PATH_CHECK_ORDER_CODE + props.code} className="flex h-fit items-start justify-between cursor-pointer bg-primary-50 hover:rounded-xl rounded-xl" key={1}>
//             <div className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-black-100/50">
//                 <div className="relative h-16 max-h-16 w-16 items-start justify-start rounded-full">
//                     <img src={getPhotoProfile()?.toString()} className="h-16 max-h-16 max-w-16 w-16 rounded-full" />
//                 </div>
//                 <div className="lg:flex lg:justify-between grid w-full">
//                     <div className="grid">
//                         <h5 className="uppercase line-clamp-1 text-base font-bold text-black-800 dark:text-white">
//                             Richard Anthony Pérez Palacios
//                         </h5>
//                         <div className="flex flex-wrap">
//                             <div className="flex pr-3">
//                                 <span className=" text-black-700 font-bold pr-1">Codigo:</span>
//                                 <span className=" text-black-500 line-clamp-1">{props.code}</span>
//                             </div>
//                             <div className="flex ">
//                                 <span className=" text-black-700 font-bold pr-1">Fecha:</span>
//                                 <span className=" text-black-500 line-clamp-1">{formatDate(props.date)}</span>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap">
//                             <div className="flex ">
//                                 <span className=" text-black-700 font-bold pr-1">Valor total:</span>
//                                 <span className=" text-success-600 font-semibold">{parseFloat(props.ammount).toFixed(2)} USD</span>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="lg:block h-fit my-auto hidden bg-success-300  px-2 pb-1 rounded-xl line-clamp-1 text-base text-black-50">
//                         {props.status}
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default CardOrder