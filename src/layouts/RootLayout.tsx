import {Outlet} from "react-router-dom";
import Sidebar from "../components/sidebar.tsx";
import React from "react";


const RootLayout = () => {
    return (
        <>
            <div className="flex">
                <div className="max-lg:hidden">
                    <Sidebar/>
                </div>

                <div className="w-full px-8 flex flex-col gap-7">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default RootLayout;
