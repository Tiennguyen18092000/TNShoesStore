import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/upload.module.css'
import { db, storage } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { Button, Card, FormControl, Grid, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';



export interface UploadProps {
}

export default function Upload(){
  const [file, setFile] = useState({
    name: "",
    detail:""
  }) as any;
  const [data, setData] = useState({
    imgURL: '',
    name: '',
    detail:''
  })
  const [per, setPerc] = useState(null) as any;
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, `Products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',(snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done')
        setPerc(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');   
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, imgURL: downloadURL }))
          setpreviewUrl(downloadURL)
        });
    }
  );
  };
  file && uploadFile();
},[file]);

const handleInput = async (e: any) => {
  const id = e.target.id;
  console.log("id handleinput", id);
  const value = e.target.value;
  console.log("value handleinput", value);
  setData({ ...data, [id]: value });

}
console.log('day la data ', data);
  const handleAdd = async (e: any) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "Products"), {
        imgURL: previewUrl,
        name: name,
        brand: brand,
        price: price,
        detail:detail,
        // ...data,
        timeStamp: serverTimestamp()
      })
    } catch (err) {
      console.log(err)
    }
  }
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const route = useRouter();
  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "Products"),
        (snapShot) => {
          let list = [] as any;
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setProducts(list);
          setData(list);

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      route.push('/login')
    }
  }, [route, user])
  console.log('day la data test', data);
  console.log('day la products', products);

  const [previewUrl, setpreviewUrl] = useState<any | null>(null);
  console.log('previewurl', previewUrl)
  const pickedimghandler = async () => {
    filePickerRef.current.click();
  }
  const filePickerRef = useRef() as any;
  const handleDelete = async (id: any) => {
    if (user) {
      await deleteDoc(doc(db, "Products", id));
    }
  }
  const brands = [
    "Nike(Jordan)",
    "Nike", 
    "Adidas",
    "Vans",
    "Converse",
    "Yonex",
    
  ];
  const [detail, setDetail] = useState('')
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [price, setPrice] = useState('')
  const [isUpdate, setIsupdate] = useState(false)
  const GetId = (id: any, imgURL: any, name: any, brand: any,  price: any, detail:any) => {
    setId(id)
    setpreviewUrl(imgURL)
    setName(name)
    setBrand(brand)
    setPrice(price)
    setDetail(detail)
    setIsupdate(true)
  } 
  const updateFields = (e:any) => {
    e.preventDefault()
    if (user) {
      let fieldToEdit = doc(db, 'Products', id);
      updateDoc(fieldToEdit, {
        imgURL: previewUrl,
        name: name,
        brand: brand,
        detail:detail,
        price: price
      }).then(() => {
        setIsupdate(false)
      })
    } else {
      route.push('/login')
    }

  }
  console.log("data update", data);
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
    <>
    <div className={styles.uploadpage}>
       <Head>
            <title>TNShoesStore | Upload</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
        {/* IMAGE */}
        <main className={styles.main}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card sx={{ maxWidth: 700 }} className={styles.card} >
            <div className='show-img'>
              {previewUrl &&
                <>
                  <div >
                    <img src={previewUrl} style={{ width: '80%', marginTop: '1%' }} />
                    <Button type='button' className={styles.btn} onClick={pickedimghandler}>Edit image </Button>
                  </div>
                </>
              }
            </div>
            </Card>
          </Grid>
          
          <Grid item xs={8} className={styles.uploadinfo}>
          <Card sx={{ maxWidth: 650 }} className={styles.card}>
            <div style={{width:'95%', paddingLeft:'4%', lineHeight:'3'}} >
              <h1 className={styles.name}>Upload Product</h1>
              <form onSubmit={handleAdd} >
                <div className={styles.formInput}>
                  <label htmlFor="">
                    Image
                  </label>
                  <input
                    type="file"
                    id='file'
                    accept='.jpg,.png,.jpeg'
                    ref={filePickerRef}
                    required
                    onChange={(e: any) => setFile(e.target.files[0])}
                  />
                </div>
                <div>
                  {/* Name */}
                  <div className={styles.formInput} style={{ display: 'grid' }} >
                    <label htmlFor=""> Name :</label>
                    <TextField
                      sx={{ mt: 1 }}
                      type="text"
                      required
                      label="Enter your Name"
                      variant="standard"
                      multiline
                      value={name}
                      onChange={(e: any) => setName(e.target.value)}
                    />

                    {/* Brand */}
                    <label htmlFor=""> Brand :</label>
                    <FormControl sx={{ mt: 1 }}>
                      <Select
                        displayEmpty
                        variant="standard"
                        value={brand}
                        onChange={(e: any) => setBrand(e.target.value)}
                      >
                        {brands.map((brand) => (
                          <MenuItem
                            key={brand}
                            value={brand}
                          >
                            {brand}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                      
                      {/* Price */}
                    <label htmlFor=""> Price :</label>
                    <TextField
                      sx={{ mt: 1 }}
                      type="text"
                      label="Enter your Price"
                      required
                      variant="standard"
                      multiline
                      value={price}
                      onChange={(e: any) => setPrice(e.target.value)}
                    />

                    {/* Detail */}
                    <label htmlFor=""> Detail: </label>
                    <TextField
                      sx={{ mt: 1 }}
                      type="text"
                      variant="standard"
                      label="Enter your Detail"
                      multiline
                      value={detail}
                      onChange={(e: any) => setDetail(e.target.value)}
                    />
                  </div>

                </div>
                {/* <Button type='submit' variant="contained" >ADD</Button> */}
                <div style={{display:'flex', justifyContent:'center'}}>
                {!isUpdate &&
                  <>
                    <Button type='submit' className={styles.btn1}>Submit</Button>
                  </>
                }
                {isUpdate &&
                  <>
                    <Button type='submit' onClick={updateFields} className={styles.btn1}>UPDATE</Button>
                  </>
                }
                </div>
              </form>
              
            </div>
            </Card>
          </Grid>
          
        </Grid>
        

                {/* TABLECELL */}
        <div className='list-pro'>
          <Paper sx={{ width: '100%', mb: 2 }}>
            {products.length > 0 && (
              <div>
                <h1 className={styles.name}>List Product</h1>
                <div>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right" className={styles.name}>PRODUCT</TableCell>
                          <TableCell align="right" className={styles.name}>NAME</TableCell>
                          <TableCell align="right" className={styles.name}>BRAND</TableCell>
                          <TableCell></TableCell>
                          <TableCell align="right" className={styles.name}>PRICE</TableCell>
                          <TableCell align="right" className={styles.name}>UPLOAD</TableCell>
                          <TableCell align="right" className={styles.name}>DELETE</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody >
                        {/* <Listproduct
                        products={products}
                      /> */}
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product: any) => {
                          return (
                            <>
                              <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              // onClick={()=>setData({id:product.id,imgURL:product.imgURL,Name:product.Name,Brand:product.Brand,Category:product.Category,Price:product.Price})}
                              >
                                <TableCell align="right">
                                  <img src={product.imgURL} style={{ width: 57, height: 61 }} ></img>
                                </TableCell>
                                <TableCell align="right" style={{fontFamily:'Karla'}}>{product.name}</TableCell>
                                <TableCell align="right" style={{fontFamily:'Karla'}}>{product.brand}</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell align="right" style={{fontFamily:'Karla'}}>{product.price}$ </TableCell>
                                <TableCell align="right" style={{fontFamily:'Karla'}}><Button className={styles.btn1} style={{ width:120}} onClick={() => GetId(product.id,  product.imgURL, product.name, product.brand, product.price, product.detail)} >Upload</Button></TableCell>
                                <TableCell align="right" style={{fontFamily:'Karla'}}><Button className={styles.btn1} style={{ width:120}} onClick={() => handleDelete(product.id)}>Delete</Button></TableCell>
                              </TableRow>
                            </>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>

              </div>

            )}
            {products.length < 1 && (
              <div>
                No products to Show
              </div>
            )}
          </Paper>
        </div>


      </main>
    </div>
  </>
  )
  }
