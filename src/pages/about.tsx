import React from "react";
import styles from "@/styles/about.module.css"
import Head from "next/head";

export default function About(){
    return(
        <>
        <Head>
            <title>TNShoesStore | About</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
        <div className={styles.contain}>
            <h1 className={styles.name}>INTRODUCE</h1>
            <br/>
            <p className={styles.name}>TNshoesStore specializes in providing high-end branded footwear products of famous brands in the world</p> 
            <p className={styles.name1}>Here you can easily search for high-end footwear easily and quickly. We constantly update the hottest and latest models of major brands, so you can shop happily and quickly.</p>
            <br/>
            <h1 className={styles.name}>TARGET</h1>
            <p className={styles.name1}>The motto is to bring high-class footwear products to all types of customers, from those with little interest to brand enthusiasts.</p>
            <br/>
            <br/>
            <h1 className={styles.name}>GENUINE PREMIUM BRAND SHOES, DIFFERENT</h1>
            <p className={styles.name1}>Here you will find major and famous footwear brands in the world. In particular, always update and bring back new products to keep up with international trends.</p>
        </div>
        </>
    )
}