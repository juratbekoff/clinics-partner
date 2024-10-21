export type ClinicType = {
    id: number;
    partnerId: number;
    name: string;
    descr: string;
    logo: string;
    images: {
        id: string;
        url: string;
    }[];
    location: string;
    phone_number: string;
    website_url: string;
    instagram_url: string;
    youtube_url: string;
    telegram_url: string;
    regionId: number;
    districtId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
    _count: {
        clinicServices: number;
    };
};
