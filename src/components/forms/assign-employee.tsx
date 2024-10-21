import {Button} from "../ui/button.tsx";
import {SingleEmployeeType} from "../../types/employee";
import React, {useState} from "react";
import {useGetEmployees} from "../../hooks/useEmployee.ts";
import Select from "react-select";
import {customToast} from "../../lib/utils.tsx";
import {useAssignEmployee} from "../../hooks/useFolder.ts";

export function AssignEmployeeForm({folderId}: { folderId: number }) {
    const getEmployeesQuery = useGetEmployees(1, 300)
    const employeesData: SingleEmployeeType[] = getEmployeesQuery?.data?.data?.employees

    const [employeeId, setEmployeeId] = useState<number>()

    const assignEmployeeMutation = useAssignEmployee()

    function onSubmit(e: any) {
        e.preventDefault();
        
        if (!employeeId) {
            return customToast("ERROR", "Please choose employee!")
        }

        assignEmployeeMutation.mutate({
            employeeId,
            folderId
        })
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <h1 className={"text-xl font-medium"}>Assign employee</h1>

            <div className={"flex flex-col gap-2 text-sm"}>
                <Select
                    className={"text-sm"}
                    options={employeesData?.map(item => {
                        return {
                            value: item.id,
                            label: `${item?.name} ${item?.surname} (${item?.phone})`,
                        }
                    })}
                    onChange={(item) => setEmployeeId(item?.value!)}
                    placeholder={"Choose employee"}
                />
            </div>

            <Button
                disabled={assignEmployeeMutation.isLoading}
                type="submit"
            >
                Assign
            </Button>
        </form>
    )
}
