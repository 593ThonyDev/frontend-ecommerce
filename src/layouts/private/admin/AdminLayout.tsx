import NavbarAdmin from "../../../components/navbar/private/admin/NavbarAdmin";
import { LayoutProps } from "../../LayoutProps"

const AdminLayout = ({ children }: LayoutProps) => {
    return (
        <div className="gap-5 relative">
            <NavbarAdmin />
            <main className="">{children}</main>
        </div>
    );
};

export default AdminLayout;
