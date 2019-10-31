import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button
} from '@material-ui/core';

interface Bill {
    name: string;
    category: string;
    billNo: string;
    vernacular: string;
    link: string;
}

const VernacularListPage = ({
    match
}: {
    match: { params: { page: string } };
}) => {
    const { page } = match.params;
    const [bills, setBills] = React.useState([] as Bill[]);
    React.useEffect(() => {
        fetch(`/api/vernacularlist/${page}`)
            .then(res => res.json())
            .then(res => {
                setBills(res);
            });
    }, [page]);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>類別</TableCell>
                    <TableCell>法案名稱</TableCell>
                    <TableCell>提案日期</TableCell>
                    <TableCell>白話文內容</TableCell>
                    <TableCell>連結</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bills.map(bill => (
                    <TableRow key={bill.name}>
                        <TableCell>{bill.category}</TableCell>
                        <TableCell>{bill.name}</TableCell>
                        <TableCell>{bill.billNo.substring(0, 7)}</TableCell>
                        <TableCell>{bill.vernacular}</TableCell>
                        <TableCell>
                            <Button
                                variant="text"
                                href={`/vernacular/${bill.billNo}`}
                                color="primary"
                            >
                                連結
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default VernacularListPage;
