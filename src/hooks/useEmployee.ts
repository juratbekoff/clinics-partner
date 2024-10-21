import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {customToast} from "../lib/utils.tsx";
import {useCreateEmployeeModal, useUpdateEmployeeModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";

export const useGetEmployees = (page: number = 1, limit: number = 20, keyword: string = "") => {
    const clinicId = +localStorage.getItem("currentClinic")!

    return useQuery({
        queryKey: [queryKeys.GET_EMPLOYEES],
        queryFn: async () => {
            return await api.get("/employee", {
                params: {
                    clinicId,
                    page,
                    limit,
                    keyword
                }
            })
        }
    })
}

export const useCreateEmployee = () => {
    const createEmployeeModal = useCreateEmployeeModal();

    return useMutation({
        mutationKey: [queryKeys.CREATE_EMPLOYEE],
        mutationFn: async (data: any) => {
            return await api.post("/employee", data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_EMPLOYEES],
            })
            createEmployeeModal.onClose()
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

export const useUpdateEmployee = () => {
    const updateEmployeeModal = useUpdateEmployeeModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_EMPLOYEE],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/employee/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_EMPLOYEES],
            })
            updateEmployeeModal.onClose()
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

export const useDeleteEmployee = () => {
    return useMutation({
        mutationKey: [queryKeys.UPDATE_EMPLOYEE],
        mutationFn: async (id: number) => {
            return await api.delete(`/employee/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_EMPLOYEES],
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