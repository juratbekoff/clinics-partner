import {Button} from "../ui/button.tsx";
import {SingleEmployeeType} from "../../types/employee";
import React, {useEffect, useState} from "react";
import {useGetEmployees} from "../../hooks/useEmployee.ts";
import Select from "react-select";
import {customToast} from "../../lib/utils.tsx";
import {useGetSubServices} from "../../hooks/useSubServices.ts";
import {SubServiceType} from "../../types/service";
import {useGetUsers} from "../../hooks/useUsers.ts";
import {SingleUserType} from "../../types/user";
import {Input, MaskInput} from "../ui/input.tsx";
import {BookingType} from "../../types/boooking";

export function BookingForm({action}: { action: "CREATE" | "EDIT", data?: BookingType }) {
    const [clinicServiceId, setClinicServiceId] = useState<number>(0);

    const [isFetchingSubServiceEnabled, setIsFetchingSubServiceEnabled] = useState<boolean>(false);
    const [isFetchingUsersEnabled, setIsFetchingUsersEnabled] = useState<boolean>(false);

    const [step, setStep] = useState<number>(1);
    const [employee, setEmployee] = useState<SingleEmployeeType>()
    const [userId, setUserId] = useState<number>()

    const [addingUserType, setAddingUserType] = useState<"SEARCH" | "ADD">("SEARCH")

    const getEmployeesQuery = useGetEmployees(1, 300)
    const employeesData: SingleEmployeeType[] = getEmployeesQuery?.data?.data?.employees

    const getSubServicesQuery = useGetSubServices(+clinicServiceId, "", isFetchingSubServiceEnabled);
    const subServicesData: SubServiceType[] = getSubServicesQuery.data?.data?.clinicSubServices

    const getUsersQuery = useGetUsers(isFetchingUsersEnabled)
    const usersData: SingleUserType[] = getUsersQuery?.data?.data?.users

    function onSubmit(e: any) {
        e.preventDefault();

        if (!employee) {
            return customToast("ERROR", "Please choose employee!")
        }
    }

    useEffect(() => {
        getSubServicesQuery.refetch()
    }, [employee])

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <h1 className={"text-xl font-medium"}>
                {action === "CREATE" ? "Create Booking" : "Edit booking"}
            </h1>

            <div className={"flex flex-col gap-2 text-sm"}>
                <h1 className={"font-medium"}>Employee</h1>

                <Select
                    className={"text-sm"}
                    options={employeesData?.map(item => {
                        return {
                            value: item.id,
                            label: `${item?.name} ${item?.surname} (${item?.phone})`,
                        }
                    })}
                    onChange={(item) => {
                        const findEmployee = employeesData?.find(employee => employee.id === item?.value!)
                        if (findEmployee) {
                            setEmployee(findEmployee)
                            setClinicServiceId(findEmployee?.serviceId)
                            setIsFetchingSubServiceEnabled(true)
                            setStep((prevState) => prevState + 1)
                        }
                    }}
                    placeholder={"Choose employee"}
                />
            </div>

            {
                step > 1 && action === "CREATE" && <div className={"flex flex-col gap-2 text-sm"}>
                    <h1 className={"font-medium"}>Sub-service</h1>

                    <Select
                        className={"text-sm"}
                        options={subServicesData?.map(item => {
                            return {
                                value: item.id,
                                label: item.name,
                            }
                        })}
                        onChange={(item) => {
                            setClinicServiceId(item?.value!)
                            setStep((prevState) => prevState + 1)
                            setIsFetchingUsersEnabled(true)
                        }}
                        placeholder={"Choose employee"}
                    />
                </div>
            }

            {
                step > 2 && action === "CREATE" &&
                <div className={"flex flex-col gap-2"}>
                    <h1 className={"font-medium text-sm"}>User</h1>
                    <div className={"flex flex-col gap-2"}>
                        <div className={"grid grid-cols-2 gap-2 rounded w-full text-sm"}>
                            <div
                                className={`flex justify-center items-center rounded cursor-pointer p-2 ${addingUserType === "SEARCH" ? "border-2 border-primary " : "bg-white  border border-black/40"}`}
                                onClick={() => {
                                    setAddingUserType("SEARCH")
                                }}
                            >
                                Search
                            </div>

                            <div
                                className={`flex justify-center items-center rounded cursor-pointer p-2 ${addingUserType === "ADD" ? "border-2 border-primary" : "bg-white border border-black/40"}`}
                                onClick={() => {
                                    setStep((prevState) => prevState + 1)
                                    setAddingUserType("ADD")
                                }}
                            >
                                Create
                            </div>
                        </div>

                        {
                            addingUserType === "SEARCH"
                                ? <Select
                                    className={"text-sm w-full"}
                                    options={usersData?.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.name,
                                        }
                                    })}
                                    onChange={(item) => {
                                        setStep((prevState) => prevState + 1)
                                        setUserId(item?.value!)
                                    }}
                                    placeholder={"Choose user"}
                                /> :

                                <div className={"flex flex-col gap-2 w-full text-sm"}>
                                    <Input placeholder={"Name"}/>
                                    <Input placeholder={"Surname"}/>
                                    <MaskInput placeholder={"+998"}/>
                                </div>
                        }
                    </div>
                </div>
            }

            {
                step > 3 && action === "CREATE" && <Button
                    type="submit"
                >
                    Create
                </Button>
            }
        </form>
    )
}
