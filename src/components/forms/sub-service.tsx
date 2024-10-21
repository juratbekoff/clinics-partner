import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Button} from "../ui/button.tsx";
import {Input} from "../ui/input.tsx";
import {SubServiceSchema} from "../../lib/validations.ts";
import {SubServiceType} from "../../types/service";
import {useCreateSubService, useUpdateSubService} from "../../hooks/useSubServices.ts";

type ClinicFormProps = {
    action: "CREATE" | "EDIT",
    data?: SubServiceType,
    clinicServiceId?: number
}

export function SubServiceForm({clinicServiceId, data, action}: ClinicFormProps) {
    const form = useForm<z.infer<typeof SubServiceSchema>>({
        resolver: zodResolver(SubServiceSchema),
        defaultValues: {
            name: data?.name,
            comment: data?.comment,
            slotDuration: data?.slotDuration,
        },
    })

    const createSubServiceMutation = useCreateSubService()
    const updateSubServiceMutation = useUpdateSubService()

    function onSubmit(values: z.infer<typeof SubServiceSchema>) {
        if (action === "CREATE") {
            createSubServiceMutation.mutate({
                ...values,
                clinicServiceId
            })
        } else {
            updateSubServiceMutation.mutate({
                id: data?.id!,
                data: values
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h1 className={"text-xl font-medium mb-3"}>{action === "CREATE" ? "Create sub-service" : "Edit sub-service"}</h1>

                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="comment"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Comment</FormLabel>
                            <FormControl>
                                <Input placeholder={"comment"} {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slotDuration"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Slot (mins)</FormLabel>
                            <FormControl>
                                <Input type={"number"} placeholder="slot duration" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={createSubServiceMutation.isLoading || updateSubServiceMutation.isLoading}
                    type="submit"
                >
                    {action === "CREATE" ? "Create" : "Save changes"}
                </Button>
            </form>
        </Form>
    )
}
