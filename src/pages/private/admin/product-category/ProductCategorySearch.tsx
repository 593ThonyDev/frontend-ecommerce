import { PATH_CATEGORIA_PRODUCTO_ADMIN_ID } from '../../../../routes/private/admin/PrivatePaths';
import { searchCategoryProduct } from './model/CategoryApi';
import { Dialog, Combobox } from '@headlessui/react';
import { Category } from './model/Category';
import { BiSearch } from 'react-icons/bi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProductCategorySearch: React.FC<SearchProps> = ({ isOpen, onClose }) => {

    const [searchValue, setSearchValue] = useState('');
    const [category, setCategory] = useState<Category[]>([]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === '') {
            setCategory([]);
            return;
        }

        try {
            const response = await searchCategoryProduct(value);
            if (response === null) {
                setCategory([]);
            } else {
                setCategory(response);
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
                        placeholder='Buscar categoria de productos... '
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
                            {category.length === 0 && (
                                <Combobox.Option
                                    className="text-center text-black-500"
                                    value="no-results"
                                    disabled>
                                    No se encontraron resultados.
                                </Combobox.Option>
                            )}
                            {category.map((category) => (
                                <Combobox.Option key={category.idCategory} value={category.idCategory}>
                                    {({ active }) => (
                                        <Link to={PATH_CATEGORIA_PRODUCTO_ADMIN_ID + category.idCategory + "/" + category.name?.replace(/\s+/g, '-')}>
                                            <div className={`flex items-center p-3 rounded-xl cursor-default ${active ? 'bg-primary-50' : ''}`}>
                                                <div className="flex flex-col items-center justify-center  bg-primary-50 rounded-xl">
                                                    <img
                                                        className='rounded-lg max-h-12 max-w-12 h-12 w-12'
                                                        src={`https://${category.img}`}
                                                        alt={`${category.name}`} />
                                                </div>
                                                <div className={`px-4 py-2 grid `}>
                                                    <span className='text-black-500 font-bold'>
                                                        {`${category.name?.toLocaleUpperCase()}`}
                                                    </span>
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

export default ProductCategorySearch;
