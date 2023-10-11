import React, { useEffect, useState } from 'react';
import styles from '../styles/cart.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { CartProducts } from '../../components/Cartproducts'
import Link from 'next/link';
import Modal from '@mui/material/Modal';
import { CashOnDeli } from '../../components/CashOnDeli';
import { useRouter } from 'next/router';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { IndividualCartProduct } from '../../components/IndividualCartProduct';
import TablePagination from '@mui/material/TablePagination';
import Head from 'next/head';

export interface IAppProps {
}

export default function App(props: IAppProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //getting current user function
    const { user } = useAuth();
    //state of cart products
    const [cartProducts, setCartProducts] = useState([]);

    const route = useRouter();
    //getting cart product from fb and updating the state
    useEffect(() => {
        if (user) {
            onSnapshot(
                collection(db, "cart " + user.uid),
                (snapShot) => {
                    let list = [] as any;
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setCartProducts(list);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            route.push('/login')
        }
    }, [route, user])

    console.log('day la cartProducts', cartProducts);

    //getting the qty from cartproduct
    const qty = cartProducts.map((carProduct: any) => {
        return carProduct.qty;
    })
    console.log('qty:', qty);

    //reducing the qty in a single value
    const reducerOfQty = (accumlator: any, currentValue: any) => accumlator + currentValue;
    const totalQty = qty.reduce(reducerOfQty, 0);
    console.log('totalQty::', totalQty);


    //getting the TotalProductPrice from cartproduct
    const price = cartProducts.map((cartProduct: any) => {
        return cartProduct.TotalProductPrice;
    })

    //reducing the price in a single value
    const reducerOfPrice = (accumlator: any, currentValue: any) => accumlator + currentValue;
    const totalPrice = price.reduce(reducerOfPrice, 0);
    //global var
    let Products;

    //cart product increase function
    const cartProductIncrease = async (cartProduct: any) => {
        // console.log('day la cartProduct', cartProduct)
        Products = cartProduct;
        console.log('day la cProduct', Products)
        Products.qty = Products.qty + 1;
        Products.TotalProductPrice = Products.qty * Products.price;
        console.log('day la qty', Products.price)
        console.log('day la total', Products.TotalProductPrice)
        //updating in db
        if (user) {
            const cartRef = doc(db, "cart " + user.uid, cartProduct.id);
            await updateDoc(cartRef, {
                qty: Products.qty,
                TotalProductPrice: Products.TotalProductPrice
            }).then(() => {
                console.log("add!");
            })
        } else {
            console.log('user is not logged in to increment');
        }
    }
    //cart product decrease function
    const cartProductDecrease = async (cartProduct: any) => {
        Products = cartProduct;
        if (Products.qty > 1) {
            Products.qty = Products.qty - 1;
            Products.TotalProductPrice = Products.qty * Products.price;
            //updating in db
            if (user) {
                const cartRef = doc(db, "cart " + user.uid, cartProduct.id);
                await updateDoc(cartRef, {
                    qty: Products.qty,
                    TotalProductPrice: Products.TotalProductPrice
                }).then(() => {
                    console.log("Decrement!");
                })
            } else {
                console.log('user is not logged in to decrement');
            }
        }
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <div>
        <Head>
            <title>TNShoesStore | Cart</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
         <h1 className={styles.name}>Cart</h1>
            <main className={styles.cartpage}>
           
                {cartProducts.length > 0 && (
                    <div>
                        <div className={styles.table}>
                        <Grid container spacing={2} >
                            <Grid item xs={8}>
                            <Paper sx={{ width: '100%'  }} className={styles.paper}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center" className={styles.name1}>PRODUCT</TableCell>
                                                <TableCell align="center" className={styles.name1}>NAME</TableCell>
                                                <TableCell align="center" className={styles.name1}>BRAND</TableCell>
                                                <TableCell align="center" className={styles.name1}>SIZE</TableCell>
                                                <TableCell align="center" className={styles.name1}>PRICE</TableCell>
                                                <TableCell align="center" className={styles.name1}>QUANTITY</TableCell>
                                                <TableCell align="center" className={styles.name1}>SUBTOTAL</TableCell>
                                                <TableCell align="center" className={styles.name1}>DELETE</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {/* <CartProducts
                                            cartProducts={cartProducts}
                                            cartProductIncrease={cartProductIncrease}
                                            cartProductDecrease={cartProductDecrease}
                                        /> */}
                                            {cartProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cartProduct: any) => (
                                                <IndividualCartProduct
                                                    key={cartProduct.id}
                                                    cartProduct={cartProduct}
                                                    cartProductIncrease={cartProductIncrease}
                                                    cartProductDecrease={cartProductDecrease}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={cartProducts.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                /> */}
                            </Paper>
                            </Grid>
                            <Grid item xs={4}>
                            <TableContainer sx={{ maxWidth: 300 }}  component={Paper} className={styles.paper} >
                                <Table sx={{ maxWidth: 300 }} size="small" aria-label="a dense table">
                                    <TableRow>
                                        <TableCell align="right">
                                            <h4 className={styles.name1}>
                                                Total Product:
                                            </h4>
                                        </TableCell>
                                        <TableCell align="right">{totalQty}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="right">
                                            <h4 className={styles.name1}>
                                                Total Price:
                                            </h4>
                                        </TableCell>
                                        <TableCell align="right">{totalPrice}$</TableCell>
                                    </TableRow>

                                </Table>
                            </TableContainer>
                            </Grid>
                        </Grid>
                        </div>
                        
                        <div className='box'>
                            {/* <h3 className={styles.name1}>Cart Summary</h3> */}
                         
                            
                            <br />
                            <button onClick={handleOpen}  className={styles.btn1}>Checkout</button>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <CashOnDeli totalPrice={totalPrice} totalQty={totalQty} cartProducts={cartProducts} qty={qty} />
                            </Modal>
                        </div>
                    </div>
                )}
                {cartProducts.length < 1 && (
                    <div >
                        No products to Show.
                    </div>
                )}
            </main>
        </div>
    );
}