import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import moment from 'moment';
import styles from '@/styles/history.module.css'

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
               
            >
                <TableCell  className={styles.name1} align="right">{date}</TableCell>
                <TableCell align="right">
                    <img src={historyBuy.data.imgURL} style={{ width: 57, height: 61 }} ></img>
                </TableCell>
                <TableCell className={styles.name1} align="right">{historyBuy.data.name}</TableCell>
                <TableCell className={styles.name1}align="right">{historyBuy.data.brand}</TableCell>
                <TableCell className={styles.name1} align="right">{historyBuy.data.size}</TableCell>
                <TableCell className={styles.name1} align="right">{historyBuy.data.price}$ </TableCell>
                <TableCell className={styles.name1} align="right" >
                    <div>{historyBuy.data.qty}</div>
                </TableCell>
                <TableCell className={styles.name1} align="right">{historyBuy.data.TotalProductPrice}$</TableCell>
            </TableRow>
        </>
    )
}
