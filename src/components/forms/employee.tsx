import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Button} from "../ui/button.tsx";
import {Input, MaskInput} from "../ui/input.tsx";
import {EmployeeSchema} from "../../lib/validations.ts";
import {useCreateEmployee, useUpdateEmployee} from "../../hooks/useEmployee.ts";
import {SingleEmployeeType} from "../../types/employee";
import Select from "react-select";
import React from "react";
import {useGetServices} from "../../hooks/useServices.ts";
import {ClinicServiceType} from "../../types/service";
import {customToast, formatPhoneNumber} from "../../lib/utils.tsx";

type ClinicFormProps = {
    action: "CREATE" | "EDIT",
    data?: SingleEmployeeType,
}

export function EmployeeForm({data, action}: ClinicFormProps) {
    const form = useForm<z.infer<typeof EmployeeSchema>>({
        resolver: zodResolver(EmployeeSchema),
        defaultValues: {
            name: data?.name,
            surname: data?.surname,
            phone: data?.phone,
        },
    })

    const createEmployeeMutation = useCreateEmployee()
    const updateEmployeeMutation = useUpdateEmployee()

    const getClinicServicesQuery = useGetServices()
    const clinicServicesData: ClinicServiceType[] = getClinicServicesQuery?.data?.data?.services

    function onSubmit(values: z.infer<typeof EmployeeSchema>) {
        if (!form.getValues("serviceId") && action === "CREATE") {
            return customToast("ERROR", "service is missed!")
        }

        if (values.phone) {
            values.phone = formatPhoneNumber(values.phone, "INPUT") as string
        }

        const formData = new FormData()

        formData.append("name", values.name)
        formData.append("surname", values.surname!)
        formData.append("phone", values.phone)

        if (form.getValues("serviceId")) {
            formData.append("serviceId", values.serviceId?.toString()!)
        }

        if (action === "CREATE") {
            createEmployeeMutation.mutate(formData)
        } else {
            updateEmployeeMutation.mutate({
                id: data?.id!,
                data: formData,
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h1 className={"text-xl font-medium"}>{action === "CREATE" ? "Create employee" : "Edit employee"}</h1>

                <div className={"flex flex-col gap-2"}>
                    <span className={"font-medium"}>Service</span>

                    <Select
                        className={"text-sm"}
                        defaultValue={data?.clinicService?.service?.id ? {
                            value: data?.clinicService?.service?.id,
                            label: data?.clinicService?.service?.name,
                        } : undefined}
                        options={clinicServicesData?.map(item => {
                            return {
                                value: item.id,
                                label: item?.service?.name
                            }
                        })}
                        onChange={(item) => form.setValue("serviceId", item?.value!)}
                        placeholder={"Choose service"}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="nomi" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="surname"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Surname</FormLabel>
                            <FormControl>
                                <Input placeholder="surname" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <MaskInput placeholder="+998" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={createEmployeeMutation.isLoading || updateEmployeeMutation.isLoading}
                    type="submit"
                >
                    {action === "CREATE" ? "Create" : "Save changes"}
                </Button>
            </form>
        </Form>
    )
}
