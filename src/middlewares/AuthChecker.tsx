import React from "react";
import {Navigate} from "react-router-dom";

export const AuthChecker = ({children}: { children: React.ReactElement }) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        return <Navigate to="/auth/step-1" replace={true}/>;
    }

    return <>{children}</>;
};
