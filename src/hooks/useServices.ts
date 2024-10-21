import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {customToast} from "../lib/utils.tsx";
import {useCreateServiceModal, useUpdateServiceModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";

export const useGetGlobalServices = () => {
    return useQuery({
        queryKey: [queryKeys.GET_GLOBAL_SERVICES],
        queryFn: async () => {
            return await api.get("/service")
        }
    })
}

export const useGetServices = (keyword: string = "") => {
    const clinicId = +localStorage.getItem("currentClinic")!

    return useQuery({
        queryKey: [queryKeys.GET_SERVICES],
        queryFn: async () => {
            return await api.get(`/clinic-service/${clinicId}`, {
                params: {
                    keyword
                }
            })
        }
    })
}

export const useCreateService = () => {
    const createServiceModal = useCreateServiceModal();
    const clinicId = +localStorage.getItem("currentClinic")!

    return useMutation({
        mutationKey: [queryKeys.CREATE_SERVICE],
        mutationFn: (serviceId: number) => {
            return api.post("/clinic-service", {
                clinicId,
                serviceId
            })
        },
        onSuccess() {
            customToast("SUCCESS", "Xizmat muvaffaqiyatli yaratildi!")
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SERVICES]
            })

            createServiceModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Nimadir xato ketdi!"
            );
        },
    })
}

export const useUpdateService = () => {
    const updateServiceModal = useUpdateServiceModal();
    const clinicId = +localStorage.getItem("currentClinic")!


    return useMutation({
        mutationKey: [queryKeys.UPDATE_SERVICE],
        mutationFn: ({id, serviceId}: { id: number, serviceId: number }) => {
            return api.put(`/clinic-service/${id}`, {
                serviceId,
                clinicId
            })
        },
        onSuccess() {
            customToast("SUCCESS", "Xizmat muvaffaqiyatli tahrirlandi!")
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SERVICES]
            })
            updateServiceModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Nimadir xato ketdi!"
            );
        },
    })
}

export const useDeleteService = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_SERVICE],
        mutationFn: (id: number) => {
            return api.delete(`/clinic-service/${id}`)
        },
        onSuccess() {
            customToast("SUCCESS", "Xizmat muvaffaqiyatli o'chirildi!")
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SERVICES]
            })
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Nimadir xato ketdi!"
            );
        },
    })
}
