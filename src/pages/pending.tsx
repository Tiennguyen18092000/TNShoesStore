import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import { collection, onSnapshot } from '@firebase/firestore';
import styles from '@/styles/Admin.module.css'
import { db } from '../../config/firebase';
import { Paper, TableContainer, Table, TableCell, TableBody, TableHead, TableRow, TablePagination } from '@mui/material';
import {SingleOrder} from '../../components/SingleOrder'
import Head from 'next/head';

export default function pending (){
    const { user } = useAuth();
    //state of cart products
    const [orders, setOrders] = useState([]);
  
    const route = useRouter();
    //getting cart product from fb and updating the state
    useEffect(() => {
        if (user) {
            onSnapshot(
                collection(db, "processing"),
                (snapShot) => {
                    let list = [] as any;
                    snapShot.docs.forEach((doc) => {
                        list.push({ id: doc.id, ...doc.data() });
                    });
                    setOrders(list);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            route.push('/login')
        }
    }, [route,user])
  
    console.log('day la orders', orders);
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
            <title>TNShoesStore | Pending</title>
            <meta name="keywords" content="Shoes"/>
            </Head>
          <main className={styles.main}>
          {orders.length > 0 && (
            <div>
                <h1 className={styles.name}> Oders are pending</h1>
            <div>
                          <Paper sx={{ width: '100%', mb: 2 }} className={styles.paper}>
                              <TableContainer component={Paper}>
                                  <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                      <TableHead>
                                          <TableRow>
                                              <TableCell className={styles.name} align="center">DATE</TableCell>
                                              <TableCell className={styles.name} align="center">EMAIL</TableCell>
                                              <TableCell className={styles.name} align="center">ADDRESS</TableCell>
                                              <TableCell className={styles.name} align="center">PHONE</TableCell>
                                              <TableCell className={styles.name} align="center">PRODUCT</TableCell>
                                              <TableCell className={styles.name} align="center">NAME</TableCell>
                                              <TableCell className={styles.name} align="center">BRAND</TableCell>
                                              <TableCell className={styles.name} align="center">SIZE</TableCell>
                                              <TableCell className={styles.name} align="center">PRICE</TableCell>
                                              <TableCell className={styles.name} align="center">QUANTITY</TableCell>
                                              <TableCell className={styles.name} align="center">SUBTOTAL</TableCell>
                                              <TableCell className={styles.name} align="center">DONE</TableCell>
                                          </TableRow>
                                      </TableHead>
                                      <TableBody>
                                          {/* <Listorder
                                              orders={orders}
                                          /> */}
                                          {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order: any) => (
                                                   <SingleOrder
                                                   key={order.id} 
                                                   order={order} 
                                                   />
                          
                                              ))}
                                      </TableBody>
                                  </Table>
                              </TableContainer>
                              <TablePagination
                                      rowsPerPageOptions={[5, 10, 25]}
                                      component="div"
                                      count={orders.length}
                                      rowsPerPage={rowsPerPage}
                                      page={page}
                                      onPageChange={handleChangePage}
                                      onRowsPerPageChange={handleChangeRowsPerPage}
                                  />
                              </Paper>
                          </div>
  
                      </div>
  
                  )}
                  {orders.length < 1 && (
                      <div className={styles.name}>
                          No orders to pending
                      </div>
                  )}
  
          </main>
      </div>
    );
  
  
}
