import {SingleEmployeeType} from "./employee";
import {SubServiceType} from "./service";

export type UserType = {
    id: number;
    name: string;
    surname: string;
    phone: string;
};

export type BookingType = {
    id: number;
    employeeId: number;
    userId: number;
    bookingTimeStart: string;
    bookingTimeEnd: string;
    createdAt: string;
    updatedAt: string;
    employee: SingleEmployeeType;
    user: UserType;
    subService: SubServiceType
};

export type GetBookingType = {
    meta: {
        currentPage: number;
        limit: number;
        total_pages: number;
        totalBookings: number;
    },
    bookings: BookingType[]
}