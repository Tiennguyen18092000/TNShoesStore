import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from '@/styles/cart.module.css'

export const IndividualCartProduct = ({ cartProduct, cartProductIncrease, cartProductDecrease }: any) => {
    const { user } = useAuth();
    const handleCartProductIncrease = () => {
        cartProductIncrease(cartProduct);
    }

    const handleCartProductDecrease = () => {
        cartProductDecrease(cartProduct);
    }

    const handleDelete = async () => {
        if (user) {
            await deleteDoc(doc(db, "cart " + user.uid, cartProduct.id));
        }
    }

    return (
        <>
            <TableRow
                key={cartProduct.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="left">
                    <img src={cartProduct.imgURL} style={{ width: 57, height: 61 }} ></img>
                </TableCell>
                <TableCell className={styles.name2} align="left">{cartProduct.name}</TableCell>
                <TableCell className={styles.name2} align="left">{cartProduct.brand}</TableCell>
                <TableCell className={styles.name2} align="left">{cartProduct.size}</TableCell>
                <TableCell className={styles.name2} align="left">{cartProduct.price}$ </TableCell>
                <TableCell className={styles.name2} align="center" >
                    <Button onClick={handleCartProductIncrease} style={{color:'black'}} >
                        <AddIcon></AddIcon>
                    </Button>
                    <div className={styles.name2}>{cartProduct.qty}</div>
                    <Button onClick={handleCartProductDecrease} style={{color:'black'}} >
                        <RemoveIcon></RemoveIcon>
                    </Button>
                </TableCell>
                <TableCell className={styles.name2} align="left">{cartProduct.TotalProductPrice}$</TableCell>
                <TableCell align="left"><Button onClick={handleDelete} style={{color:'black'}}><DeleteIcon /></Button></TableCell>
            </TableRow>
        </>
    )
}