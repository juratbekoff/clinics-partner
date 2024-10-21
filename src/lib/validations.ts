import {z} from "zod";

export const ServiceSchema = z.object({
    serviceId: z.number({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }).min(1, "Maydon bo'sh bo'lmasligi kerak!"),
})

export const ClinicAuthStepSchema = z.object({
    name: z.string({message: "Maydon bo'sh bo'lmasligi kerak!", required_error: "Maydon bo'sh bo'lmasligi kerak!"}),
    descr: z.string().optional(),
    phone_number: z.string({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }).min(1, {
        message: "Maydon bo'sh bo'lmasligi kerak!",
    }),
    location: z.string({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }).min(1, "Maydon bo'sh bo'lmasligi kerak!")
})

export const ClinicGeneralSchema = z.object({
    name: z.string({required_error: "Required!"}).min(1, "Required!"),
    logo: z.any().optional(),
    images: z.any().optional(),
    descr: z.string({required_error: "Required!"}).min(1, "Required!"),
    location: z.string({required_error: "Required!"}).min(1, "Required!"),
    phone_number: z.string({required_error: "Required!"}),
    website_url: z.any().optional(),
    instagram_url: z.any().optional(),
    youtube_url: z.any().optional(),
    telegram_url: z.any().optional(),
});

export const SubServiceSchema = z.object({
    name: z.string({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }),
    comment: z.string().optional(),
    slotDuration: z.coerce.number({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }).min(1, "Maydon bo'sh bo'lmasligi kerak!"),
})

export const EmployeeSchema = z.object({
    serviceId: z.coerce.number().optional(),
    name: z.string({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }),
    surname: z.string().optional(),
    phone: z.string({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }).min(1, "Maydon bo'sh bo'lmasligi kerak!")
})

export const FolderSchema = z.object({
    name: z.string({
        message: "Maydon bo'sh bo'lmasligi kerak!",
        required_error: "Maydon bo'sh bo'lmasligi kerak!"
    }),
})


export const WorkingHoursSchema = z.object({
    day: z.any().optional(),
    startTime: z.any().optional(),
    endTime: z.any().optional(),
    lunchStartTime: z.any().optional(),
    lunchEndTime: z.any().optional(),
});