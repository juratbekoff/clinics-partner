import React from "react";
import {Navigate} from "react-router-dom";

const allowedRoutes = [
    {
        subscription: "FREE",
        routes: ["/clinics", "/reviews"], // List specific routes for FREE users
    },
    {
        subscription: "START",
        routes: ["*"], // START users have access to all routes
    },
    {
        subscription: "FULL",
        routes: ["*"],
    },
];

export const AuthChecker = ({children}: { children: React.ReactElement }) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (!accessToken) {
        return <Navigate to="/auth/step-1" replace={true}/>;
    }

    return <>{children}</>;
};
