import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Button} from "../ui/button.tsx";
import {Input} from "../ui/input.tsx";
import {FolderSchema} from "../../lib/validations.ts";
import React from "react";
import {useCreateFolder, useUpdateFolder} from "../../hooks/useFolder.ts";
import {FolderType} from "../../types/folder";

type ClinicFormProps = {
    action: "CREATE" | "EDIT",
    data?: FolderType,
}

export function FolderForm({data, action}: ClinicFormProps) {
    const form = useForm<z.infer<typeof FolderSchema>>({
        resolver: zodResolver(FolderSchema),
        defaultValues: {
            name: data?.name,
        },
    })

    const createFolderMutation = useCreateFolder()
    const updateFolderMutation = useUpdateFolder()

    function onSubmit(values: z.infer<typeof FolderSchema>) {
        if (action === "CREATE") {
            createFolderMutation.mutate(values)
        } else {
            updateFolderMutation.mutate({
                id: data?.id!,
                data: values,
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <h1 className={"text-xl font-medium"}>{action === "CREATE" ? "Create folder" : "Edit folder"}</h1>

                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="nomi" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Button
                    disabled={createFolderMutation.isLoading || updateFolderMutation.isLoading}
                    type="submit"
                >
                    {action === "CREATE" ? "Create" : "Save changes"}
                </Button>
            </form>
        </Form>
    )
}
