import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {useCreateDiscountModal, useUpdateDiscountModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";
import {customToast} from "../lib/utils.tsx";

export const useGetDiscounts = (keyword: string = "") => {
    const clinicId = +localStorage.getItem("currentClinic")!

    return useQuery({
        queryKey: [queryKeys.GET_DISCOUNTS],
        queryFn: async () => {
            return await api.get(`/discount/${clinicId}`,)
        }
    })
}

export const useCreateDiscount = () => {
    const clinicId = +localStorage.getItem("currentClinic")!
    const createDiscountModal = useCreateDiscountModal();
    
    return useMutation({
        mutationKey: [queryKeys.CREATE_DISCOUNT],
        mutationFn: async (data: any) => {
            return await api.post("/discount", {
                clinicId,
                ...data
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_DISCOUNTS],
            })
            createDiscountModal.onClose()
            customToast("SUCCESS", "Successfully created!")
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Something went wrong, please try again later!"
            );
        },
    });
};

export const useUpdateDiscount = () => {
    const updateDiscountModal = useUpdateDiscountModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_DISCOUNT],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/discount/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_DISCOUNTS],
            })
            updateDiscountModal.onClose()
            customToast("SUCCESS", "Successfully updated!")
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Something went wrong, please try again later!"
            );
        },
    });
};

export const useDeleteDiscount = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_DISCOUNT],
        mutationFn: async (id: number) => {
            return await api.delete(`/discount/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_DISCOUNTS],
            })
            customToast("SUCCESS", "Successfully updated!")
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Something went wrong, please try again later!"
            );
        },
    });
};