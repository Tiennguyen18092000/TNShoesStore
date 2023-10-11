import React, {useState} from "react"
import styles from "@/styles/register.module.css"
import { Button, Card } from "@mui/material"
import TextField from "@mui/material/TextField"
import Head from "next/head"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/router"
import { db } from "../../config/firebase"
import { doc, setDoc } from "firebase/firestore"



export default function Register(){
    const router = useRouter()
    // const { signup, logout } = useAuth()
    const {user, signup} = useAuth()
    console.log(user)
    const [data, setData] = useState({
        email: '',
        password: '',
        
    })
    const [repass, setRepass] = useState('');
    const handleSignup = async (e: any) => {
        e.preventDefault()
        try {
            if (repass == data.password) {
                const res = await signup(data.email, data.password);
                await setDoc(doc(db, "users ", res.user.uid), {
                    ...data
                }).then(()=>{
                        logout()
                    });
                alert('dang ky thanh cong')
                router.push('/login')
            } else {
                alert('password not match')
            }
        } catch (err) {
            alert('email nay da duoc dang ky')
            console.log(err)
        }

        console.log("user day la data", data)
    }
    // const handleSignup = async (e: any) => {
    //     e.preventDefault()
    //     try {
    //         await signup (data.email, data.password)
    //         router.push('/')
    //     }catch (err) {
    //         console.log(err)
    //     }
    //     console.log(data)
    // }
    return(
        <>
        <Head>
            <title>TNShoesStore | Register</title>
            <meta name="keywords" content="Shoes"/>
        </Head>
        
        <main className={styles.main}>
        <Card sx={{ maxWidth: 800 }} className={styles.card1}>
        <div className={styles.form}>
            <h1 style={{display:"flex", justifyContent:"center"}}>Register</h1>
            <form onSubmit={handleSignup} style={{ display: 'grid' }}>
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
                    />
                    <label>Password: </label>
                    <TextField
                            label="Enter your Pre-Password"
                            placeholder="Pre-Password"
                            type="password"
                            onChange={(e: any) => setRepass(e.target.value)}
                            value={repass}
                            required
                    />
                    <hr />
            <button type='submit' className={styles.btn}  style={{lineHeight:2}}>Register</button>
            </form>
            </div>
            </Card>
        </main>
       
        </>
    )
}

function logout() {
    throw new Error("Function not implemented.")
}
