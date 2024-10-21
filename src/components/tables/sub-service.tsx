import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {SubServiceType} from "../../types/service";
import {customToast, dateFormatter} from "../../lib/utils.tsx";
import {useDeleteSubService} from "../../hooks/useSubServices.ts";
import {useState} from "react";
import {DialogModal} from "../ui/dialog.tsx";
import {useUpdateSubServiceModal} from "../../hooks/useZustand.ts";
import {SubServiceForm} from "../forms/sub-service.tsx";

const SubServiceTable = ({data}: { data: SubServiceType[] }) => {
    const [subService, setSubService] = useState<SubServiceType>();

    const updateSubServiceModal = useUpdateSubServiceModal();
    const deleteSubServiceMutation = useDeleteSubService()

    const onDelete = (id: number) => {
        const isOk = confirm("Are you sure to delete this sub-service!")
        if (isOk) {
            deleteSubServiceMutation.mutate(id)
        }
    }

    const onEdit = (id: number) => {
        const findSubService = data?.find((subService) => subService.id === id)
        if (!findSubService) {
            return customToast("ERROR", "SubService not found!")
        }
        setSubService(findSubService)
        updateSubServiceModal.onOpen()
    }

    return (
        <>
            <DialogModal isOpen={updateSubServiceModal.isOpen} onClose={updateSubServiceModal.onClose}>
                <SubServiceForm action={"EDIT"} data={subService}/>
            </DialogModal>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Slot (mins)</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>UpdatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map(subService => (
                            <TableRow key={subService.id}>
                                <TableCell>#{subService.id}</TableCell>
                                <TableCell>{subService.name}</TableCell>
                                <TableCell>{subService.comment}</TableCell>
                                <TableCell>{subService.slotDuration}</TableCell>
                                <TableCell>{dateFormatter(subService.createdAt)}</TableCell>
                                <TableCell>{dateFormatter(subService.updatedAt)}</TableCell>
                                <TableCell>
                                    <div className={"flex gap-2 relative right-0"}>
                                        <img
                                            src="/edit.svg"
                                            alt={"#"}
                                            className={"select-none cursor-pointer size-[26px]"}
                                            onClick={() => onEdit(subService.id)}
                                        />

                                        <img
                                            src="/delete.svg" alt={"#"}
                                            className={"select-none cursor-pointer size-[26px]"}
                                            onClick={() => onDelete(subService.id)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
};

export default SubServiceTable;