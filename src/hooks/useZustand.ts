import {create} from "zustand";
import {ModalProps} from "../types/zustand";
import {PartnerType} from "../types";

const createModalStore = () =>
    create<ModalProps>((set) => ({
        isOpen: false,
        onOpen: () => set({isOpen: true}),
        onClose: () => set({isOpen: false}),
    }));

export const useCreateServiceModal = createModalStore();
export const useUpdateServiceModal = createModalStore();
export const useCreateClinicModal = createModalStore();
export const useUpdateClinicModal = createModalStore();
export const useCreateSubServiceModal = createModalStore();
export const useUpdateSubServiceModal = createModalStore();
export const useCreateEmployeeModal = createModalStore();
export const useUpdateEmployeeModal = createModalStore();
export const useCreateFolderModal = createModalStore();
export const useUpdateFolderModal = createModalStore();
export const useAssignEmployeeModal = createModalStore();
export const useCreateWorkingHoursModal = createModalStore();
export const useUpdateWorkingHoursModal = createModalStore();
export const useCreateBookingModal = createModalStore();
export const useUpdateBookingModal = createModalStore();

interface PartnerInfoProps extends PartnerType {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    setPartnerInfo: (partnerInfo: PartnerType) => void;
}

export const useGetPartnerInfoStore = create<PartnerInfoProps>((set) => ({
    id: undefined,
    name: undefined,
    username: undefined,
    subsctiption: undefined,
    updatedAt: undefined,
    createdAt: undefined,
    isLoading: false,
    setIsLoading: (loading: boolean) => set({isLoading: loading}),
    setPartnerInfo: (info: PartnerType) => set({
        id: info?.id,
        name: info?.name,
        username: info?.username,
        createdAt: info?.createdAt,
        updatedAt: info?.updatedAt,
        subscription: info?.subscription,
    })
}))