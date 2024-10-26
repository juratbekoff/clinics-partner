import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {DiscountType} from "../../types/discount";
import {dateFormatter} from "../../lib/utils.tsx";

const DiscountsTable = ({data}: { data: DiscountType[] }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>UpdatedAt</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {
                    data?.map((discount) => (
                        <TableRow key={discount.id}>
                            <TableCell>{discount.id}</TableCell>
                            <TableCell>{discount.discount}</TableCell>
                            <TableCell>{dateFormatter(discount.createdAt)}</TableCell>
                            <TableCell>{dateFormatter(discount.updatedAt)}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
};

export default DiscountsTable;