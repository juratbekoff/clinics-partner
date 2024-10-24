import {Link, useLocation, useNavigate} from "react-router-dom";
import {settingsTabs, sidebarItems} from "../constants"; // import tabs
import {useGetPartnerInfoStore} from "../hooks/useZustand.ts";
import {IoSettingsOutline} from "react-icons/io5";


const Sidebar = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const {subscription} = useGetPartnerInfoStore()

    const handleLogout = () => {
        if (window.confirm("Are you sure?")) {
            localStorage.clear();
            navigate("/auth");
        }
    };

    const isActive = (href: string, id?: number) => {
        if (href === pathname) return true;
        if (href === "/folder" && id === 3) return true;
        return false;
    };

    const settingsActive = settingsTabs.some(tab => `/settings/${tab.path}` === pathname);

    return (
        <div
            className="bg-white pl-7 pr-7 pb-4 pt-7 w-[240px] h-screen sticky top-0 flex flex-col justify-between duration-500">
            <div className="flex flex-col gap-10">
                {/* Logo */}
                <div className="flex justify-between">
                    <Link to="/" className="text-[20px] font-semibold">
                        <img src="/logo.svg" alt="Logo" className="w-[121px] h-[30px] select-none"/>
                    </Link>
                </div>

                <ul className="flex flex-col gap-3">
                    {sidebarItems
                        .filter(item => item.subscription.includes(subscription!))
                        .map((elem) => (
                            <li key={elem.id} className="list-none">
                                <Link
                                    to={elem.href}
                                    className={`flex items-center gap-1 text-base ${
                                        isActive(elem.href, elem.id) ? "rounded-md font-semibold" : ""
                                    }`}
                                >
                                    <span
                                        className={`text-xl ${isActive(elem.href) ? "text-primary" : "text-grey_four"}`}>
                                        {elem.icon}
                                    </span>

                                    <span
                                        className={`text-[18xp] select-none ${isActive(elem.href) ? "text-primary" : "text-grey_four"}`}
                                    >
                                        {elem.label}
                                        </span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3 pb-10">
                <Link
                    to="/settings/profile"
                    className={`flex items-center gap-1 text-base ${
                        settingsActive ? "rounded-md font-semibold" : ""
                    } ${settingsActive ? "text-primary" : "text-grey_four"}`}
                >
                    <IoSettingsOutline className={"text-xl"}/>
                    <span className={`select-none`}>
                        Settings
                    </span>
                </Link>

                <div className="flex gap-2 items-center cursor-pointer" onClick={handleLogout}>
                    <img src="/icons/logout.svg" alt="Logout"/>
                    <span className="text-red-600 font-medium">Chiqish</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
