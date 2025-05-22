import React from 'react'
import authService from '../../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';





function LogoutBtn() {

    const  dispatch = useDispatch();
    
  
    const logoutHandler  = ()=>{


      authService.logOut().then(()=>{
        dispatch(logout())
      
      
      });
  
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full font-semibold text-xl' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn
