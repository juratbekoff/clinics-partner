import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Button} from "../../ui/button.tsx";
import {Input, MaskInput} from "../../ui/input.tsx";
import {ClinicAuthStepSchema} from "../../../lib/validations.ts";
import {Textarea} from "../../ui/textarea.tsx";
import Uploader from "../../ui/uploader.tsx";
import {ClinicType} from "../../../types/clinic";
import {useState} from "react";
import {useCreateClinic, useUpdateClinic} from "../../../hooks/useClinics.ts";

type ClinicFormProps = {
    action: "CREATE" | "EDIT",
    data?: ClinicType,
}

export function ClinicAuthStepForm({data, action}: ClinicFormProps) {
    const [logo, setLogo] = useState<any>()

    const form = useForm<z.infer<typeof ClinicAuthStepSchema>>({
        resolver: zodResolver(ClinicAuthStepSchema),
        defaultValues: {
            name: data?.name,
            descr: data?.descr,
            location: data?.location,
            phone_number: data?.phone_number,
        },
    })

    const createClinicMutation = useCreateClinic()
    const updateClinicMutation = useUpdateClinic()

    function onSubmit(values: z.infer<typeof ClinicAuthStepSchema>) {
        console.log(logo)
        console.log(values)

        const formData = new FormData()

        if (logo) {
            formData.append("logo", logo)
        }

        formData.append("name", values.name)
        formData.append("descr", values.descr!)
        formData.append("location", values.location)
        formData.append("phone_number", values.phone_number)

        if (action === "CREATE") {
            createClinicMutation.mutate(formData)
        } else {
            updateClinicMutation.mutate({
                id: data?.id!,
                data: formData,
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1 className={"text-xl font-medium"}>{action === "CREATE" ? "Add clinic" : "Edit clinic"}</h1>

                <div className={"grid grid-cols-2 gap-5"}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nomi</FormLabel>
                                <FormControl>
                                    <Input placeholder="nomi" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <MaskInput placeholder="+998" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input placeholder="123333,12334" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"flex flex-col gap-2 mt-1 text-sm"}>
                        <span className={"font-medium"}>Logo</span>
                        <Uploader
                            placeholder={"Upload logo"}
                            url={data?.logo}
                            setFile={setLogo}
                            showPreview={false}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="descr"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Tasnif</FormLabel>
                            <FormControl>
                                <Textarea placeholder={"Tasnif kiriting..."} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={createClinicMutation.isLoading || updateClinicMutation.isLoading}
                    type="submit"
                >
                    {action === "CREATE" ? "Qo'shish" : "O'zgarishlarni saqlash"}
                </Button>
            </form>
        </Form>
    )
}
