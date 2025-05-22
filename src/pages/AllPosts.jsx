import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {

    const [posts, setposts] = useState([])

    useEffect(() => { }, [])
    appwriteService.getPosts([]).then((posts) => {
     
        if (posts) {
            setposts(posts.documents)                //saare document posts ke andar  aagye matlab saare post 

        }
    })

    return (
        <div className='w-full py-8'>

            <Container>
                <div className='flex flex-wrap'>
                    
                {posts.map((post) => (

                <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'> 

                <PostCard  {...post} />

                </div>

                   

           ))}
            </div>
            </Container>


        </div>
    )
}

export default AllPosts
