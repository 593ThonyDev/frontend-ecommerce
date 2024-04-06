import { getFullName, getPhotoProfile, getUserName, logOutNavigate } from '../../functions/AuthApi';
import { getTwoWords } from '../../functions/Funtions';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PATH_MY_ORDERS } from '../../routes/public/Paths';
import customerImg from "../../assets/cliente.png";

const DropDownCustomer = () => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const userPhoto = getPhotoProfile();
    const fullName = getFullName();
    const userName = getUserName();
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut = () => {
        toggleDropdown()
        logOutNavigate(navigate);
    };

    const closeDropdown = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const clickListener = (e: MouseEvent) => closeDropdown(e);
        document.addEventListener('click', clickListener);
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
                {userPhoto == null || userPhoto ?
                    <div className='flex align-middle bg-white hover:bg-white/80 rounded-full border border-primary-100 ml-3'>
                        <div className=' my-auto px-2 lg:block hidden text-black-500'>{getTwoWords(fullName ? fullName : "")}</div>
                        {
                            userPhoto ? (
                                <img src={userPhoto} className=' w-10 h-10 rounded-full border border-primary-200' alt="" />
                            ) :
                                <img src={customerImg} className=' w-10 h-10 rounded-full border border-primary-200' alt="" />
                        }
                    </div>
                    :
                    null
                }

            </div>

            {isOpen && (
                <div
                    className=" text-black-500 absolute right-0 mt-2 p-1  w-72 bg-primary-100 border border-primary-500/20  rounded-3xl shadow-2xl"
                    onClick={handleModalClick}
                >
                    <div className="rounded-lg">
                        <div className="flex flex-col items-center py-3">
                            <span className="text-sm text-black-500 pb-3">{userName?.toLowerCase()}</span>
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg mt-1" src={userPhoto ? userPhoto : customerImg} alt={fullName?fullName:""} />
                            <h5 className="text-lg text-gray-900 dark:text-white">{"¡Hola, " + getTwoWords(fullName ? fullName : "") + "!"}</h5>
                        
                            <div className="grid w-full p-3 gap-y-1 mt-1">
                                <Link to={PATH_MY_ORDERS}
                                    onClick={toggleDropdown}
                                    className='flex bg-white hover:bg-primary-50 w-full py-3 justify-center rounded-t-2xl rounded-b-md cursor-pointer'
                                >
                                    Hitorial de compras
                                </Link>
                                <div
                                    onClick={handleLogOut}
                                    className='flex bg-white hover:bg-primary-50 w-full py-3 justify-center rounded-b-2xl rounded-t-md cursor-pointer'
                                >
                                    Cerrar sesion
                                </div>
                            </div>
                            {/* <div
                                onClick={handleLogOut}
                                className='grid font-thin justify-center rounded-md cursor-pointer hover:underline'
                            >
                                <small>Politicas de privacidad</small>
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDownCustomer;
