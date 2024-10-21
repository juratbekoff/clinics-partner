import Navbar from "../components/navbar.tsx";
import {Input} from "../components/ui/input.tsx";
import BookingsTable from "../components/tables/bookings.tsx";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {GrFormNextLink} from "react-icons/gr";
import {Button} from "../components/ui/button.tsx";
import React, {useEffect, useState} from "react";
import dateFormat from "dateformat";
import {useGetBookings} from "../hooks/useBookings.ts";
import {GetBookingType} from "../types/boooking";
import {numberSpacer} from "../lib/utils.tsx";
import {Pagination} from "antd";
import StateShower from "../components/cards/state-shower.tsx";
import {useGetServices} from "../hooks/useServices.ts";
import {ClinicServiceType} from "../types/service";
import Select from "react-select";
import {DialogModal} from "../components/ui/dialog.tsx";
import {useCreateBookingModal} from "../hooks/useZustand.ts";
import {BookingForm} from "../components/forms/booking.tsx";

const Bookings = () => {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)
    const [keyword, setKeyword] = useState("")
    const [clinicServiceId, setClinicServiceId] = useState(0)

    const [day, setDay] = useState<Date>(new Date());

    const getBookingsQuery = useGetBookings(day, keyword, page, limit, clinicServiceId);
    const bookingsData: GetBookingType = getBookingsQuery?.data?.data

    const getClinicServicesQuery = useGetServices()
    const clinicServicesData: ClinicServiceType[] = getClinicServicesQuery?.data?.data?.services

    const createBookingModal = useCreateBookingModal()

    const onNextDay = () => {
        setDay(prevDay => {
            const nextDay = new Date(prevDay.getTime());
            nextDay.setDate(prevDay.getDate() + 1);
            return nextDay;
        });
    }

    const onPrevDay = () => {
        setDay(prevDay => {
            const prevDayCopy = new Date(prevDay.getTime());
            prevDayCopy.setDate(prevDay.getDate() - 1);
            return prevDayCopy;
        });
    }

    useEffect(() => {
        getBookingsQuery.refetch()
    }, [page, limit, keyword, day, clinicServiceId]);

    return (
        <>
            <DialogModal isOpen={createBookingModal.isOpen} onClose={createBookingModal.onClose}>
                <BookingForm action={"CREATE"}/>
            </DialogModal>

            <Navbar name={"Bookings"}/>

            <div className={"flex justify-between"}>
                <div className={"flex gap-[10px] items-center"}>
                    <MdOutlineCalendarMonth className={"text-2xl text-gray-600 cursor-pointer"}/>

                    <span className={"font-medium text-2xl select-none"}>
                        {dateFormat(day, "dd.mm.yyyy")}
                    </span>

                    <div className={"flex gap-[6px]"}>
                        <div
                            className={"bg-white p-1 rounded-md border cursor-pointer"}
                            onClick={onPrevDay}
                        >
                            <GrFormNextLink className={"text-xl text-gray-700 rotate-180"}/>
                        </div>

                        <div
                            className={"bg-white p-1 rounded-md border cursor-pointer"}
                            onClick={onNextDay}
                        >
                            <GrFormNextLink className={"text-xl text-gray-700"}/>
                        </div>
                    </div>
                </div>

                <div className={"flex gap-4"}>
                    <Input
                        placeholder={"Search"}
                        className={"w-auto h-full"}
                        onChange={e => setKeyword(e.target.value)}
                    />

                    <Select
                        className={"text-sm w-52"}
                        options={[
                            {value: 0, label: "All"},
                            ...(clinicServicesData?.map(item => ({
                                value: item.id,
                                label: item?.service?.name
                            })) || [])
                        ]}
                        onChange={(item) => setClinicServiceId(item?.value!)}
                        placeholder={"Choose service"}
                    />

                    <Button onClick={createBookingModal.onOpen}>Create booking +</Button>
                </div>
            </div>

            {getBookingsQuery.isLoading
                ? <StateShower id={"loading"} name={"Loading..."}/>
                : bookingsData?.bookings?.length === 0
                    ? <StateShower id={"no_data"} name={"No bookings found!"}/>
                    : <>
                        <BookingsTable data={bookingsData?.bookings}/>

                        <div className={"flex justify-between mt-3"}>
                            <div className={"flex gap-1"}>
                                <span>Jami:</span>
                                <h1 className={"font-medium"}>{numberSpacer(bookingsData?.meta?.totalBookings || 0)}</h1>
                            </div>

                            <Pagination
                                showSizeChanger
                                defaultCurrent={page}
                                defaultPageSize={limit}
                                total={bookingsData?.meta?.totalBookings}
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

export default Bookings;