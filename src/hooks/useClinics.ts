import {useMutation, useQuery} from "react-query";
import {queryKeys} from "./queryKeys.ts";
import {api} from "../api";
import {customToast} from "../lib/utils.tsx";
import {useCreateClinicModal, useUpdateClinicModal} from "./useZustand.ts";
import {queryClient} from "../main.tsx";
import {useNavigate} from "react-router-dom";

export const useGetClinics = (keyword: string = "") => {
    return useQuery({
        queryKey: [queryKeys.GET_PARTNER_CLINICS],
        queryFn: async () => {
            return await api.get("/clinics/partner", {
                params: {
                    keyword
                }
            })
        }
    })
}

export const useGetSingleClinic = (clinicId: number) => {
    return useQuery({
        queryKey: [queryKeys.GET_SINGLE_CLINIC],
        queryFn: async () => {
            return await api.get(`/clinics/single`, {
                params: {
                    clinicId,
                    long: 1,
                    lat: 1
                }
            })
        },
        refetchOnWindowFocus: false
    });
};

export const useCreateClinic = (isOnAuth: boolean = true) => {
    const createClinicModal = useCreateClinicModal()
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [queryKeys.CREATE_CLINIC],
        mutationFn: (data: any) => {
            return api.post("/clinics", data);
        },
        onSuccess(res) {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_PARTNER_CLINICS]
            })
            createClinicModal.onClose()
            customToast("SUCCESS", "Muvaffaqiyatli yaratildi!")
            if (!isOnAuth) {
                return navigate(`/clinics/edit/${res?.data?.info?.id}`)
            }
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

export const useUpdateClinic = () => {
    const updateClinicModal = useUpdateClinicModal()

    return useMutation({
        mutationKey: [queryKeys.UPDATE_CLINIC],
        mutationFn: ({id, data}: { id: number, data: any }) => {
            return api.put(`/clinics/${id}`, data);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_PARTNER_CLINICS]
            })
            updateClinicModal.onClose()
            customToast("SUCCESS", "Muvaffaqiyatli tahrirlandi!")
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

export const useDeleteClinic = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_CLINIC],
        mutationFn: (id: number) => {
            return api.delete(`/clinics/${id}`);
        },
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_PARTNER_CLINICS]
            })
            customToast("SUCCESS", "Muvaffaqiyatli o'chirildi!")
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