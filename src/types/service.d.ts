export type ClinicServiceType = {
    id: number;
    clinicId: number;
    serviceId: number;
    createdAt: string;
    updatedAt: string;
    subServices: SubServiceType[];
    service: GlobalServiceType;
    _count: {
        employees: number,
        subServices: number;
    }
};

export type SubServiceType = {
    id: number;
    clinicServiceId: number;
    name: string;
    comment?: string;
    slotDuration: number;
    price_from: number;
    price_to: number;
    createdAt: string;
    updatedAt: string;
    clinicService: {
        _count: {
            employees: number,
        }
    }
};

export type GlobalServiceType = {
    id: number;
    name: string;
    logo: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
