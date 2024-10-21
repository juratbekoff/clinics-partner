import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import StateShower from "../components/cards/state-shower.tsx";
import {DialogModal} from "../components/ui/dialog.tsx";
import {useCreateFolderModal} from "../hooks/useZustand.ts";
import {useEffect, useState} from "react";
import FoldersTable from "../components/tables/folders.tsx";
import {FolderForm} from "../components/forms/folder.tsx";
import {useGetFolders} from "../hooks/useFolder.ts";
import {FolderType} from "../types/folder";

const Folders = () => {
    const [keyword, setKeyword] = useState("")

    const getFoldersQuery = useGetFolders(keyword)
    const foldersData: FolderType[] = getFoldersQuery?.data?.data?.folders

    const createFolderModal = useCreateFolderModal()

    useEffect(() => {
        getFoldersQuery.refetch()
    }, [keyword])

    if (getFoldersQuery.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }
    
    return (
        <>
            <DialogModal isOpen={createFolderModal.isOpen} onClose={createFolderModal.onClose}>
                <FolderForm action={"CREATE"}/>
            </DialogModal>

            <div className={"flex justify-between"}>
                <div className={"w-1/2 grid grid-cols-2"}>
                    <Input placeholder={"Search"} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={createFolderModal.onOpen}>Create folder +</Button>
            </div>

            {
                foldersData?.length === 0
                    ? <StateShower id={"no_data"} name={"No Folders found!"}/>
                    : <FoldersTable data={foldersData}/>
            }
        </>
    );
};

export default Folders;