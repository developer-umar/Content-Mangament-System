import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'


//appwrite me id ko $id hi lena padta hai  wrna  value nhi lega  ye jo id hai ye post ki id hai 
function PostCard({$id ,title,featuredImage}) {
  return (
    <Link  to={`/post/${$id}`}>
      

        <div className='w-full bg-gray-100 rounded-xl p-4 h-full flex flex-col'>
          

            <div className='w-full justify-center mb-4'>

                  {/* image */}
                  {/* {ye uthaega getfilepreview()  method se jo hame file ka url dega from appwrite config } */}

                  <img src={appwriteService.getFilePreview(featuredImage)}  alt={title} className='rounded-2xl w-full h-48 ' />

               

            </div>

             {/* text ke liye  */}

             <h2 className='text-xl font-bold'>{title}</h2>
        </div>

    </Link>
  )
}

export default PostCard