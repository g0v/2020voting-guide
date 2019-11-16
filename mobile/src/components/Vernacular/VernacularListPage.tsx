import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import { billNoToDate } from '../../utils';

interface Bill {
    name: string;
    category: string;
    billNo: string;
    vernacular: string;
    clicks: number;
}

const VernacularListPage = ({
    match
}: {
    match: { params: { filter: string } };
}) => {
    const { filter } = match.params;
    const [bills, setBills] = React.useState([] as Bill[]);
    React.useEffect(() => {
        fetch(`/api/vernacularlist/${filter}`)
            .then(res => res.json())
            .then(res => {
                setBills(res);
            });
    }, [filter]);

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>類別</TableCell>
                    <TableCell>法案名稱</TableCell>
                    <TableCell>提案日期</TableCell>
                    <TableCell>點擊數</TableCell>
                    <TableCell>白話文內容</TableCell>
                    <TableCell>連結</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {bills.map((bill, i) => (
                    <TableRow key={bill.billNo + '-' + i}>
                        <TableCell>{bill.category}</TableCell>
                        <TableCell>{bill.name}</TableCell>
                        <TableCell>{billNoToDate(bill.billNo)}</TableCell>
                        <TableCell>{bill.clicks}</TableCell>
                        <TableCell>{bill.vernacular}</TableCell>
                        <TableCell>
                            <Button
                                variant="text"
                                href={`/vernacular/${bill.billNo}`}
                                color="primary"
                                target="_blank"
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
