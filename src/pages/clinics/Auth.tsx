import React from 'react';
import {useGetClinics} from "../../hooks/useClinics.ts";
import {ClinicType} from "../../types/clinic";
import {LuLoader2} from "react-icons/lu";
import {customToast} from "../../lib/utils.tsx";
import {Navigate, useNavigate} from "react-router-dom";
import {DialogModal} from "../../components/ui/dialog.tsx";
import {useCreateClinicModal} from "../../hooks/useZustand.ts";
import {ClinicAuthStepForm} from "../../components/forms/clinics/clinic-auth-step.tsx";

const CLinicAuth = () => {
    const getClinicsQuery = useGetClinics()
    const clinicsData: ClinicType[] = getClinicsQuery.data?.data?.clinics

    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
        return <Navigate to={"/auth/step-1"}/>
    }

    const navigate = useNavigate()
    const createClinicModal = useCreateClinicModal()

    const onChooseClinic = (clinicId: number) => {
        localStorage.setItem("currentClinic", clinicId.toString())
        customToast("SUCCESS", "Xush kelibsiz!")
        return navigate("/")
    }

    return (
        <>
            <DialogModal isOpen={createClinicModal.isOpen} onClose={createClinicModal.onClose}>
                <ClinicAuthStepForm action={"CREATE"}/>
            </DialogModal>

            <div className={"flex flex-col gap-5 w-2/5 max-lg:w-2/3"}>
                <h1 className={"font-semibold text-center text-2xl"}>Choose clinic</h1>

                {
                    getClinicsQuery?.isLoading ? <LuLoader2 className={"animate-spin self-center text-3xl"}/> :
                        <div className={"flex flex-col gap-3 rounded-md"}>
                            {
                                clinicsData?.map((clinic) => (
                                    <div
                                        key={clinic.id}
                                        className={"p-1 rounded-md flex items-center gap-2 border cursor-pointer hover:bg-primary/10 hover:border-primary/10 hover:duration-300"}
                                        onClick={() => onChooseClinic(clinic.id)}
                                    >
                                        <img
                                            src={clinic.logo}
                                            alt="#"
                                            className={"size-10 rounded-full"}
                                        />

                                        <h1>{clinic.name}</h1>
                                    </div>
                                ))
                            }

                            <div
                                className={"flex justify-center items-center p-1 border rounded-md cursor-pointer"}
                                onClick={createClinicModal.onOpen}
                            >
                                <h1>+ Add clinic</h1>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default CLinicAuth;