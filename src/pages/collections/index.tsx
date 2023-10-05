import React, {useState, useEffect} from "react";
import styles from "../../styles/collections.module.css"
import {collection, onSnapshot, doc} from 'firebase/firestore'
import { useRouter } from "next/router";
import {db} from '../../../config/firebase'
import {Collections}  from '../../../components/Collections'
import Grid from "@mui/material/Grid";
import Head from "next/head";
import { setuid } from "process";
import { randomFill } from "crypto";
// import Paginate from "../../../components/paginate";




export default function Collection(){
    const [products, setProducts] = useState([]);
    const [productsFilter, setProductFilter]= useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postPerPage, setPostPerPage] = useState(8)


    const router = useRouter();
    useEffect(() => {
        const unsub = onSnapshot(
          collection(db, "Products"),
          (snapShot) => {
            let list = [] as any;
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            console.log('List', list)
            setProducts(list);
            setProductFilter(list);
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          unsub();
        }
      }, []);
      // const handleChangeProducts = (arrFilter: any) => {
      //   if (arrFilter.length === 0) {
      //     setProductFilter(products);
      //   } else {
      //     const arr = products.filter(
      //       (product: any) =>
      //         arrFilter.includes(product.Brand) ||
      //         arrFilter.includes(product.Category)
      //     );
      //     setProductFilter(arr);
      //   }
      // };
      const sortProducts = (sort: any) => {
        let arrPrice = [];
        switch (sort) {
          case "low": {
            arrPrice = productsFilter.sort((a:any, b:any) => a.price - b.price);
            break;
          }
          case "high": {
            arrPrice = productsFilter.sort((a:any, b:any) => b.price - a.price);
            break;
          }
          default: {
            arrPrice =  products;
          }
        }
        setProductFilter([...arrPrice]);
      };


      // function handleFiltersChange(newFilters:any){
      //   console.log('new filters', newFilters);
      //   setProductFilter({
      //     ...productsFilter,
      //     title_like: newFilters.searchTerm,
      //   })
      // }
      
      const[filteredProducts,setFilteredProducts]=useState({});
      const [filters,setFilters]=useState({
        s:''
      })
      useEffect(()=>{
        let allproducts = products.filter((p:any)=>p.name.toLowerCase().indexOf(filters.s.toLowerCase())>=0)
        setProductFilter(allproducts);
      },[filters]);
      console.log('filteredProducts',filteredProducts )

      // const lastPostIndex = currentPage * postPerPage;
      // const firstPostIndex = lastPostIndex - postPerPage;
      // const currentPost = products.slice(firstPostIndex, lastPostIndex)
     
    return(
    <>
     <Head>
            <title>TNShoesStore | Collections</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
      <div className={styles.collectionpage}>
        <main className={styles.main}>
          <div style={{marginTop:'2%',marginBottom:'10%'}} >
            <Grid container spacing={8}>
                <Grid item xs={15}>
                  {/* <Filters onsubmit={handleFiltersChange}/> */}
                    <Collections {...{productsFilter, sortProducts,filters,setFilters}}/> 
                </Grid>
            </Grid>
          </div>
        </main>
      </div>
    </>
    )
}