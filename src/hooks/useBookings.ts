import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {useCreateBookingModal, useUpdateBookingModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";
import {customToast} from "../lib/utils.tsx";

export const useGetBookings = (date: Date, keyword: string = "", page = 1, limit = 20, clinicServiceId: number) => {
    const clinicId = +localStorage.getItem("currentClinic")!

    return useQuery({
        queryKey: [queryKeys.GET_BOOKINGS],
        queryFn: async () => {
            return await api.get("/booking", {
                params: {
                    clinicId,
                    date,
                    keyword,
                    page,
                    limit,
                    clinicServiceId
                }
            })
        }
    })
}

export const useCreateBooking = () => {
    const createBookingModal = useCreateBookingModal();

    return useMutation({
        mutationKey: [queryKeys.CREATE_BOOKING],
        mutationFn: async (data: any) => {
            return await api.post("/booking", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_BOOKINGS],
            })
            createBookingModal.onClose()
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

export const useUpdateBooking = () => {
    const updateBookingModal = useUpdateBookingModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_EMPLOYEE],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/booking/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_EMPLOYEES],
            })
            updateBookingModal.onClose()
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

export const useDeleteBooking = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_BOOKING],
        mutationFn: async (id: number) => {
            return await api.delete(`/booking/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_BOOKINGS],
            })
            customToast("SUCCESS", "Successfully deleted!")
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