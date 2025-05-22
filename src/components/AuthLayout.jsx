//ye ek machanism  hai kis tarah se pages ya routes ko protect kia jaata hai 
//ye ek protected container hai 
//file ar function ka name  different ho skta hai 

// Toh overall, yeh Protected component ek mechanism hai jo check karega agar user logged in hai ya nahi, aur uske hisaab se usko sahi page pe redirect kar dega!

import React from "react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthLayout({children,authentication=true}){

    const [loader,setLoader] = useState(true)
     const navigate = useNavigate();
     const  authStatus = useSelector(state => state.auth.status)

     useEffect(() => {

        // to maike it more easy

        // if(authstatus ==true){
        //     navigate("/");

        // }
        // else{
        //     navigate("/login")
        // }



    //  authentiaction hamesha true hai  authsstsus agar true matlab  user login hai to use navigate karo  login

         // agar authentication true hai (default value true hai), 
        // aur authStatus match nahi kar raha, to login page pe bhejo
          //  true  && false! = true   false matlab login nhi to use login karwao 
        if(authentication  && authStatus !==  authentication){    //abhi login nhi hai ku ki authstus false hai 
           navigate("/login")
              
        }
       // agar authentication false hai aur user login hai, to home page pe redirect karo
    //    yha pr authstatus  false! matlab true hai  matlab login hai user to login hai to bhej do

        else if( !authentication  &&  authStatus !== authentication ){
     
            navigate("/")

        }

        setLoader(false)

        
      
     }, [authStatus,navigate,authentication])
     

     //agar loader true hai  to matlab abhi loading ho rha hai wrna  children yaa ni asitis   display kardo

   return  loader ? <h1>Loading...</h1> : <>{children}</>


}