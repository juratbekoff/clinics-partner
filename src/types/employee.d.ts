import {ClinicServiceType} from "./service";

export type GenderType = "MAN" | "WOMAN"

export type SingleEmployeeType = {
    id: number,
    serviceId: number,
    name: string,
    surname: string,
    image: string,
    gender: GenderType
    phone: string,
    createdAt: string,
    updatedAt: string,
    clinicService: ClinicServiceType,
}

export type GetEmployeesType = {
    meta: {
        currentPage: number,
        limit: number,
        total_pages: number,
        totalEmployees: number
    },
    employees: SingleEmployeeType[]
}