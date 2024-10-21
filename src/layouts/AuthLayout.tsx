import {Navigate, Outlet, useLocation} from "react-router-dom";

const AuthLayout = () => {
    const {pathname} = useLocation()

    if (pathname === "/auth") {
        return <Navigate to="/auth/step-1"/>
    }

    return (
        <div className={"grid grid-cols-2 max-lg:grid-cols-1"}>
            <div className={"bg-grey_two h-screen flex justify-center items-center max-lg:hidden"}>
                <img src="/auth.svg" alt="#" className={"select-none size-[500px]"}/>
            </div>

            <div className={"flex justify-center items-center w-full h-screen"}>
                <Outlet/>
            </div>
        </div>
    );
};

export default AuthLayout;