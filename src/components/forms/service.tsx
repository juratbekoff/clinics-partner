import {Button} from "../ui/button.tsx";
import {ClinicServiceType, GlobalServiceType} from "../../types/service";
import {useCreateService, useGetGlobalServices, useUpdateService} from "../../hooks/useServices.ts";
import Select from "react-select";
import {useState} from "react";

type ServiceFormProps = {
    action: "CREATE" | "EDIT",
    data?: ClinicServiceType,
}

export function ServiceForm({data, action}: ServiceFormProps) {
    const [service, setService] = useState<{ value: number, label: string }>({
        value: data?.service?.id!,
        label: data?.service?.name!,
    });

    const getGlobalServicesQuery = useGetGlobalServices()
    const globalServicesData: GlobalServiceType[] = getGlobalServicesQuery.data?.data?.services

    const createServiceMutation = useCreateService()
    const updateServiceMutation = useUpdateService()

    function onSubmit(e: any) {
        e.preventDefault()

        if (action === "CREATE") {
            createServiceMutation.mutate(service.value)
        } else {
            updateServiceMutation.mutate({
                id: data?.id!,
                serviceId: service.value
            })
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <h1 className={"text-xl"}>{action === "CREATE" ? "Add service" : "Edit service"}</h1>

            <Select
                className={"text-sm"}
                placeholder={"Tanlang"}
                options={globalServicesData?.map((service) => {
                    return {
                        value: service.id,
                        label: service.name,
                    }
                })}
                defaultValue={service.value ? service : undefined}
                onChange={(item) => setService({
                    label: item?.label!,
                    value: item?.value!,
                })}
            />

            <Button
                disabled={createServiceMutation.isLoading || updateServiceMutation.isLoading}
                type="submit"
            >
                Saqlash
            </Button>
        </form>
    )
}
