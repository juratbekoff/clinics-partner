import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {customToast} from "../lib/utils.tsx";
import {useCreateSubServiceModal, useUpdateSubServiceModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";

export const useGetSubServices = (clinicServiceId: number, keyword: string = "", enabled: boolean = true) => {
    return useQuery({
        queryKey: [queryKeys.GET_SUB_SERVICES],
        queryFn: async () => {
            return await api.get(`/clinic-sub-service/${clinicServiceId}`, {
                params: {
                    keyword
                }
            })
        },
        enabled
    })
}

export const useCreateSubService = () => {
    const createSubServiceModal = useCreateSubServiceModal();

    return useMutation({
        mutationKey: [queryKeys.CREATE_SUB_SERVICE],
        mutationFn: (data: any) => {
            return api.post("/clinic-sub-service", data)
        },
        onSuccess() {
            customToast("SUCCESS", "Sub-service added successfully!")
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SUB_SERVICES]
            })
            createSubServiceModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Something went wrong!"
            );
        },
    })
}

export const useUpdateSubService = () => {
    const updateSubServiceModal = useUpdateSubServiceModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_SUB_SERVICE],
        mutationFn: ({id, data}: { id: number, data: any }) => {
            return api.put(`/clinic-sub-service/${id}`, data)
        },
        onSuccess() {
            customToast("SUCCESS", "Xizmat muvaffaqiyatli tahrirlandi!")
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SUB_SERVICES]
            })
            updateSubServiceModal.onClose()
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

export const useDeleteSubService = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_SERVICE],
        mutationFn: (id: number) => {
            return api.delete(`/clinic-sub-service/${id}`)
        },
        onSuccess() {
            customToast("SUCCESS", "Xizmat muvaffaqiyatli o'chirildi!")
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_SUB_SERVICES]
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
