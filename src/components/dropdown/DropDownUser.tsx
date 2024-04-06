import { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PATH_LOGIN, PATH_REGISTER } from '../../routes/public/Paths';

const DropDownUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    // Manejador de eventos para el clic en el modal
    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {

        // Agregar un event listener para hacer clic en el documento global
        const clickListener = (e: MouseEvent) => closeDropdown(e);
        document.addEventListener('click', clickListener);

        // Limpieza del event listener cuando el componente se desmonta
        return () => {
            document.removeEventListener('click', clickListener);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
            className='cursor-pointer'
                onClick={toggleDropdown}
            >
                <FaUser className="w-6 h-6" />
            </div>

            {isOpen && (
                <div
                    className=" text-black-500 absolute -right-4 mt-2 p-1 w-40 bg-primary-100 border border-primary-500/10 rounded-lg shadow-lg"
                    onClick={handleModalClick} // Evita que el modal se cierre cuando se hace clic dentro
                >
                    <Link to={PATH_LOGIN}
                        className="cursor-pointer block px-2 py-2 text-gray-500 hover:bg-primary-50  rounded-md"
                    >
                        <div className="flex justify-center">
                            <span className=" my-auto">Inciar sesion</span>
                        </div>
                    </Link>
                    <Link to={PATH_REGISTER}
                        className="cursor-pointer block px-2 py-2 text-black-500  hover:bg-primary-50 rounded-md"
                    >
                        <div className="flex justify-center">
                            <span className=" my-auto">Registrarme</span>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default DropDownUser;
