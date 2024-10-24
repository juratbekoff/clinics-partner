import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {useGetPartnerInfoStore} from "../hooks/useZustand.ts";

const notAllowedRoutes = [
    {
        subscription: "FREE",
        routes: ["/services", "/employees"],
    },
    {
        subscription: "START",
        routes: ["-"],
    },
    {
        subscription: "FULL",
        routes: ["-"],
    },
];

const PermChecker = ({children}: { children: React.ReactElement }) => {
    const {subscription} = useGetPartnerInfoStore();
    const {pathname} = useLocation();

    const subscriptionData = notAllowedRoutes.find(
        (route) => route.subscription === subscription
    );

    const isRouteNotAllowed = subscriptionData?.routes.includes(pathname);

    if (isRouteNotAllowed) {
        return <Navigate to="/" replace={true}/>;
    }

    return <>{children}</>;
};

export default PermChecker;
