import React, { useState } from 'react';
import { Dialog, Combobox } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { PATH_EMPLEADO_ADMIN_ID } from '../../../../routes/private/admin/PrivatePaths';
import { searchEmpleado } from './model/EmployeApi';
import { Employe } from './model/Employe';

interface SearchDoctorProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmployeSearch: React.FC<SearchDoctorProps> = ({ isOpen, onClose }) => {

    const [searchValue, setSearchValue] = useState('');
    const [employe, setEmploye] = useState<Employe[]>([]);

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === '') {
            setEmploye([]);
            return;
        }

        try {
            const response = await searchEmpleado(value);
            if (response === null) {
                setEmploye([]);
            } else {
                setEmploye(response);
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
                        placeholder='Buscar empleado... '
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
                            {employe.length === 0 && (
                                <Combobox.Option
                                    className="text-center text-black-500"
                                    value="no-results"
                                    disabled>
                                    No se encontraron resultados.
                                </Combobox.Option>
                            )}
                            {employe.map((empleado) => (
                                <Combobox.Option key={empleado.idEmploye} value={empleado.idEmploye}>
                                    {({ active }) => (
                                        <Link to={PATH_EMPLEADO_ADMIN_ID + empleado.idEmploye + "/" + empleado.fullName?.replace(/\s+/g, '-')}>
                                            <div className={`flex items-center px-3  rounded-xl cursor-default ${active ? 'bg-primary-50' : ''}`}>
                                                <div className="flex flex-col items-center justify-center  bg-primary-50 rounded-xl">
                                                    <img
                                                        className='rounded-lg max-h-12 max-w-12 h-12 w-12'
                                                        src={`https://${empleado.photo}`}
                                                        alt={`${empleado.fullName}`} />
                                                </div>
                                                <div className={`px-4 py-2 grid `}>
                                                    <span className='text-black-500 font-bold'>
                                                        {`${empleado.fullName?.toLocaleUpperCase()}`}
                                                    </span>
                                                    <span className='text-black-500 line-clamp-1'>
                                                        {`${empleado.email}`}
                                                    </span>
                                                    <span className='text-black-500 line-clamp-1'>
                                                        {`${empleado.phone}`}
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

export default EmployeSearch;
