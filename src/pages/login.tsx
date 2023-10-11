import React, { useState } from "react"
import styles from "@/styles/login.module.css"
import { Button, Card } from "@mui/material"
import TextField from "@mui/material/TextField"
import Link from "next/link"
import Head from "next/head"
import { useAuth } from "../../context/AuthContext"
import router, { useRouter } from 'next/router';



export default function Login(){
    const router = useRouter()
    const { user, login } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
        role: ''
    })

    const handleLogin = async (e: any) =>  {
        e.preventDefault()
        console.log(user)
        try {
            await login(data.email, data.password)
            router.push('/').then(() => { router.reload() })
        } catch (err) {
            alert('Sai thong tin dang nhap')
            console.log(err);
        }
    }

    return(
        <>
        <Head>
            <title>TNShoesStore | Login</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
        
    <main className={styles.main}>
    <Card sx={{ maxWidth: 800 }} className={styles.card1}>
        <div className={styles.form}>
            <h1 style={{display:"flex", justifyContent:"center"}}>Login</h1>
            <form onSubmit={handleLogin}  style={{ display: 'grid' }}>
                <label>Email: </label>
                    <TextField
                            label="Enter your Email"
                            placeholder="Email"
                            multiline
                            onChange={(e: any) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                            value={data.email}
                    />
                <label>Password: </label>
                    <TextField
                        label="Enter your Password"
                        placeholder="Password"
                        type="password"
                        required
                         onChange={(e: any) =>
                            setData({
                                ...data,
                                password: e.target.value,
                            })
                        }
                        value={data.password}
                    />
                    <hr/>
            <button type="submit" className={styles.btn} >Login</button>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Link href='/register'>Register</Link>
            </div>
            
            </form>
            </div>   
            </Card>  
    </main>
   
        </>
    )
}