import {FaRegHospital} from "react-icons/fa6";
import {HiOutlineChatBubbleOvalLeftEllipsis} from "react-icons/hi2";
import {LuUsers2} from "react-icons/lu";
import {MdOutlineMedicalServices} from "react-icons/md";


export const sidebarItems = [
    {
        id: 4,
        label: "Clinics",
        href: "/",
        subscription: ["FREE", "START", "FULL"],
        icon: <FaRegHospital/>,
    },
    {
        id: 1,
        label: "Services",
        href: "/services",
        subscription: ["START", "FULL"],
        icon: <MdOutlineMedicalServices className={"-ml-[1px]"}/>
    },
    // {
    //     id: 2,
    //     label: "Bookings",
    //     href: "/bookings",
    //     icon: <BookingIcon/>,
    // },
    {
        id: 3,
        label: "Employees",
        href: "/employees",
        subscription: ["START", "FULL"],
        icon: <LuUsers2/>,
    },
    {
        id: 5,
        label: "Reviews",
        href: "/reviews",
        subscription: ["FREE", "START", "FULL"],
        icon: <HiOutlineChatBubbleOvalLeftEllipsis/>,
    },
];

export const settingsTabs = [
    {path: "profile", name: "Profile"},
    {path: "subscriptions", name: "Subscriptions"},
];
export const regionsData = [
    {id: 1, name: "Qoraqalpog‘iston Respublikasi"},
    {id: 2, name: "Andijon viloyati"},
    {id: 3, name: "Buxoro viloyati"},
    {id: 4, name: "Jizzax viloyati"},
    {id: 5, name: "Qashqadaryo viloyati"},
    {id: 6, name: "Navoiy viloyati"},
    {id: 7, name: "Namangan viloyati"},
    {id: 8, name: "Samarqand viloyati"},
    {id: 9, name: "Surxandaryo viloyati"},
    {id: 10, name: "Sirdaryo viloyati"},
    {id: 11, name: "Toshkent viloyati"},
    {id: 12, name: "Farg‘ona viloyati"},
    {id: 13, name: "Xorazm viloyati"},
    {id: 14, name: "Toshkent shahri"},
];
export const districtsData = [
    {id: 15, region_id: 1, name: "Amudaryo tumani"},
    {id: 16, region_id: 1, name: "Beruniy tumani"},
    {id: 17, region_id: 1, name: "Chimboy tumani"},
    {id: 18, region_id: 1, name: "Ellikqal’a tumani"},
    {id: 19, region_id: 1, name: "Kegeyli tumani"},
    {id: 20, region_id: 1, name: "Mo‘ynoq tumani"},
    {id: 21, region_id: 1, name: "Nukus tumani"},
    {id: 22, region_id: 1, name: "Nukus shahri"},
    {id: 23, region_id: 1, name: "Qanliko‘l tumani"},
    {id: 24, region_id: 1, name: "Qo‘ng‘irot tumani"},
    {id: 25, region_id: 1, name: "Qorao‘zak tumani"},
    {id: 26, region_id: 1, name: "Shumanay tumani"},
    {id: 27, region_id: 1, name: "Taxtako‘pir tumani"},
    {id: 28, region_id: 1, name: "To‘rtko‘l tumani"},
    {id: 29, region_id: 1, name: "Xo‘jayli tumani"},
    {id: 30, region_id: 2, name: "Andijon shahri"},
    {id: 31, region_id: 2, name: "Andijon tumani"},
    {id: 32, region_id: 2, name: "Asaka tumani"},
    {id: 33, region_id: 2, name: "Asaka shahri"},
    {id: 34, region_id: 2, name: "Baliqchi tumani"},
    {id: 35, region_id: 2, name: "Bo‘ston tumani"},
    {id: 36, region_id: 2, name: "Buloqboshi tumani"},
    {id: 37, region_id: 2, name: "Izboskan tumani"},
    {id: 38, region_id: 2, name: "Jalaquduq tumani"},
    {id: 39, region_id: 2, name: "Xo‘jaobod tumani"},
    {id: 40, region_id: 2, name: "Qo‘rg‘ontepa tumani"},
    {id: 41, region_id: 2, name: "Marhamat tumani"},
    {id: 42, region_id: 2, name: "Oltinko‘l tumani"},
    {id: 43, region_id: 2, name: "Paxtaobod tumani"},
    {id: 44, region_id: 2, name: "Shahrixon tumani"},
    {id: 45, region_id: 2, name: "Ulug‘nor tumani"},
    {id: 46, region_id: 3, name: "Olot tumani"},
    {id: 47, region_id: 3, name: "Buxoro tumani"},
    {id: 48, region_id: 3, name: "Buxoro shahri"},
    {id: 49, region_id: 3, name: "G‘ijduvon tumani"},
    {id: 50, region_id: 3, name: "Jondor tumani"},
    {id: 51, region_id: 3, name: "Kogon tumani"},
    {id: 52, region_id: 3, name: "Kogon shahri"},
    {id: 53, region_id: 3, name: "Qorako‘l tumani"},
    {id: 54, region_id: 3, name: "Qorovulbozor tumani"},
    {id: 55, region_id: 3, name: "Peshku tumani"},
    {id: 56, region_id: 3, name: "Romitan tumani"},
    {id: 57, region_id: 3, name: "Shofirkon tumani"},
    {id: 58, region_id: 3, name: "Vobkent tumani"},
    {id: 59, region_id: 4, name: "Jizzax shahri"},
    {id: 60, region_id: 4, name: "Arnasoy tumani"},
    {id: 61, region_id: 4, name: "Baxmal tumani"},
    {id: 62, region_id: 4, name: "Do‘stlik tumani"},
    {id: 63, region_id: 4, name: "Forish tumani"},
    {id: 64, region_id: 4, name: "G‘allaorol tumani"},
    {id: 65, region_id: 4, name: "Sharof Rashidov tumani"},
    {id: 66, region_id: 4, name: "Mirzacho‘l tumani"},
    {id: 67, region_id: 4, name: "Paxtakor tumani"},
    {id: 68, region_id: 4, name: "Yangiobod tumani"},
    {id: 69, region_id: 4, name: "Zomin tumani"},
    {id: 70, region_id: 4, name: "Zafarobod tumani"},
    {id: 71, region_id: 4, name: "Zarbdor tumani"},
    {id: 72, region_id: 5, name: "Qarshi shahri"},
    {id: 73, region_id: 5, name: "Shahrisabz shahri"},
    {id: 74, region_id: 5, name: "Chiroqchi tumani"},
    {id: 75, region_id: 5, name: "Dehqonobod tumani"},
    {id: 76, region_id: 5, name: "G‘uzor tumani"},
    {id: 77, region_id: 5, name: "Qamashi tumani"},
    {id: 78, region_id: 5, name: "Qarshi tumani"},
    {id: 79, region_id: 5, name: "Koson tumani"},
    {id: 80, region_id: 5, name: "Kasbi tumani"},
    {id: 81, region_id: 5, name: "Kitob tumani"},
    {id: 82, region_id: 5, name: "Mirishkor tumani"},
    {id: 83, region_id: 5, name: "Muborak tumani"},
    {id: 84, region_id: 5, name: "Nishon tumani"},
    {id: 85, region_id: 5, name: "Shahrisabz tumani"},
    {id: 86, region_id: 5, name: "Yakkabog‘ tumani"},
    {id: 87, region_id: 5, name: "Ko‘kdala tumani"},
    {id: 88, region_id: 6, name: "Navoiy shahri"},
    {id: 89, region_id: 6, name: "Zarafshon shahri"},
    {id: 90, region_id: 6, name: "G‘ozg‘on shahri"},
    {id: 91, region_id: 6, name: "Konimex tumani"},
    {id: 92, region_id: 6, name: "Karmana tumani"},
    {id: 93, region_id: 6, name: "Qiziltepa tumani"},
    {id: 94, region_id: 6, name: "Xatirchi tumani"},
    {id: 95, region_id: 6, name: "Navbahor tumani"},
    {id: 96, region_id: 6, name: "Nurota tumani"},
    {id: 97, region_id: 6, name: "Tomdi tumani"},
    {id: 98, region_id: 6, name: "Uchquduq tumani"},
    {id: 99, region_id: 7, name: "Namangan shahri"},
    {id: 100, region_id: 7, name: "Chortoq tumani"},
    {id: 101, region_id: 7, name: "Chust tumani"},
    {id: 102, region_id: 7, name: "Kosonsoy tumani"},
    {id: 103, region_id: 7, name: "Mingbuloq tumani"},
    {id: 104, region_id: 7, name: "Namangan tumani"},
    {id: 105, region_id: 7, name: "Norin tumani"},
    {id: 106, region_id: 7, name: "Pop tumani"},
    {id: 107, region_id: 7, name: "To‘raqo‘rg‘on tumani"},
    {id: 108, region_id: 7, name: "Uchqo‘rg‘on tumani"},
    {id: 109, region_id: 7, name: "Uychi tumani"},
    {id: 110, region_id: 7, name: "Yangiqo‘rg‘on tumani"},
    {id: 111, region_id: 8, name: "Samarqand shahri"},
    {id: 112, region_id: 8, name: "Bulung‘ur tumani"},
    {id: 113, region_id: 8, name: "Ishtixon tumani"},
    {id: 114, region_id: 8, name: "Jomboy tumani"},
    {id: 115, region_id: 8, name: "Kattaqo‘rg‘on tumani"},
    {id: 116, region_id: 8, name: "Kattaqo‘rg‘on shahri"},
    {id: 117, region_id: 8, name: "Qo‘shrabot tumani"},
    {id: 118, region_id: 8, name: "Narpay tumani"},
    {id: 119, region_id: 8, name: "Nurobod tumani"},
    {id: 120, region_id: 8, name: "Oqdaryo tumani"},
    {id: 121, region_id: 8, name: "Paxtachi tumani"},
    {id: 122, region_id: 8, name: "Payariq tumani"},
    {id: 123, region_id: 8, name: "Pastdarg‘om tumani"},
    {id: 124, region_id: 8, name: "Samarqand tumani"},
    {id: 125, region_id: 8, name: "Toyloq tumani"},
    {id: 126, region_id: 8, name: "Urgut tumani"},
    {id: 127, region_id: 9, name: "Termiz shahri"},
    {id: 128, region_id: 9, name: "Angor tumani"},
    {id: 129, region_id: 9, name: "Boysun tumani"},
    {id: 130, region_id: 9, name: "Denov tumani"},
    {id: 131, region_id: 9, name: "Jarqo‘rg‘on tumani"},
    {id: 132, region_id: 9, name: "Qiziriq tumani"},
    {id: 133, region_id: 9, name: "Qumqo‘rg‘on tumani"},
    {id: 134, region_id: 9, name: "Muzrabot tumani"},
    {id: 135, region_id: 9, name: "Oltinsoy tumani"},
    {id: 136, region_id: 9, name: "Sariosiyo tumani"},
    {id: 137, region_id: 9, name: "Sherobod tumani"},
    {id: 138, region_id: 9, name: "Sho‘rchi tumani"},
    {id: 139, region_id: 9, name: "Termiz tumani"},
    {id: 140, region_id: 9, name: "Uzun tumani"},
    {id: 141, region_id: 10, name: "Guliston shahri"},
    {id: 142, region_id: 10, name: "Oqoltin tumani"},
    {id: 143, region_id: 10, name: "Boyovut tumani"},
    {id: 144, region_id: 10, name: "Guliston tumani"},
    {id: 145, region_id: 10, name: "Xovos tumani"},
    {id: 146, region_id: 10, name: "Mirzaobod tumani"},
    {id: 147, region_id: 10, name: "Sayxunobod tumani"},
    {id: 148, region_id: 10, name: "Sardoba tumani"},
    {id: 149, region_id: 10, name: "Sirdaryo tumani"},
    {id: 150, region_id: 10, name: "Yangiyer shahri"},
    {id: 151, region_id: 10, name: "Shirin shahri"},
    {id: 152, region_id: 11, name: "Angren shahri"},
    {id: 153, region_id: 11, name: "Bekobod tumani"},
    {id: 154, region_id: 11, name: "Bekobod shahri"},
    {id: 155, region_id: 11, name: "Olmaliq shahri"},
    {id: 156, region_id: 11, name: "Chirchiq shahri"},
    {id: 157, region_id: 11, name: "Bo‘stonliq tumani"},
    {id: 158, region_id: 11, name: "Bo‘ka tumani"},
    {id: 159, region_id: 11, name: "Chinoz tumani"},
    {id: 160, region_id: 11, name: "Qibray tumani"},
    {id: 161, region_id: 11, name: "Ohangaron tumani"},
    {id: 162, region_id: 11, name: "Ohangaron shahri"},
    {id: 163, region_id: 11, name: "Oqqo‘rg‘on tumani"},
    {id: 164, region_id: 11, name: "Parkent tumani"},
    {id: 165, region_id: 11, name: "Piskent tumani"},
    {id: 166, region_id: 11, name: "Quyi Chirchiq tumani"},
    {id: 167, region_id: 11, name: "O‘rta Chirchiq tumani"},
    {id: 168, region_id: 11, name: "Yangiyo‘l tumani"},
    {id: 169, region_id: 11, name: "Yangiyo‘l shahri"},
    {id: 170, region_id: 11, name: "Yuqori Chirchiq tumani"},
    {id: 171, region_id: 11, name: "Zangiota tumani"},
    {id: 172, region_id: 12, name: "Farg‘ona shahri"},
    {id: 173, region_id: 12, name: "Qo‘qon shahri"},
    {id: 174, region_id: 12, name: "Marg‘ilon shahri"},
    {id: 175, region_id: 12, name: "Oltiariq tumani"},
    {id: 176, region_id: 12, name: "Bag‘dod tumani"},
    {id: 177, region_id: 12, name: "Beshariq tumani"},
    {id: 178, region_id: 12, name: "Buvayda tumani"},
    {id: 179, region_id: 12, name: "Dang‘ara tumani"},
    {id: 180, region_id: 12, name: "Yozyovon tumani"},
    {id: 181, region_id: 12, name: "Quva tumani"},
    {id: 182, region_id: 12, name: "Quvasoy shahri"},
    {id: 183, region_id: 12, name: "Rishton tumani"},
    {id: 184, region_id: 12, name: "So‘x tumani"},
    {id: 185, region_id: 12, name: "Toshloq tumani"},
    {id: 186, region_id: 12, name: "Uchko‘prik tumani"},
    {id: 187, region_id: 12, name: "Furqat tumani"},
    {id: 188, region_id: 13, name: "Xiva tumani"},
    {id: 189, region_id: 13, name: "Urganch tumani"},
    {id: 190, region_id: 13, name: "Xonqa tumani"},
    {id: 191, region_id: 13, name: "Xazarasp tumani"},
    {id: 192, region_id: 13, name: "Shovot tumani"},
    {id: 193, region_id: 13, name: "Bog‘ot tumani"},
    {id: 194, region_id: 13, name: "Qo‘shko‘pir tumani"},
    {id: 195, region_id: 13, name: "Yangiariq tumani"},
    {id: 196, region_id: 13, name: "Urganch shahri"},
    {id: 197, region_id: 13, name: "Gurlan tumani"},
    {id: 198, region_id: 13, name: "Yangibozor tumani"},
    {id: 199, region_id: 14, name: "Bektemir tumani"},
    {id: 200, region_id: 14, name: "Mirzo Ulug‘bek tumani"},
    {id: 201, region_id: 14, name: "Mirobod tumani"},
    {id: 202, region_id: 14, name: "Olmazor tumani"},
    {id: 203, region_id: 14, name: "Sirg‘ali tumani"},
    {id: 204, region_id: 14, name: "Uchtepa tumani"},
    {id: 205, region_id: 14, name: "Shayxontohur tumani"},
    {id: 206, region_id: 14, name: "Yakkasaroy tumani"},
    {id: 207, region_id: 14, name: "Yunusobod tumani"},
    {id: 208, region_id: 14, name: "Chilonzor tumani"},
    {id: 209, region_id: 14, name: "Yashnobod tumani"}
];

export const subscriptionPlans = [
    {
        name: "FREE",
        includes: [
            "Klinikangiz haqida ma'lumotlarni kiriting",
        ]
    },
    {
        name: "START",
        includes: [
            "Klinikangiz haqida ma'lumotlarni kiriting",
            "Klinikangiz xizmatlarini kiriting",
        ]
    },
    {
        name: "FULL",
        includes: [
            "Klinikangiz haqida ma'lumotlarni kiriting",
            "Klinikangiz xizmatlarini kiriting",
            "Klinikangizda onlayn navbatlarni joriy qiling"
        ]
    }
]