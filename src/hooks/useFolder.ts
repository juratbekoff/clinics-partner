import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {useAssignEmployeeModal, useCreateFolderModal, useUpdateFolderModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";
import {customToast} from "../lib/utils.tsx";

export const useGetFolders = (keyword: string = "") => {
    const clinicId = +localStorage.getItem("currentClinic")!
    return useQuery({
        queryKey: [queryKeys.GET_FOLDERS],
        queryFn: async () => {
            return await api.get(`/folder/${clinicId}`, {
                params: {
                    keyword
                }
            })
        }
    })
}

export const useCreateFolder = () => {
    const createFolderModal = useCreateFolderModal();
    const clinicId = +localStorage.getItem("currentClinic")!


    return useMutation({
        mutationKey: [queryKeys.CREATE_FOLDER],
        mutationFn: async (data: any) => {
            return await api.post("/folder", {
                clinicId,
                ...data
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_FOLDERS],
            })
            createFolderModal.onClose()
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


export const useUpdateFolder = () => {
    const updateFolderModal = useUpdateFolderModal();

    return useMutation({
        mutationKey: [queryKeys.UPDATE_FOLDER],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/folder/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_FOLDERS],
            })
            updateFolderModal.onClose()
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


export const useDeleteFolder = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_FOLDER],
        mutationFn: async (id: number) => {
            return await api.delete(`/folder/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_FOLDERS],
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

export const useAssignEmployee = () => {
    const assignEmployeeModal = useAssignEmployeeModal();

    return useMutation({
        mutationKey: [queryKeys.ASSIGN_EMPLOYEE],
        mutationFn: async (data: any) => {
            return await api.post(`/folder/assign`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_FOLDERS],
            })
            assignEmployeeModal.onClose()
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

export const useUnAssignEmployee = () => {
    return useMutation({
        mutationKey: [queryKeys.ASSIGN_EMPLOYEE],
        mutationFn: async (id: number) => {
            return await api.delete(`/folder/unassign/${id}`,);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_FOLDERS],
            })
            customToast("SUCCESS", "Successfully unassigned!")
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
