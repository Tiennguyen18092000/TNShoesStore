import React, { useState } from 'react'
import Link from "next/link";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import Select from "react-select";
import Input from '@mui/material/Input';
import SearchIcon from '@mui/icons-material/Search';
import CardActionArea from '@mui/material/CardActionArea';
import styles from '@/styles/collections.module.css'
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Product } from '../models/product.model';
import PropTypes from 'prop-types';




const options = [
    { value: "default", label: "Default" },
    { value: "high", label: "High to low" },
    { value: "low", label: "Low to high" },
]
const ProductCard = ({ id, imgURL, name, brand, price }: any) => {
    const router = useRouter();
    const seeMore = (id: any, e: any) => {
        e.stopPropagation();
        router.push(`/collections/${id}`)
    }
    return (
        <div>
        <Link href={`/collections/${id}`}>
    <Grid className={styles.managecard}>
      <Card sx={{maxWidth:347, height: 525, margin:'4%'}} className={styles.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="350"
            width="100%"
            image={imgURL}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" className={styles.name}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" className={styles.name1}>
              <b>Brand: </b>{brand}
            </Typography>
            <Typography variant="body2" color="text.secondary"className={styles.name1}>
              <b>Price: </b>{price}$
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Grid>
    </Link>
      </div>
    );
  }
export const Collections = ({productsFilter, sortProducts,setFilters,filteredProducts, products }: any) => {
    const search = (s:any)=>{
        setFilters({
            s
        })
    }
    return (
        <div>
            <div >
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <h1 className={styles.name}>Collections</h1>
                    </Grid>
                    <SearchIcon style={{marginTop:'50'}}/>   
                    <Grid item xs={5.5}>                       
                                <div style={{ marginTop: '4%', width: '60%' }}>
                                    <Input
                                        placeholder='Search'
                                        onKeyUp={(e:any)=>search(e.target.value)}
                                        style={{width:'400px'}}
                                    />
                                </div>  
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container spacing={4}>
                            <Grid item xs={3} className={styles.name}><h4>Sort by Price: </h4> </Grid>
                            <Grid item xs={9}>
                                <div style={{ marginTop: '10%', width: '70%' }}>
                                    <Select
                                        options={options}
                                        onChange={(e: any) => sortProducts(e.value)}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div style={{ marginTop: '2%' }} >  
                <Grid container spacing={1}>
                {productsFilter.map((products:any)=>(
                    <Grid item xs={3} key={products.id}>
                        <ProductCard {...products} />
                    </Grid>
                ))}
                </Grid>
            </div>
        </div>
    )
}

