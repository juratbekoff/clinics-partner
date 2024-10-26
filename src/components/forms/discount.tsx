import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Button} from "../ui/button.tsx";
import {Input} from "../ui/input.tsx";
import {DiscountSchema} from "../../lib/validations.ts";
import React from "react";
import {DiscountType} from "../../types/discount";
import {useCreateDiscount, useUpdateDiscount} from "../../hooks/useDiscounts.ts";

type ClinicFormProps = {
    action: "CREATE" | "EDIT",
    data?: DiscountType,
}

export function DiscountForm({data, action}: ClinicFormProps) {
    const form = useForm<z.infer<typeof DiscountSchema>>({
        resolver: zodResolver(DiscountSchema),
        defaultValues: {
            discount: data?.discount,
        },
    })

    const createDiscountMutation = useCreateDiscount()
    const updateDiscountMutation = useUpdateDiscount()

    function onSubmit(values: z.infer<typeof DiscountSchema>) {
        if (action === "CREATE") {
            createDiscountMutation.mutate(values)
        } else {
            updateDiscountMutation.mutate({
                id: data?.id!,
                data: values,
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h1 className={"text-xl font-medium"}>{action === "CREATE" ? "Create discount" : "Edit discount"}</h1>

                <FormField
                    control={form.control}
                    name="discount"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Discount</FormLabel>
                            <FormControl>
                                <Input placeholder="discount" {...field} type={"number"}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={createDiscountMutation.isLoading || updateDiscountMutation.isLoading}
                    type="submit"
                >
                    {action === "CREATE" ? "Create" : "Save changes"}
                </Button>
            </form>
        </Form>
    )
}
