import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {RiUserAddLine} from "react-icons/ri";
import {FolderType} from "../../types/folder";
import {formatPhoneNumber} from "../../lib/utils.tsx";
import StateShower from "../cards/state-shower.tsx";
import {useDeleteFolder, useUnAssignEmployee} from "../../hooks/useFolder.ts";
import {useState} from "react";
import {useAssignEmployeeModal, useUpdateFolderModal} from "../../hooks/useZustand.ts";
import {DialogModal} from "../ui/dialog.tsx";
import {FolderForm} from "../forms/folder.tsx";
import {AssignEmployeeForm} from "../forms/assign-employee.tsx";

const FoldersTable = ({data}: { data: FolderType[] }) => {
    const [folder, setFolder] = useState<FolderType>();
    const [disableAccordion, setDisableAccordion] = useState(false);

    const assignEmployeeModal = useAssignEmployeeModal();
    const updateFolderModal = useUpdateFolderModal()

    const deleteFolderMutation = useDeleteFolder()
    const unassignEmployeeMutation = useUnAssignEmployee()

    const onDeleteFolder = (id: number) => {
        setDisableAccordion(true);
        const isOk = confirm("Are you sure to delete this folder?")
        if (isOk) {
            deleteFolderMutation.mutate(id)
        }
        setDisableAccordion(false);
    }

    const onEdit = (id: number) => {
        const findFolder = data?.find((f) => f.id === id)
        if (findFolder) {
            setFolder(findFolder)
            updateFolderModal.onOpen()
        }
    }


    const onAssignEmployee = (e: any, id: number) => {
        e.stopPropagation()

        const findFolder = data?.find((f) => f.id === id)
        if (findFolder) {
            setFolder(findFolder)
            assignEmployeeModal.onOpen()
        }
    }


    const onUnAssignEmployee = (assignmentId: number) => {
        const isOk = confirm("Are you sure to unassign this employee?")
        if (isOk) {
            unassignEmployeeMutation.mutate(assignmentId)
        }
    }


    return (
        <>
            <DialogModal isOpen={updateFolderModal.isOpen} onClose={updateFolderModal.onClose}>
                <FolderForm action={"EDIT"} data={folder}/>
            </DialogModal>

            <DialogModal isOpen={assignEmployeeModal.isOpen} onClose={assignEmployeeModal.onClose}>
                <AssignEmployeeForm folderId={folder?.id!}/>
            </DialogModal>

            <Accordion type="single" collapsible>
                {
                    data?.map((folder) => (
                        <AccordionItem key={folder.id} value={`value-${folder.id}`}>
                            <AccordionTrigger className={"flex justify-between"} disabled={disableAccordion}>
                                <div className={"flex gap-2 items-center"}>
                                    <span>{folder.name}</span>
                                </div>

                                <div className={"flex gap-2 items-center"}>
                                    <RiUserAddLine
                                        className={"size-5 text-primary"}
                                        onClick={(e) => onAssignEmployee(e, folder?.id!)}
                                    />

                                    <img
                                        src="/edit.svg"
                                        alt={"#"}
                                        className={"select-none cursor-pointer size-[26px]"}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onEdit(folder.id)
                                        }}
                                    />

                                    <img
                                        src="/delete.svg" alt={"#"}
                                        className={"select-none cursor-pointer size-[26px]"}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onDeleteFolder(folder.id)
                                        }}
                                    />
                                </div>
                            </AccordionTrigger>

                            <AccordionContent>
                                {
                                    folder?.employees?.length === 0 ?
                                        <StateShower id={"no_data"} name={"No assigned employees"}/> :
                                        <Table className={"border-none shadow-none"}>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>ID</TableHead>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Surname</TableHead>
                                                    <TableHead>Phone</TableHead>
                                                    <TableHead>Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    folder?.employees?.map((employee) => {
                                                        const cleanedEmployee = employee?.employee

                                                        return (
                                                            <TableRow key={cleanedEmployee?.id}>
                                                                <TableCell>#{cleanedEmployee?.id}</TableCell>
                                                                <TableCell>{cleanedEmployee?.name}</TableCell>
                                                                <TableCell>{cleanedEmployee?.surname}</TableCell>
                                                                <TableCell>{formatPhoneNumber(cleanedEmployee?.phone, "TEXT")}</TableCell>
                                                                <TableCell>
                                                                    <div className={"flex gap-2 relative right-0"}>
                                                                        <img
                                                                            src="/delete.svg" alt={"#"}
                                                                            className={"select-none cursor-pointer size-[26px]"}
                                                                            onClick={() => onUnAssignEmployee(employee?.id)}
                                                                        />
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                }
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>

        </>
    );
};

export default FoldersTable;