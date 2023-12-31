import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../../components/layout'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { AuthContextProvider } from '../../context/AuthContext'
 

export default function App({ Component, pageProps }: AppProps ) {
  return( 
    <>
    <Layout>
    <Component {...pageProps} />
    </Layout>
    <Footer/>
    </>
  )
}
