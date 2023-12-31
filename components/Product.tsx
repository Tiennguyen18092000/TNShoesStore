import React from 'react'
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { deleteDoc, doc,updateDoc } from 'firebase/firestore';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export const Product = ({ product }: any) => {
    const { user } = useAuth();
    const handleDelete = async () => {
        if (user) {
            await deleteDoc(doc(db, "Products" , product.id));
        }
    }
    const handleUpdate = async()=>{
        if(user){
            let fieldToEdit = doc(db,'Products',product.id);
     
        console.log("field",product.id)
        }
      
    }
    return (
    <>
    <TableRow
        key={product.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell align="right">
            <img src={product.imgURL} style={{ width: 57, height: 61 }} ></img>
        </TableCell>
        <TableCell align="right">{product.name}</TableCell>
        <TableCell align="right">{product.brand}</TableCell>
        <TableCell align="right">{product.category}</TableCell>
        <TableCell align="right">{product.price}$ </TableCell>
        <TableCell align="right"><Button onClick={handleUpdate} >UPLOAD</Button></TableCell>
        <TableCell align="right"><Button onClick={handleDelete}>DELETE</Button></TableCell>
    </TableRow>
</>
  )
}