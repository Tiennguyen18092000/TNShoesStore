import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Grid, Paper, styled } from '@mui/material'
import Link from 'next/link'
import Head from 'next/head'



export default function Home() {
  return (
    <>
      <Head>
            <title>TNShoesStore | Home</title>
            <meta name="keywords" content="Shoes"/>
      </Head>
      <div className={styles.homepage}>
          <div className={styles.videobanner}>
            <img src='Banner.gif'  />
            <img src='Banner2.jpg' width={685}/>
         </div>
      <div>
        <h1 className={styles.name}>Collections</h1>
        <Grid container spacing={18}>
        <Grid item xs={4} className={styles.item}>
        <Link href="/collections" className={styles.img}>
          <img src="CollectionsNike.jpg" alt='' width={400} style={{paddingLeft:'5px'}}/>
        </Link>
        </Grid>
        <Grid item xs={3.45} className={styles.item}>
        <Link href="/collections"className={styles.img}>
          <img src="superstar.jpg" alt='' width={600} height={395}/>
        </Link>
        </Grid>
        <Grid item xs={4} className={styles.item}>
        <Link href="/collections"className={styles.img}>
          <img src="CollectionsVans.jpg" alt='' width={400} height={393}/>
        </Link>
        </Grid>
        </Grid>
        <div>
          <h2 className={styles.name1}>Feeback</h2>
          <Grid container spacing={1}>
        <Grid item xs={4.5} className={styles.item}>
        <img src="Feedback.jpg" alt='' width={420} />
        </Grid>
        <Grid item xs={4} className={styles.item}>
          <img src="Feedback2.jpg" alt='' width={360} />
        </Grid>
        {/* <Grid item xs={2.7} className={styles.item}>
          <img src="feedback4.jpg" alt='' width={360} height={270} />
        </Grid> */}
        <Grid item xs={2} className={styles.item}>
          <img src="Feedback3.jpg" alt='' width={409} />
        </Grid>
        </Grid>
        </div>
      </div>
     </div>
    </>
  )
}
