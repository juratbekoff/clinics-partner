import Navbar from "../components/navbar.tsx";
import {Link, Outlet, useLocation} from "react-router-dom";
import {settingsTabs} from "../constants";


const SettingsLayout = () => {
    const {pathname} = useLocation();
    const currentTab = settingsTabs.find(tab => `/settings/${tab.path}` === pathname)?.name || "";

    return (
        <>
            <Navbar name={currentTab}/>

            <div className="flex gap-4">
                {settingsTabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={`/settings/${tab.path}`}
                        className={`${
                            pathname === `/settings/${tab.path}`
                                ? "border-b-2 border-b-primary pb-1 text-primary font-semibold"
                                : ""
                        }`}
                    >
                        {tab.name}
                    </Link>
                ))}
            </div>

            <Outlet/>
        </>
    );
};

export default SettingsLayout;
