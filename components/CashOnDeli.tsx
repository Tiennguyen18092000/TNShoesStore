import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import styles from '@/styles/cart.module.css'
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 540,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CashOnDeli = ({ totalPrice, totalQty, cartProducts, qty }: any) => {
    console.log('day la cart prodycttt', cartProducts);
    console.log('day la quan tyy', qty);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [cartPrice] = useState(totalPrice);
    const [cartQty] = useState(totalQty);
    const { user } = useAuth();
    const route = useRouter();

    const handleCashOnDelivery = async (e: any) => {
        e.preventDefault();
        console.log(phone, address, cartPrice, cartQty)
        const uid = user.uid;
        console.log('user data', user.email);
        await addDoc(collection(db, "Customer Infomation"), {
            Email: user.email,
            Phone: phone,
            Address: address,
            CartPrice: cartPrice,
            CartQty: cartQty,
            timeStamp: serverTimestamp()
        });
        const cartData = await getDocs(collection(db, "cart " + uid));
        for (var snap of cartData.docs) {
            const data = snap.data();
            data.id = snap.id;
            data['Phone'] = phone;
            data['Address'] = address;
            data['CartPrice'] = cartPrice;
            data['CartQty'] = cartQty;
            data['timeStamp'] = serverTimestamp()
            await addDoc(collection(db, "Customer-Cart" + uid), {
                data,
            });
            await addDoc(collection(db, "processing"), {
                data
            });
            await deleteDoc(doc(db, "cart " +uid, snap.id));
        }
        alert(' Order has been successfully paid.')
        route.push('/');
    }
    return (
        <div>
            <Box sx={style}>
                <form onSubmit={handleCashOnDelivery} style={{ display: 'grid' }}>
                    <h2>Check Out</h2>
                    <label htmlFor="">Phone Number : </label>
                    <TextField
                        sx={{ mt: 1 }}
                        type="text"
                        placeholder='Cell no'
                        required
                        value={phone}
                        onChange={(e: any) => setPhone(e.target.value)}
                    />

                    <label htmlFor="">Address : </label>
                    <TextField
                        sx={{ mt: 1 }}
                        type="text"
                        placeholder='Address'
                        required
                        value={address}
                        onChange={(e: any) => setAddress(e.target.value)}
                    />

                    <label >Total Quantity</label>
                    <TextField
                        sx={{ mt: 1 }}
                        type="text"
                        required
                        value={cartQty}
                        disabled
                    />
                    <label >Total Price</label>
                    <TextField
                        sx={{ mt: 1 }}
                        type="text"
                        required
                        value={`${cartPrice}$`}
                        disabled
                    />
                    <div style={{textAlign: 'center',paddingTop: '5%'}}>
                        <button type='submit' className={styles.btn1} >Submit</button>
                    </div>
                </form>
            </Box>
        </div>

    )
}