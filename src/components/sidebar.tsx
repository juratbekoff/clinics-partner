import {Link, useLocation, useNavigate} from "react-router-dom";
import {sidebarItems} from "../constants";
import SettingsIcon from "../assets/icons/settings.tsx";

const Sidebar = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isOk = window.confirm("Are you sure?");
        if (isOk) {
            localStorage.clear();
            return navigate("/auth");
        }
    };

    return (
        <div
            className="bg-white pl-7 pr-7 pb-4 pt-7 w-[240px] h-screen left-0 top-0 sticky duration-500  flex flex-col justify-between"
        >
            <div className="flex flex-col gap-10">
                <div className={"flex justify-between"}>
                    <Link to="/" className={"text-[20px] font-semibold"}>
                        <img src="/logo.svg" alt="#" className={"w-[121px] h-[30px] select-none"}/>
                    </Link>
                </div>

                <ul className="flex flex-col gap-4">
                    {sidebarItems.map((elem) => {
                        const isActive = pathname === elem.href;
                        const isStaff = pathname === "/folder" && elem.id === 3;

                        return (
                            <li key={elem.id} className="list-none">
                                <Link
                                    to={elem.href}
                                    className={`flex items-center gap-2 text-base ${
                                        (isStaff || isActive) ? "rounded-md font-semibold" : ""
                                    }`}
                                >
                                    <span className={`text-[18px] ${isActive ? "text-primary" : "text-grey_four"}`}>
                                        {elem.icon}
                                    </span>

                                    <span
                                        className={`select-none ${isStaff || isActive ? "text-primary" : "text-grey_four"}`}
                                    >
                                        {elem.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

            </div>

            <div className={"flex flex-col gap-5 pb-10"}>
                <Link
                    to={'/settings'}
                    className={`flex hidden items-center gap-2 text-base ${
                        pathname === "/settings" && "rounded-md font-semibold"
                    }`}
                >
                    <SettingsIcon/>

                    <span
                        className={`select-none ${pathname === "/settings" ? "text-primary" : "text-grey_four"}`}>
                        Sozlamalar
                    </span>
                </Link>

                <div className={"flex gap-2 items-center cursor-pointer"} onClick={handleLogout}>
                    <img src={"/icons/logout.svg"} alt="#"/>
                    <span className={"text-red-600 font-medium"}>Chiqish</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
