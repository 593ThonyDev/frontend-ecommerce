import { PATH_EMPLEADO_ADMIN_NEW } from "../../../../routes/private/admin/PrivatePaths";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import EmployeList from "./EmployeList";
import EmployeSearch from "./EmployeSearch";
import { useState } from "react";

const EmployeIndex = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const openSearch = () => {
        setIsSearchOpen(true);
    };

    return (
        <div className="grid lg:py-5 py-2 lg:px-32 px-3">
            <div className="flex justify-between">
                <div className="grid">
                    <h2 className="pb-2 text-xl font-bold text-primary-900 md:text-4xl dark:text-gray-300">
                        Empleados
                    </h2>
                    <div className="flex w-32 mt-1 mb-6 overflow-hidden rounded">
                        <div className="flex-1 h-2 bg-primary-200"></div>
                        <div className="flex-1 h-2 bg-primary-400"></div>
                        <div className="flex-1 h-2 bg-primary-300"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-1">
                    <div
                        className="px-2 py-2 h-fit text-white bg-primary-400 rounded-xl hover:bg-primary-500"
                        onClick={openSearch}>
                        <div className="flex justify-center items-center flex-nowrap">
                            <FaSearch className="w-6" />
                        </div>
                    </div>
                    <Link
                        to={PATH_EMPLEADO_ADMIN_NEW}
                        className="px-2 py-2 h-fit text-white bg-success-400 rounded-xl hover:bg-success-500"
                    >
                        <div className="flex justify-center items-center flex-nowrap">
                            <FaPlus className="w-6" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="flex">
                <EmployeList />
            </div>
            {isSearchOpen && (
                <EmployeSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            )}
        </div>
    );
};

export default EmployeIndex;
