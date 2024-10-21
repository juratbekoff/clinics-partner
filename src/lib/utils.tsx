import {twMerge} from "tailwind-merge";
import {type ClassValue, clsx} from "clsx";
import toastResponsive from "react-hot-toast";
import dateFormat from "dateformat";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const customToast = (type: "SUCCESS" | "ERROR", message: string) => {
    switch (type) {
        case "SUCCESS":
            toastResponsive.success(`${message}`, {
                duration: 2000,
            });
            break;
        case "ERROR":
            toastResponsive.error(`${message}`, {
                duration: 3000,
            });
            break;
        default:
            toastResponsive("Something went wrong!");
            break;
    }
};

export const dateFormatter = (date: string) => {
    const paddedShortDate = dateFormat(date, "dd/mm/yyyy");
    const shortTime = dateFormat(date, "HH:MM");

    return `${paddedShortDate}, ${shortTime}`;
};

export const formatPhoneNumber = (input: string, type: "INPUT" | "TEXT") => {
    if (type === "INPUT") {
        const numericOnly = input.replace(/[^0-9]/g, "");
        return numericOnly.startsWith("+") && numericOnly.length > 11
            ? numericOnly.slice(1)
            : numericOnly;
    } else if (type === "TEXT") {
        const regex = /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/;
        return input.replace(regex, "+$1 ($2) $3-$4-$5");
    }
};

export const numberSpacer = (amount?: number | null) => {
    if (amount == null) {
        return 0;
    }

    return parseInt(String(amount), 10).toLocaleString().replace(/,/g, " ");
};

export const weekDays = [
    {value: "MONDAY", label: "Dushanba"},
    {value: "TUESDAY", label: "Seshanba"},
    {value: "WEDNESDAY", label: "Chorshanba"},
    {value: "THURSDAY", label: "Payshanba"},
    {value: "FRIDAY", label: "Juma"},
    {value: "SATURDAY", label: "Shanba"},
    {value: "SUNDAY", label: "Yakshanba"}
];

export const localizedDay = (day: string) => {
    const findDay = weekDays.find(weekDay => weekDay.value === day)
    if (!findDay) {
        return day
    } else {
        return findDay.label
    }
}
