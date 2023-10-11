import React, { use, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../styles/404.module.css"
import { Button } from "@mui/material";


export default function Notfound(){
   const router = useRouter()

//    useEffect(()=>{
//     setTimeout(()=>{
//         router.push('/')
//     },50000)
//    },[])

   return (
    <>
    <Head>
            <title>TNShoesStore | Sale off</title>
            <meta name="keywords" content="Shoes"/>
    </Head>
    {/* <div style={{display:'flex', alignItems:'center', flexDirection:'column', minHeight:'100vh'}}>
        <h1>Sorry we will update soon</h1>
        <p>come back to the <Link href="/"><img src="./Logo.png" style={{width:'120px'}}/></Link> is 3 sec...</p>
    </div> */}
    <div className={styles.bgpurple}>
     <div className={styles.centralbody}>
                <img className={styles.image404} src="http://salehriaz.com/404Page/img/404.svg" alt='' width={300}/>
                <button  className={styles.btn} style={{marginLeft:'35%'}}><Link href="/">GO BACK HOME</Link></button>
            </div>
            <div className={styles.objects}>
                <img className={styles.object_rocket} src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"/>
                <div className={styles.earthmoon}>
                    <img className={styles.object_earth} src="http://salehriaz.com/404Page/img/earth.svg" width="100px"/>
                    <img className={styles.object_moon} src="http://salehriaz.com/404Page/img/moon.svg" width="80px"/>
                    
                </div>
                <div className={styles.box_astronaut}>
                    <img className={styles.object_astronaut} src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"/>
                </div>
                
            </div>
            <div className={styles.glowing_stars}>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
                <div className={styles.star}></div>
            </div>
       </div>
    </>
)
}