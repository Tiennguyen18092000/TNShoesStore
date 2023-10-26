import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import styles from '@/styles/Admin.module.css'

export const SingleOrder = ({ order}: any) => {
    const { user } = useAuth();

    const handleDelete = async () => {
        if (user) {
            await deleteDoc(doc(db, "processing", order.id));
            console.log('order id :',order.id)
        }
    }
    let date = order.data.timeStamp.toDate();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
    return (
    <>
    <TableRow
        key={order.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell className={styles.name1} align="right">{date}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.username}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.Address}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.Phone}</TableCell>
        <TableCell className={styles.name1} align="right">
            <img src={order.data.imgURL} style={{ width: 80, height: 61 }} ></img>
        </TableCell>
        <TableCell className={styles.name1} align="right">{order.data.name}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.brand}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.size}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.price}$ </TableCell>
        <TableCell className={styles.name1} align="right" >{order.data.qty}</TableCell>
        <TableCell className={styles.name1} align="right">{order.data.TotalProductPrice}$</TableCell>
        <TableCell className={styles.name1} align="right"><button onClick={handleDelete} className={styles.btn1}>DONE</button></TableCell>
    </TableRow>
</>
  )
}