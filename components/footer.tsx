import React from "react";
import styles from "@/styles/footer.module.css"
import Link from "next/link";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Footer(){
    return(
        <>
      <Grid container spacing={3} className={styles.footer}>
        <Grid item xs={4} className={styles.list}>
        <div>
            <div>
        <ul className={styles.list}>
            <li className={styles.list1}>
                <Link href="/about">Learn more</Link>
            </li>
            <li className={styles.list1}>
                <a>Contact: 1900.xxx.xxx</a>
            </li>
            <li className={styles.list1}>
                <a>Location: xx/x lô A, chung cư X</a>
            </li>
            <li className={styles.list1}>
                <Link href="/">Feeback</Link>
            </li>
        </ul>
        </div>
        </div>
        </Grid>
        <Grid item xs={4} className={styles.list}>
          <div>
          <li className={styles.list1}>
         
                
                  <img src="logofb.webp" style={{width:25, marginRight:10, paddingTop:10}}/>
                  <Link href="https://mui.com/">Facebook</Link>
                
            </li>
            <li className={styles.list1}>
                
                  <img src="logoig.png" style={{width:25, marginRight:10, paddingTop:10}}/>
                  <Link href="https://mui.com/">Instagram</Link>
                
            </li>
            <li className={styles.list1}>
               
                  <img src="logotw.png" style={{width:25, marginRight:10, paddingTop:10}}/>
                  <Link href="https://mui.com/">Twitter</Link>
                  
            </li>
          </div>
        </Grid>
        <Grid item xs={3} className={styles.list2}>
          <img  height="56" src="Whitelogo.png" alt=''  />
        </Grid>
      </Grid>
{/* <Container className={styles.footer}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We are XYZ company, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.facebook.com/" color="inherit">
              
            </Link>
            <Link
              href="https://www.instagram.com/"
              color="inherit"
            >
             
            </Link>
            <Link href="https://www.twitter.com/" color="inherit">
             
            </Link>
          </Grid>
        </Grid>
       
      </Container> */}
        </>
    )
}