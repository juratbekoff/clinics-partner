import {Link, Outlet, useLocation} from "react-router-dom";
import ClinicDropdown from "../components/clinic-dropdown.tsx";

const EmployeesLayout = () => {
    const {pathname} = useLocation()

    return (
        <>
            <div
                className={
                    "flex justify-between items-center shadow rounded-sm bg-white p-3 mt-3"
                }
            >
                <div className="flex items-center">
                    <Link
                        to={"/employees"}
                        className={`text-sm font-medium px-6 py-2 ${pathname === "/employees" && " rounded bg-primary/80 text-white"}`}
                    >
                        Employees
                    </Link>

                    <Link
                        to={"/folder"}
                        className={`text-sm font-medium px-6 py-2 ${pathname === "/folder" && " rounded bg-primary/80 text-white"}`}
                    >
                        Folders
                    </Link>
                </div>

                <ClinicDropdown/>
            </div>

            <Outlet/>
        </>
    );
};

export default EmployeesLayout;