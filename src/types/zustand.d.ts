export interface ModalProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export type CurrentClinicType = {
    clinicId: number | undefined;
    setCurrentClinic: (clinicId: number) => void
}