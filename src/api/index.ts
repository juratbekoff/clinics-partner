import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken");

    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        console.log(error);
        if (error.response.status === (401 || 403)) {
            if (window.location.pathname !== "/auth/step-1") {
                localStorage.clear();
                window.location.href = "/auth/step-1";
            }
        }

        return Promise.reject(error);
    }
);

export {api};