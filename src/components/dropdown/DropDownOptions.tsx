import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface DropdownProps {
    label: string;
    children: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ label, children }) => {
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

    useEffect(() => {
        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="relative" onClick={stopPropagation}>
            <button
                onClick={toggleDropdown}
                className="w-9 h-9 rounded-xl lg:ml-2 cursor-pointer bg-primary-200 hover:bg-primary-400/40 backdrop-blur-md text-white z-30"
            >
                {label}
            </button>

            {isOpen && (
                <div
                    ref={dropdownRef}
                    onClick={() => { setIsOpen(false) }}
                    className="absolute right-0 p-1 mt-0.5 w-60 bg-white  border border-primary-200 rounded-lg shadow-lg text-center z-30">
                    {children}
                </div>
            )}
        </div>
    );
};

interface DropdownItemProps {
    text: string;
    path?: string;
    onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ path, text, onClick }) => {
    if (path) {
        // Si path tiene un valor, mostrar un enlace
        return (
            <Link to={path} className='whitespace-nowrap cursor-default block px-4 py-2 text-black-500  hover:bg-black-600/10 rounded-md' onClick={onClick}>
                {text}
            </Link>
        );
    } else {
        // Si path no tiene un valor, mostrar solo un div
        return (
            <div className="whitespace-nowrap cursor-default block px-4 py-2 text-black-500  hover:bg-black-600/10 rounded-md" onClick={onClick}>
                {text}
            </div>
        );
    }
};

export default DropdownItem;

export { Dropdown, DropdownItem };