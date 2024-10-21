import {SingleEmployeeType} from "./employee";

export type FolderType = {
    id: number,
    clinicId: number,
    name: string,
    createdAt: string,
    updatedAt: string,
    employees: {
        id: number,
        employee: SingleEmployeeType
    }[]
}