import React from 'react';
import Select from "react-select";
import {useGetClinics} from "../hooks/useClinics.ts";
import {ClinicType} from "../types/clinic";
import {LuLoader2} from "react-icons/lu";

const ClinicDropdown = () => {
    const getPartnerClinics = useGetClinics()

    if (getPartnerClinics.isLoading) {
        return <LuLoader2 className={"animate-spin text-xl"}/>
    }

    const clinicsData: ClinicType[] = getPartnerClinics.data?.data?.clinics

    const storedClinicId = localStorage.getItem("currentClinic")
    const currentClinic = clinicsData?.find(clinic => clinic.id === +storedClinicId!)

    const onCurrentClinicChanged = (id: number) => {
        localStorage.setItem("currentClinic", id.toString())
        window.location.href = "/"
    }

    return (
        <div className={"grid grid-cols-1 w-52"}>
            <Select
                className={"text-sm"}
                defaultValue={{
                    value: currentClinic?.id,
                    label: currentClinic?.name,
                }}
                options={clinicsData?.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })}
                onChange={(item) => onCurrentClinicChanged(item?.value!)}
            />
        </div>
    );
};

export default ClinicDropdown;