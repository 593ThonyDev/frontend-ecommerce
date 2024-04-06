import React, { useState } from 'react';
import { Dialog, Combobox } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { PATH_PRODUCTO_ADMIN_ID } from '../../../../routes/private/admin/PrivatePaths';
import { searchProduct } from './model/ProductApi';
import { Product } from './model/Product';

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProductSearch: React.FC<SearchProps> = ({ isOpen, onClose }) => {

    const [searchValue, setSearchValue] = useState('');
    const [product, setProduct] = useState<Product[]>([]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === '') {
            setProduct([]);
            return;
        }

        try {
            const response = await searchProduct(value);
            if (response === null) {
                setProduct([]);
            } else {
                setProduct(response);
            }
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
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm" onClick={handleCancelClick} />
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
                        placeholder='Buscar producto por nombre... '
                    />
                    <span
                        onClick={handleCancelClick}
                        className='text-sm text-danger-400 cursor-pointer hover:text-danger-600'>
                        Cancelar
                    </span>
                </div>

                {searchValue === '' ? (
                    <></>
                ) : (
                    <Combobox.Options static className="max-h-96 overflow-y-scroll scrollbar-hide text-sm p-4">
                        <>
                            {product.length === 0 && (
                                <Combobox.Option
                                    className="text-center text-black-500"
                                    value="no-results"
                                    disabled>
                                    No se encontraron resultados.
                                </Combobox.Option>
                            )}
                            {product.map((product) => (
                                <Combobox.Option key={product.idProduct} value={product.idProduct}>
                                    {({ active }) => (
                                        <Link to={PATH_PRODUCTO_ADMIN_ID + product.idProduct + "/" + product.name?.replace(/\s+/g, '-')}>
                                            <div className={`flex items-center px-3  rounded-xl cursor-default ${active ? 'bg-primary-50' : ''}`}>
                                                <div className="flex flex-col items-center justify-center  bg-primary-50 rounded-xl">
                                                    <img
                                                        className='rounded-lg max-h-12 max-w-12 h-12 w-12'
                                                        src={`https://${product.img1}`}
                                                        alt={`${product.name}`} />
                                                </div>
                                                <div className={`px-4 py-2 grid `}>
                                                    <span className='text-black-500 font-bold line-clamp-1'>
                                                        {`${product.name?.toLocaleUpperCase()}`}
                                                    </span>
                                                    <span className='text-black-500 line-clamp-1'>
                                                        {`${product.description}`}
                                                    </span>
                                                    <div className='flex'>
                                                        <div className="flex mr-3">
                                                            <span className="text-black-700 font-bold pr-1">Estado:</span>
                                                            <span className={` line-clamp-1 lowercase font-semibold ${product.status == "ONLINE" ? "text-success-500" :
                                                                product.status == "UPDATE_PASS" ? "text-warning-400" :
                                                                    "text-danger-400"}`}>
                                                                {product.status == "UPDATE_PASS" ? "Actualizar clave" : product.status}
                                                            </span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="text-black-700 font-bold pr-1 line-clamp-1">Stock:</span>
                                                            <span className="text-black-500 line-clamp-1">{product.stock}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )}
                                </Combobox.Option>
                            ))}
                        </>
                    </Combobox.Options>
                )}

            </Combobox>
        </Dialog>
    );
};

export default ProductSearch;
