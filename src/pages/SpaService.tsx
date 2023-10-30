import React from 'react'
import styles from '@/styles/about.module.css'
import Head from 'next/head'

export default function SpaService() {
  return (
    <>
    <Head>
            <title>TNShoesStore | Service</title>
            <meta name="keywords" content="Shoes"/>
        </Head>

    <div className={styles.contain}>
    <h1 className={styles.name}>Shoes care service at TNShoesStore</h1>
    <p className={styles.name1}>- After a period of nurturing and training a team of skilled professionals, today TNShoeStore begins launching a new service that is guaranteed to be very useful for you.
    <br/>
    - No more having to look for a reputable shoe CLEANING place that hasn't been found yet, no need to worry about dirty shoes but being busy and not having time to clean them yourself. Just let TNShoeStore worry, you just need to wait</p>
    <br/>
    <h1 className={styles.name}>Price for spa</h1>
    <p className={styles.name1}>- TNShoesSpa currently provides the following services:</p>
    + CASUAL SHOES: 80,000 VND
    <br/>
    + LUXURY SHOES: 95,000 VND
    <br/>
    + SLIPPERS: 60,000 VND
    <br/>
    <p className={styles.name1}>- Committed to dedication in each product, extremely fast shoe processing speed, all cleaning solutions are imported from the USA and are top-notch today.</p>
    <br/>
    <iframe src="https://giphy.com/embed/fvZeiy28smIKyiy9nv" width="480" height="360" className={styles.gif}></iframe>
    </div>
    </>
  )
}
