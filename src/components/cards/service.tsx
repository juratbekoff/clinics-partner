import React from 'react';
import {ClinicServiceType} from "../../types/service";
import {useUpdateServiceModal} from "../../hooks/useZustand.ts";
import {Link} from "react-router-dom";

type ServiceCardProps = {
    data: ClinicServiceType,
    onEdit: (id: number) => void,
    onDelete: (id: number) => void,
}

const ServiceCard = ({data, onEdit, onDelete}: ServiceCardProps) => {
    const updateServiceModal = useUpdateServiceModal()

    return (
        <Link
            to={`/sub-services/${data.id}`}
            className={"bg-white border rounded-md p-4 flex justify-between shadow-sm"}
        >
            <div className={"flex flex-col gap-3"}>
                <h1 className={"text-base font-medium"}>{data?.service?.name}</h1>

                <div className={"flex flex-col gap-1"}>
                    <span className={"text-xs text-grey_four"}>Sub-services</span>
                    <h1 className={"text-[15px] font-medium leading-4"}>{data?._count?.subServices || 0} ta</h1>
                </div>

                <div className={"flex flex-col gap-1"}>
                    <span className={"text-xs text-grey_four"}>Employees</span>
                    <h1 className={"text-[15px] font-medium leading-4"}>{data?._count?.employees || 0} ta</h1>
                </div>
            </div>

            <div className={"flex flex-col gap-[6px]"}>
                <img
                    src="/edit.svg"
                    alt="#"
                    className={"cursor-pointer"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateServiceModal.onOpen()
                        onEdit(data.id)
                    }}
                />

                <img
                    src="/delete.svg"
                    alt="#"
                    className={"cursor-pointer"}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation()
                        onDelete(data.id)
                    }}
                />
            </div>
        </Link>
    );
};


export default ServiceCard;