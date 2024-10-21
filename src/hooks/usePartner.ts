import {useMutation} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {customToast} from "../lib/utils.tsx";

import {api} from "../api";
import {LoginPartnerType} from "../types";
import {useNavigate} from "react-router-dom";

export const usePartnerLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [queryKeys.LOGIN],
        mutationFn: (data: LoginPartnerType) => {
            return api.post("/partner/login", data);
        },
        onSuccess(res) {
            localStorage.setItem("accessToken", res.data?.accessToken);
            localStorage.setItem("refreshToken", res.data?.refreshToken);
            navigate("/auth/step-2");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while logging in to account!"
            );
        },
    });
};

