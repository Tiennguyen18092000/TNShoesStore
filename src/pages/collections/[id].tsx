import React, { useEffect, useState } from 'react'
import styles from '@/styles/collections.module.css'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import  { Button, CardMedia, Paper, Radio, styled } from '@mui/material'
import Head from 'next/head'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import db from '../../../config/firebase'
import { useRouter } from 'next/router'
import RadioButton from '@mui/material'
import { useAuth } from '../../../context/AuthContext'

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  const docRef = doc(db, "Products", id);
  const docSnap = await getDoc(docRef);
  console.log('JSON.stringify(docSnap.data()) :::::::::',JSON.stringify(docSnap.data()));
  return {
    props: {
      proProps: JSON.stringify(docSnap.data()) || null
    }
  }
}
export interface DetailsProps {
}


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 0
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Details({ proProps }: any) {
  const RadioButton = ({ value, handleActiveSize, actived }: any) => {
    return (
      <Button style={{color:'black'}}>
        <Radio style={{color:'black'}} onChange={handleChangesize}
          value={value}
          onClick={() => handleActiveSize(value)} />
        {value}
        
      </Button>
    );
  };
  const handleChangesize = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  const [selectedValue, setSelectedValue] = useState('');
  const product = JSON.parse(proProps);
  console.log('day la data json', product)
  const router = useRouter();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [valueSize, setValueSize] = useState(null);
  const { user, login } = useAuth();
  const handleActiveSize = (size: any) => {
    setValueSize(size);
  };
  const SIZE = ["34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44"];
  const GetUserUid = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      if (user) {
        setUid(user.uid);
      }
    }, [])
    return uid;
  }
  const uid = GetUserUid();
  
  const handleAddToCart = async () => {
    if (uid !== null) {
      if (valueSize !== null) {
        product['username'] = user.email;
        product['qty'] = 1;
        product['size'] = valueSize;
        product['TotalProductPrice'] = product.qty * product.price;
        // Add a new document with a generated id
        const newCartRef = doc(collection(db, "cart " + uid));
        // later...
        await setDoc(newCartRef, product);
        router.push('/cart')
      } else {
        alert('please choose size')
      }
    }
    else {
      router.push('/login');
    }
  }
  return (
    <>
      <Head>
            <title>TNShoesStore | Details</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
    <div className={styles.collectionpage}>
      <Grid container spacing={3} style={{ marginTop:'2px',marginBottom:'2%'}}>
          <Grid item xs={3}>
              <h1 className={styles.name}>Details</h1>
         </Grid>
    </Grid>
    <div >
    <Box sx={{ flexGrow: 1}} >
          <Grid container spacing={1}>
            <Grid className={styles.imagepro} item xs={4}>
                <Card sx={{ maxWidth: 1800 }} className={styles.card1} >
                  <CardMedia
                    component="img"
                    height="500"
                    image={product.imgURL}
                  />
                </Card>
            </Grid>
            
            <Grid item xs={8}>
            <Card sx={{ maxWidth: 900 }} className={styles.card2}>
                <div className={styles.details}> 
                <h2 style={{ color: 'black', fontSize:30,display:'flex', justifyContent:'flex-start', marginLeft:'4%' }} className={styles.name}>{product.name}</h2>
                <div style={{fontSize:17,width: 'fit-content',textAlign: 'start', marginLeft:'4%'}}>
                <p className={styles.name}><b  style={{ color: 'black' }}>Brand : </b>{product.brand}</p>
                <p className={styles.name}><b  style={{ color: 'black' }}>Price : </b>{product.price}$</p>
                <p className={styles.name}><b  style={{ color: 'black' }}>Details : </b>{product.detail}</p>
                </div>
                <b style={{fontSize: 17,  display:'flex', marginLeft:'4%', fontFamily:'Karla'}} >Select Size</b>
                <div style={{alignItems:'flex-start'}} >
                   {SIZE.map((item, index) => (
                    <RadioButton
                      required
                      key={index}
                      value={item}
                      handleActiveSize={handleActiveSize}
                      actived={valueSize}
                    />
                  ))} 
                </div>
                <Button variant="outlined" className={styles.btn2} onClick={handleAddToCart}>Add to card</Button>
                </div>
                </Card>
            </Grid>
            </Grid>
            </Box>
            </div>
            </div>
            </>
  )
}
