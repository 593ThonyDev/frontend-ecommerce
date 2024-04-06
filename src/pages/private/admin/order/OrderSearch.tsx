import React, { useState } from 'react';
import { Dialog, Combobox } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import axios from 'axios';
import { PATH_ORDER_ADMIN_CODE } from '../../../../routes/private/admin/PrivatePaths';
import { API_URL } from '../../../../functions/ApiConst';
import customerPhoto from "../../../../assets/cliente.png";
import { formatDate } from '../../../../functions/Funtions';

interface Searchorder {
    isOpen: boolean;
    onClose: () => void;
}

const OrderSearch: React.FC<Searchorder> = ({ isOpen, onClose }) => {
    const [searchValue, setSearchValue] = useState('');
    const [orders, setOrders] = useState<any>([]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value === '') {
            setOrders([]);
            return;
        }

        try {
            const response = await axios.get(API_URL + `order/search/${value}`);
            setOrders(response.data ?? []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancelClick = () => {
        setSearchValue('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto p-4 lg:pt-[5vh] ">
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm overflow-hidden" onClick={handleCancelClick} />
            <Combobox onChange={() => { }}
                as="div"
                className="relative mx-auto max-w-xl rounded-xl bg-white ring-1 ring-primary-200 divide-y divide-primary-100 shadow-xl"
            >
                <div className='flex items-center px-4 ring-0 focus:ring-0'>
                    <BiSearch className="h-6 w-6 text-primary-200 pr-1" />
                    <Combobox.Input
                        autoComplete='false'
                        onChange={handleSearchChange}
                        value={searchValue}
                        className="h-12 w-full bg-transparent text-sm text-black-800 outline-none"
                        placeholder='Buscar venta por nombre... '
                    />
                    <span
                        onClick={handleCancelClick}
                        className='text-sm text-danger-400 cursor-pointer hover:text-danger-600'>
                        Cancelar
                    </span>
                </div>

                {searchValue !== '' && (
                    <Combobox.Options static className="max-h-96 overflow-y-scroll scrollbar-hide text-sm p-2">
                        <>
                            {orders.length === 0 ? (
                                <Combobox.Option
                                    className="text-center text-black-500 py-2"
                                    value="no-results"
                                    disabled
                                >
                                    No se encontraron resultados.
                                </Combobox.Option>
                            ) : (
                                orders.map((order: any) => (
                                    <Combobox.Option key={order.idOrder} value={order.idOrder}>
                                        {({ active }) => (
                                            <Link to={`${PATH_ORDER_ADMIN_CODE}${order.customer.idCustomer}/${order.code}`} key={order.idOrder}>
                                                <div className={`flex overflow-y-scroll items-center px-2 py-1  rounded-xl cursor-default ${active ? 'bg-primary-50' : ''}`}>
                                                    <div className="flex flex-col items-center justify-center  bg-primary-50 rounded-xl">
                                                        <img
                                                            className='rounded-lg max-h-12 max-w-12 h-12 w-12'
                                                            src={order.customer?.photo ? `https://${order.customer?.photo}` : customerPhoto}
                                                            alt={order.customer?.fullName} />
                                                    </div>
                                                    <div className={`px-2 py-1.5 grid `}>
                                                        <span className='text-black-500 font-bold line-clamp-1 -my-1'>
                                                            {`${order.customer?.fullName?.toUpperCase()}`}
                                                        </span>                                                        
                                                        <div className='flex'>
                                                            <div className="flex mr-3 items-center ">
                                                                <span className="text-black-700 font-bold pr-1">Estado:</span>
                                                                <div className={`w-fit ${order.status == "DISPATCHING" || order.status == "PAID" ? "text-success-500" : order.status == "CREATED" ? "text-warning-400" : "text-danger-400"} rounded-full line-clamp-1 text-base text-black-50`}>
                                                                    {order.status == "CREATED" ? "CREADO" : order.status == "PAID" ? "Pagado" : order.status == "DISPATCHING" ? "ENVIADO" : order.status == "PAYMENT_FAILTURE" ? "PAGO FALLIDO" : order.status}
                                                                </div>
                                                            </div>
                                                            <div className="flex mr-3 items-center -my-1">
                                                                <span className="text-black-700 font-bold pr-1">Total:</span>
                                                                <div className={`h-fit w-fit  px-2 rounded-full line-clamp-1 text-base text-black-500`}>
                                                                    {parseFloat(order.ammount).toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span className='text-black-500 line-clamp-1 -my-1'>
                                                            {`${formatDate(order.date)}`}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </>
                    </Combobox.Options>
                )}

            </Combobox>
        </Dialog>
    );
};

export default OrderSearch;
