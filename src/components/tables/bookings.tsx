import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {BookingType} from "../../types/boooking";
import {formatPhoneNumber} from "../../lib/utils.tsx";
import dateFormat from "dateformat";

const BookingsTable = ({data}: { data: BookingType[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Sub-Service</TableHead>
                    <TableHead>Client name</TableHead>
                    <TableHead>Client phone</TableHead>
                    <TableHead>Booking time</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    data?.map((booking) => (
                        <TableRow key={booking.id}>
                            <TableCell>#{booking.id}</TableCell>
                            <TableCell>{booking?.employee?.name}</TableCell>
                            <TableCell>{booking?.employee?.clinicService?.service?.name}</TableCell>
                            <TableCell>{booking?.subService?.name}</TableCell>
                            <TableCell>{booking?.user?.name} {booking?.user?.surname || ""}</TableCell>
                            <TableCell>{formatPhoneNumber(booking?.user?.phone, "TEXT")}</TableCell>
                            <TableCell>{dateFormat(booking?.bookingTimeStart, "HH:MM")}-{dateFormat(booking?.bookingTimeEnd, "HH:MM")}</TableCell>
                            <TableCell>
                                <div className={"flex gap-2 relative right-0"}>
                                    <img src="/edit.svg" alt={"#"}
                                         className={"select-none cursor-pointer size-[26px]"}/>
                                    <img src="/delete.svg" alt={"#"}
                                         className={"select-none cursor-pointer size-[26px]"}/>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default BookingsTable;