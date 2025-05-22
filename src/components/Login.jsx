import React, { useState } from 'react'
import { json, Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice"   // login ko ham auth login bolenge
import { Button, Input, Logo } from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("")
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("")


    // aagr  data hai to  store me jaakar login ko update karo data ar ststus true kardo 
    //usedata object ke form me denge 
    try {
      const session = await authService.login(data);  // check karta hai data shi hai mhi 
      if (session) {          // agar session start ho gya ho to  data fech karo
        const userData = await authService.getCurrentUser();  //current data fetch karo
        console.log(JSON.stringify(userData, null, 2));


        // agar userdata hai   to update karo store ko 
        if (userData) {
          dispatch(authLogin(userData));    //store me update kar rha authlogin login hai oopar dekho maaana hai 
          navigate("/");                


        }

      }

    } catch (error) {
      setError(error.message);
    }

  }

  return (
    <div className=' flex items-center justify-center w-full'>

      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>

        <div className='mb-2 flex justify-center'>

          <span className=' inline-block w-full  max-w-[100px]'>

            <Logo width='100%' />

          </span>


        </div>

        <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>

        <p className='mt-2 text-center text-base text-black/60'>

          Don&apos;t have any account? &nbsp;

          <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
            Sin Up



          </Link>


        </p>

        {/* agar error hai to error dikhao  */}

        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        {/* //handle submit ek  already  ek  key word method hai jo use form me hai  usko ham bas use kar rahe hain ar usek andar hamne login() dia hai oopar define hai   */}
        <form onSubmit={handleSubmit(login)} className='mt-8'>

          <div className='space-y-5'>

            <Input label="Email:" placeholder="Enter email" type="email"
              // ..register ye zarrori hia aise hi hota hai react hook form me  email hamara key hai 

              {...register("email", {

                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address",
                }
              })}


            />

            {/* passowrd ke liye input form  */}

            <Input label ="Password:"  type="password" placeholder="Enter   your password"

            {...register("password",{required:true} )}
            
          
            />

           <Button type='submit' className='w-full'>Singn in </Button>

          </div>
        </form>




      </div>


    </div>
  )
}

export default Login
