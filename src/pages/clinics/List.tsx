import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar.tsx";
import {Input} from "../../components/ui/input.tsx";
import {useCreateClinicModal} from "../../hooks/useZustand.ts";
import {DialogModal} from "../../components/ui/dialog.tsx";
import {ClinicAuthStepForm} from "../../components/forms/clinics/clinic-auth-step.tsx";
import {useGetClinics} from "../../hooks/useClinics.ts";
import {ClinicType} from "../../types/clinic";
import ClinicsTable from "../../components/tables/clinics.tsx";
import {useNavigate} from "react-router-dom";
import StateShower from "../../components/cards/state-shower.tsx";

const ClinicsList = () => {
    const [keyword, setKeyword] = useState("");

    const createClinicModal = useCreateClinicModal();

    const getClinicsQuery = useGetClinics(keyword)
    const clinicsData: ClinicType[] = getClinicsQuery.data?.data?.clinics

    const navigate = useNavigate();


    useEffect(() => {
        getClinicsQuery.refetch()
    }, [keyword]);

    if (getClinicsQuery.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }


    return (
        <>
            <DialogModal isOpen={createClinicModal.isOpen} onClose={createClinicModal.onClose}>
                <ClinicAuthStepForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Clinics"}/>

            <div className={"flex justify-between"}>
                <div className={"w-1/2 grid grid-cols-2"}>
                    <Input placeholder={"Search"} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                {/*<Button onClick={() => navigate("/clinics/create")}>Create clinic +</Button>*/}
            </div>

            {
                clinicsData?.length === 0
                    ? <StateShower id={"no_data"} name={"No clinics found!"}/>
                    : <ClinicsTable data={clinicsData}/>
            }
        </>
    );
};

export default ClinicsList;