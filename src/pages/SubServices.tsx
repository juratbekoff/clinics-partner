import React, {useEffect, useState} from 'react';
import Navbar from "../components/navbar.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {useGetSubServices} from "../hooks/useSubServices.ts";
import {Link, useParams} from "react-router-dom";
import {SubServiceType} from "../types/service";
import StateShower from "../components/cards/state-shower.tsx";
import SubServiceTable from "../components/tables/sub-service.tsx";
import {MdOutlineKeyboardBackspace} from "react-icons/md";
import {DialogModal} from "../components/ui/dialog.tsx";
import {SubServiceForm} from "../components/forms/sub-service.tsx";
import {useCreateSubServiceModal} from "../hooks/useZustand.ts";

const SubServices = () => {
    const {clinicServiceId} = useParams()
    const [keyword, setKeyword] = useState("");

    const createSubServiceModal = useCreateSubServiceModal();

    if (!clinicServiceId) {
        return <h1>ClinicServiceId is missed!</h1>
    } else if (isNaN(+clinicServiceId)) {
        return <h1>ClinicServiceId should be numeric!</h1>
    }

    const getSubServicesQuery = useGetSubServices(+clinicServiceId, keyword);
    const subServicesData: SubServiceType[] = getSubServicesQuery.data?.data?.clinicSubServices

    useEffect(() => {
        getSubServicesQuery.refetch()
    }, [keyword])

    if (getSubServicesQuery.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    return (
        <>
            <DialogModal isOpen={createSubServiceModal.isOpen} onClose={createSubServiceModal.onClose}>
                <SubServiceForm action={"CREATE"} clinicServiceId={+clinicServiceId}/>
            </DialogModal>

            <Navbar name={"Sub-services"}/>

            <div className={"flex justify-between w-full"}>
                <Link to={"/"} className={"flex items-center gap-2 cursor-pointer"}>
                    <MdOutlineKeyboardBackspace/>
                    <span>Orqaga</span>
                </Link>

                <div className={"flex gap-4"}>
                    <div>
                        <Input placeholder={"Search"} className={"w-60"} onChange={e => setKeyword(e.target.value)}/>
                    </div>

                    <Button onClick={createSubServiceModal.onOpen}>Add sub-service +</Button>
                </div>
            </div>

            {
                subServicesData?.length === 0 ?
                    <StateShower id={"no_data"} name={"No sub services found!"}/>
                    : <SubServiceTable data={subServicesData}/>
            }
        </>
    );
};

export default SubServices;