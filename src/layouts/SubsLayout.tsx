import Navbar from "../components/navbar.tsx";
import {Link, Outlet, useLocation} from "react-router-dom";

const SubsLayout = () => {
    const {pathname} = useLocation()

    return (
        <>
            <Navbar name={`${pathname === "/subscriptions" ? "Ta'riflar" : "O'tkazmalar"} `}/>

            <div className={"flex gap-4"}>
                <Link
                    to={"/subscriptions"}
                    className={`${pathname === "/subscriptions" && "border-b-2 border-b-primary pb-1 text-primary font-semibold"}`}
                >
                    Ta'riflar
                </Link>

                <Link
                    to={"/transactions"}
                    className={`${pathname === "/transactions" && "border-b-2 border-b-primary pb-1 text-primary font-semibold"}`}
                >
                    O'tkazmalar
                </Link>
            </div>

            <Outlet/>
        </>
    );
};

export default SubsLayout;