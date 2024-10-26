import {SingleEmployeeType} from "./employee";

export type DiscountType = {
    id: number,
    clinicId: number,
    discount: number,
    createdAt: string,
    updatedAt: string,
    employees: {
        id: number,
        employee: SingleEmployeeType
    }[]
}