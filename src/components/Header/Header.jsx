import React from 'react'
import { Container, Logo, LogoutBtn } from "../index";

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


//store me dekhan hai ki user login hai ya nhi isliye selector use kar rahe 




function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },                                               //slug bas naam dia hai  iske jagah to  bhi le  skte hain 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]



  return (
    <header className='py-3 border-b border-gray-200'>
      <Container>

        <nav className='flex'>
          <div className='mr-4'>

            <Link to="/">
              <Logo width='70px' />
            </Link>
          </div>
          {/* JO ACTIVE HAI UNHI KO KHLI DISPLA KARAO wrna null  */}

          <ul className='flex ml-auto'>

            {navItems.map((item) =>
              item.active ? (<li key={item.name}>
                <button className='inline-block px-6 py-2  duration-200 hover:bg-blue-100  font-semibold   text-xl  rounded-full' onClick={() => navigate(item.slug)}>{item.name}</button>
              </li>) : null

            )}

            {/* agaar ye login hai to logout wla button dikhaoo */}

            {authStatus && (
              <li>

                <LogoutBtn />

              </li>
            )}

          </ul>

        </nav>




      </Container>
    </header>


  )
}

export default Header
