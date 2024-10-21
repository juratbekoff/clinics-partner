import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";

const TransactionsTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID raqam</TableHead>
                    <TableHead>Karta nomi</TableHead>
                    <TableHead>Karta raqam</TableHead>
                    <TableHead>Miqdor</TableHead>
                    <TableHead>Sana</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                <TableRow>
                    <TableCell>66d2fb5a5abdf772b8b5b804</TableCell>
                    <TableCell>Jur'atbek Xudayberganov</TableCell>
                    <TableCell>9860*****1504</TableCell>
                    <TableCell>450 000 so'm</TableCell>
                    <TableCell>20.08.2024, 12:49</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>66d2fb5a5abdf772b8b5b804</TableCell>
                    <TableCell>Jur'atbek Xudayberganov</TableCell>
                    <TableCell>9860*****1504</TableCell>
                    <TableCell>450 000 so'm</TableCell>
                    <TableCell>20.08.2024, 12:49</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>66d2fb5a5abdf772b8b5b804</TableCell>
                    <TableCell>Jur'atbek Xudayberganov</TableCell>
                    <TableCell>9860*****1504</TableCell>
                    <TableCell>450 000 so'm</TableCell>
                    <TableCell>20.08.2024, 12:49</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>66d2fb5a5abdf772b8b5b804</TableCell>
                    <TableCell>Jur'atbek Xudayberganov</TableCell>
                    <TableCell>9860*****1504</TableCell>
                    <TableCell>450 000 so'm</TableCell>
                    <TableCell>20.08.2024, 12:49</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
export default TransactionsTable;