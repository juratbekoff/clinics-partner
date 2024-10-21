import EmployeesTable from "../components/tables/employees.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {useGetEmployees} from "../hooks/useEmployee.ts";
import {GetEmployeesType} from "../types/employee";
import StateShower from "../components/cards/state-shower.tsx";
import {DialogModal} from "../components/ui/dialog.tsx";
import {useCreateEmployeeModal} from "../hooks/useZustand.ts";
import {EmployeeForm} from "../components/forms/employee.tsx";
import {useEffect, useState} from "react";
import {numberSpacer} from "../lib/utils.tsx";
import {Pagination} from "antd";

const Employees = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [keyword, setKeyword] = useState("")

    const getEmployeesQuery = useGetEmployees(page, limit, keyword)
    const employeesData: GetEmployeesType = getEmployeesQuery?.data?.data

    const createEmployeeModal = useCreateEmployeeModal()

    useEffect(() => {
        getEmployeesQuery.refetch()
    }, [page, limit, keyword])

    if (getEmployeesQuery.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    return (
        <>
            <DialogModal isOpen={createEmployeeModal.isOpen} onClose={createEmployeeModal.onClose}>
                <EmployeeForm action={"CREATE"}/>
            </DialogModal>

            <div className={"flex justify-between"}>
                <div className={"w-1/2 grid grid-cols-2"}>
                    <Input placeholder={"Search"} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={createEmployeeModal.onOpen}>Add employee +</Button>
            </div>

            {
                employeesData?.employees?.length === 0
                    ? <StateShower id={"no_data"} name={"No Employees found!"}/>
                    : <>
                        <EmployeesTable data={employeesData?.employees}/>

                        <div className={"flex justify-between mt-3"}>
                            <div className={"flex gap-1"}>
                                <span>Jami:</span>
                                <h1 className={"font-medium"}>{numberSpacer(employeesData?.meta?.totalEmployees || 0)}</h1>
                            </div>

                            <Pagination
                                showSizeChanger
                                defaultCurrent={page}
                                defaultPageSize={limit}
                                total={employeesData?.meta?.totalEmployees}
                                onChange={(page, pageSize) => {
                                    setPage(page);
                                    setLimit(pageSize);
                                }}
                                pageSizeOptions={[5, 10, 20]}
                                pageSize={limit}
                            />
                        </div>
                    </>
            }
        </>
    );
};

export default Employees;