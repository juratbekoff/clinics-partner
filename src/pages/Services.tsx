import Navbar from "../components/navbar.tsx";
import "../styles/table.css"
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useDeleteService, useGetServices} from "../hooks/useServices.ts";
import {ClinicServiceType} from "../types/service";
import {DialogModal} from "../components/ui/dialog.tsx";
import {ServiceForm} from "../components/forms/service.tsx";
import {useCreateServiceModal, useUpdateServiceModal} from "../hooks/useZustand.ts";
import {useEffect, useState} from "react";
import ServiceCard from "../components/cards/service.tsx";
import StateShower from "../components/cards/state-shower.tsx";

const Services = () => {
    const [service, setService] = useState<ClinicServiceType>()
    const [keyword, setKeyword] = useState<string>("")

    const getServicesQuery = useGetServices(keyword);
    const servicesData: ClinicServiceType[] = getServicesQuery.data?.data?.services

    const createServiceModal = useCreateServiceModal();
    const updateServiceModal = useUpdateServiceModal();

    const deleteServiceMutation = useDeleteService();

    const onEdit = (id: number) => {
        const findService = servicesData?.find((service) => service.id === id)
        if (findService) {
            setService(findService)
        }
    }

    const onDelete = (id: number) => {
        const isOk = confirm("Haqiqatdan ham o'chirib tashlamoqchimisiz?")
        if (isOk) {
            deleteServiceMutation.mutate(id)
        }
    }

    useEffect(() => {
        getServicesQuery.refetch()
    }, [keyword])

    return (
        <>
            <Navbar name={"Services"}/>

            <DialogModal isOpen={createServiceModal.isOpen} onClose={createServiceModal.onClose}>
                <ServiceForm action={"CREATE"}/>
            </DialogModal>

            <DialogModal isOpen={updateServiceModal.isOpen} onClose={updateServiceModal.onClose}>
                <ServiceForm action={"EDIT"} data={service}/>
            </DialogModal>

            <div className={"flex justify-between"}>
                <div className={"w-1/2 grid grid-cols-2"}>
                    <Input placeholder={"Search"} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={createServiceModal.onOpen}>Add service +</Button>
            </div>

            {
                getServicesQuery.isLoading && deleteServiceMutation.isLoading ?
                    <StateShower id={"loading"} name={"Loading..."}/>
                    : servicesData?.length === 0 ?
                        <StateShower id={"no_data"} name={"No services found!"}/>
                        : <div className={"grid grid-cols-4 gap-5"}>
                            {
                                servicesData?.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        data={service}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))
                            }
                        </div>
            }
        </>
    );
}

export default Services;