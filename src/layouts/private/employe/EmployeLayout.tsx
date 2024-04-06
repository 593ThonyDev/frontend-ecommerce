import NavbarEmploye from "../../../components/navbar/private/employe/NavbarEmploye";
import { LayoutProps } from "../../LayoutProps"

const EmployeLayout = ({ children }: LayoutProps) => {
    return (
        <div className="gap-5 relative">
            <NavbarEmploye />
            <main className="">{children}</main>
        </div>
    );
};

export default EmployeLayout;
