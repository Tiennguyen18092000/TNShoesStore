import Image from 'next/image'
import styles from '@/styles/navbar.module.css'
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid'
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import router, { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { Avatar, Fade, Icon, Menu, MenuItem, Popover } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UploadIcon from '@mui/icons-material/Upload';
import LogoutIcon from '@mui/icons-material/Logout';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';


export default function Navbar(){
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {user, logout} = useAuth()
  console.log("user ", user)

  const router = useRouter()

  const [urole, setUrole] = useState([]);
  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "user" + user.uid),
        (snapShot) => {
          let list = [] as any;
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setUrole(list);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [user])
  console.log('urole', urole);
  const role = urole.map((rolee: any) => {
    return rolee.role;
  })
  console.log('role ', urole);

  
  return (
    <>
     <AppBar position="static" className={styles.container} sx={{ backgroundColor: 'white', color: 'black', zIndex:'50' }} >
        <Grid container spacing={3} >
          <Grid item xs={4} className={styles.list}>
            <Link href="/">
              <img  height="56" src="Blacklogo.png" alt=''  />
            </Link>
          </Grid>
        <Grid item xs={4} className={styles.item}>
          <ul className={styles.list}>
            <li className={styles.listitem}>
              <Link href="/collections">
                Collections
              </Link>
            </li>
            <li className={styles.listitem}>
              <Link href="/collections">
                All Products
              </Link>
            </li>
            <li className={styles.listitem}>
              <Link href="/404">
                Sale off
              </Link>
            </li>
            <li className={styles.listitem}>
              <Link href="/about">
                About us
              </Link>
            </li>   
          </ul>
        </Grid>
        <Grid item xs={4} className={styles.item}>
        <Grid item xs={4} style={{ textAlign: 'end', display: 'contents' }}>
          {user && role.length > 0 &&
            <>
              <div className={styles.list} style={{ marginTop: '2%' }}>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState: any) => (
                    <div >
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        Admin
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'center',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'center',
                        }}
                      >
                        <div style={{ display: 'grid' }}>
                          <Link href='/upload'>
                            <Button>Upload</Button>
                          </Link>
                          <Link href='/customers'>
                            <Button>Customers</Button>
                          </Link>
                          <Link href='/order'>
                            <Button>Pending</Button>
                          </Link>
                        </div>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </div>
            </>
          }
          <ul className={styles.list1}>
            {user ? (
              <div>
                
                <Button
                  id="fade-button"
                  aria-controls={open ? 'fade-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  
                  <Avatar src="/Shin.jpg"></Avatar>
                </Button>
              <Menu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                              }}
                  anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem>{user.email}</MenuItem>
                <MenuItem style={{fontFamily: 'Karla'}}><Link href='/cart'><ShoppingCartIcon></ShoppingCartIcon> Cart</Link></MenuItem>
                <MenuItem style={{fontFamily: 'Karla'}}> <Link href='/upload'><UploadIcon></UploadIcon> Upload</Link> </MenuItem>
                <MenuItem style={{fontFamily: 'Karla'}}> <Link href='/history'><WorkHistoryRoundedIcon/>History</Link> </MenuItem>
                <MenuItem style={{fontFamily: 'Karla'}} onClick={()=> {
                      logout()
                      router.push('/login')
                      }}><LogoutIcon></LogoutIcon> Logout</MenuItem>
              </Menu>
            </div>
          ): (
            <>
           
                <li className={styles.listitem}>
                    <Link href='/login'>
                        Login
                    </Link>
                </li>
                <li className={styles.listitem}>
                    <Link href='/register'>
                        Register
                    </Link>
                </li>
                </>
          )}      
        </ul>
        </Grid>
        </Grid>
        </Grid>
     </AppBar>
     
    </>
    
  )
  
}