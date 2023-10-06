import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import moment from 'moment';

export const IndividualHistory = ({ historyBuy }: any) => {
        console.log("history time",historyBuy.data.timeStamp.toDate())
        let date = historyBuy.data.timeStamp.toDate();
        let mm = date.getMonth()+1;
        let dd = date.getDate();
        let yyyy = date.getFullYear();
        date =  mm + '/' + dd + '/' + yyyy;
    return (
        <>
            <TableRow
                key={historyBuy.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="right">{date}</TableCell>
                <TableCell align="right">
                    <img src={historyBuy.data.imgURL} style={{ width: 57, height: 61 }} ></img>
                </TableCell>
                <TableCell align="right">{historyBuy.data.name}</TableCell>
                <TableCell align="right">{historyBuy.data.brand}</TableCell>
                <TableCell align="right">{historyBuy.data.size}</TableCell>
                <TableCell align="right">{historyBuy.data.price}$ </TableCell>
                <TableCell align="right" >
                    <div>{historyBuy.data.qty}</div>
                </TableCell>
                <TableCell align="right">{historyBuy.data.TotalProductPrice}$</TableCell>
            </TableRow>
        </>
    )
}
