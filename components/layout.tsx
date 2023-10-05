import React, { Children, ReactElement } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { AuthContextProvider } from "../context/AuthContext";

export default function Layout({children}:{ children: ReactElement}){
    return(
        <>
       <div>
       
       <AuthContextProvider>
       <Navbar/>
        <main>{children}</main>
       </AuthContextProvider>
       
       </div>
       </>
    )
}