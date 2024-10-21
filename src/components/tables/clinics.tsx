import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {ClinicType} from "../../types/clinic";
import {dateFormatter, formatPhoneNumber} from "../../lib/utils.tsx";
import {Link} from "react-router-dom";
import {useDeleteClinic} from "../../hooks/useClinics.ts";
import StateShower from "../cards/state-shower.tsx";

const ClinicsTable = ({data}: { data: ClinicType[] }) => {
    const deleteClinicMutation = useDeleteClinic()

    const onDeleteClinic = (id: number) => {
        const isOk = confirm("Are you sure to delete this clinic?")
        if (isOk) {
            deleteClinicMutation.mutate(id)
        }
    }

    if (deleteClinicMutation.isLoading) {
        return <StateShower id={"loading"} name={"Deleting...  Please wait..."}/>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Logo</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>UpdatedAt</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    data?.map(clinic => (
                        <TableRow key={clinic.id}>
                            <TableCell>#{clinic.id}</TableCell>
                            <TableCell>{clinic.name}</TableCell>
                            <TableCell>
                                <img src={clinic.logo} alt="#" className={"size-10"}/>
                            </TableCell>

                            <TableCell>{formatPhoneNumber(clinic.phone_number, "TEXT")}</TableCell>
                            <TableCell>{dateFormatter(clinic.createdAt)}</TableCell>
                            <TableCell>{dateFormatter(clinic.updatedAt)}</TableCell>
                            <TableCell>
                                <div className={"flex gap-2 relative right-0"}>
                                    <Link to={`/clinics/edit/${clinic.id}`}>
                                        <img
                                            src="/edit.svg" alt={"#"}
                                            className={"select-none cursor-pointer size-[26px]"}
                                        />
                                    </Link>

                                    <img
                                        src="/delete.svg"
                                        alt={"#"}
                                        className={"select-none cursor-pointer size-[26px]"}
                                        onClick={() => onDeleteClinic(clinic.id)}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default ClinicsTable;