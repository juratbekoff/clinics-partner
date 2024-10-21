import {customToast} from "../lib/utils.tsx";
import {api} from "../api";
import {useMutation, useQuery} from "react-query";
import {useCreateWorkingHoursModal, useUpdateWorkingHoursModal} from "./useZustand.ts";
import {queryKeys} from "./queryKeys.ts";
import {queryClient} from "../main.tsx";

export const useGetWorkingHours = (clinicId: number) => {
    return useQuery(({
        queryKey: [queryKeys.GET_WORKING_HOURS],
        queryFn: async () => {
            return await api.get(`/working-hours/${clinicId}`)
        },
        refetchOnWindowFocus: false
    }))
}

export const useCreateWorkingHours = () => {
    const createWorkingHoursModal = useCreateWorkingHoursModal()

    return useMutation({
        mutationKey: [queryKeys.CREATE_WORKING_HOURS],
        mutationFn: async (data: any) => {
            return await api.post("/working-hours", data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_WORKING_HOURS]
            });
            createWorkingHoursModal.onClose()
            customToast("SUCCESS", "Success!");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while creating working hours!"
            );
        },
    })
}


export const useUpdateWorkingHours = () => {
    const updateWorkingHoursModal = useUpdateWorkingHoursModal()

    return useMutation({
        mutationKey: [queryKeys.CREATE_WORKING_HOURS],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            console.log(data)
            return await api.put(`/working-hours/${id}`, data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_WORKING_HOURS]
            });
            updateWorkingHoursModal.onClose()
            customToast("SUCCESS", "Success!");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while updating working hours!"
            );
        },
    })
}


export const useDeleteWorkingHours = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_WORKING_HOURS],
        mutationFn: async (id: number) => {
            return await api.delete(`/working-hours/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_WORKING_HOURS]
            });
            customToast("SUCCESS", "Deleted successfully!");
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while deleting working hours!"
            );
        },
    })
}