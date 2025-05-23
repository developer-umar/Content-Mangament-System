import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'



function Signup() {
    const [error, setError] = useState("")

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();

    const create = async (data) => {
        setError("");

        try {
            const userData = await authService.createAccount(data);  // account bnao ar store update karo data data wapis mangwao

            if (userData) {

                const userData = await authService.getCurrentUser();

                if (userData)  dispatch(login(userData));    //store ko update kar denege
                navigate("/");

                    

             

            }

        } catch (error) {

            setError(error.message);

        }


    }
    return (

        <div className=' flex items-centre justify-center '>

            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>


                <div className='mb-2 flex justify-center'>

                    <span className=' inline-block w-full  max-w-[100px]'>

                        <Logo width='100%' />

                    </span>


                </div>

                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up  to your account</h2>

                <p className='mt-2 text-center text-base text-black/60'>

                    Already have an account?&nbsp;

                    <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sin In



                    </Link>


                </p>

                {/* agar error hai to error dikhao  */}

                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}


                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>

                        {/* name  */}

                        <Input label="Name:" placeholder="Enter your Name"

                            {...register("name", {
                                required: true
                            }

                            )}

                        />


                        {/* for email  */}

                        <Input label="Email:" type="email" placeholder="Enter your Email"

                            {...register("email", {

                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value) || "Invalid email address",
                                }


                            }


                            )}


                        />

                        <Input label="Password:" type="password" placeholder="Enter your password"

                            {...register("password", {
                                required: true,


                            })}






                        />

                        <Button type='submit' className='w-full'>Create Account</Button>





                    </div>

                </form>






            </div>




        </div>
















    )
}

export default Signup