import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {SingleEmployeeType} from "../../types/employee";
import {customToast, formatPhoneNumber} from "../../lib/utils.tsx";
import {useState} from "react";
import {useDeleteEmployee} from "../../hooks/useEmployee.ts";
import {useUpdateEmployeeModal} from "../../hooks/useZustand.ts";
import {DialogModal} from "../ui/dialog.tsx";
import {EmployeeForm} from "../forms/employee.tsx";

const EmployeesTable = ({data}: { data: SingleEmployeeType[] }) => {
    const [employee, setEmployee] = useState<SingleEmployeeType>();

    const updateEmployeeModal = useUpdateEmployeeModal();
    const deleteEmployeeMutation = useDeleteEmployee()

    const onDelete = (id: number) => {
        const isOk = confirm("Are you sure to delete employee?")
        if (isOk) {
            deleteEmployeeMutation.mutate(id)
        }
    }

    const onEdit = (id: number) => {
        const findEmployee = data?.find((employee) => employee.id === id)
        if (!findEmployee) {
            return customToast("ERROR", "Employee not found!")
        }
        setEmployee(findEmployee)
        updateEmployeeModal.onOpen()
    }

    return (
        <>
            <DialogModal isOpen={updateEmployeeModal.isOpen} onClose={updateEmployeeModal.onClose}>
                <EmployeeForm action={"EDIT"} data={employee}/>
            </DialogModal>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Job Field</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(employee => (
                            <TableRow key={employee.id}>
                                <TableCell>#122</TableCell>
                                <TableCell>
                                    {employee.name} {employee.surname || ""}

                                    {/*<div className={"flex gap-2 items-center"}>*/}
                                    {/*    {*/}
                                    {/*        employee.image &&*/}
                                    {/*        <img src={employee.image} alt="#" className={"rounded-full size-8"}/>*/}
                                    {/*    }*/}

                                    {/*    <span className={"leading-5"}>{employee.name} {employee.surname || ""}</span>*/}
                                    {/*</div>*/}
                                </TableCell>
                                <TableCell>{employee?.clinicService?.service?.name}</TableCell>
                                <TableCell>{formatPhoneNumber(employee?.phone, "TEXT") || "--"}</TableCell>

                                <TableCell>
                                    <div className={"flex gap-2 relative right-0"}>
                                        <img
                                            src="/edit.svg" alt={"#"}
                                            className={"select-none cursor-pointer size-[26px]"}
                                            onClick={() => onEdit(employee.id)}
                                        />
                                        <img src="/delete.svg"
                                             alt={"#"}
                                             className={"select-none cursor-pointer size-[26px]"}
                                             onClick={() => onDelete(employee.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>
        </>
    );
};

export default EmployeesTable;