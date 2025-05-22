import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {

    const [post, setPost] = useState(null);
    const navigate = useNavigate();
    const { slug } = useParams();
 

    const userData = useSelector((state) => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false;



    useEffect(() => {

        if (slug) {

            appwriteService.getPost(slug).then((post) => {
             

                if (post) {

                    setPost(post)

                }
                else {

                    navigate("/")
                }
            })

        }
        else {
            navigate("/")
        }


    }, [slug, navigate])
    //agar wo login hai to delete kar paega wrna nhi 
    //phle post delete karenge 
    //ar phr file delete karenge 
    //post delete kar rahe hain id se 
    //  ar file delete  karna hai to  featured image ki khud ki id hai 

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {

            if (status) {
                appwriteService.deletefile(post.featuredImage)
                navigate("/")

            }
        })


    }


    return post ? (


        <div className='py-8'>
            <Container>

                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>

                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full object-contain"
                    />

                    {/* aagar wo author hai to hi use delete ar edit button show  karo other wise nhi karo  */}
                    {/* accha edit jo wo edit post ar post-form me handle ho rha hai matlab agar edit karane ko click karega wo usko edit post waala page kholdega  */}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>


                    )}
                </div>
                {/* yha title are content show karo post ka  */}
                {/* yha parser isliye use kia hai kuki backend se content khi html tag lag kar wapis aarha hoga to asitis display ho jaega ar tag bhi dikhega to isko html  parse usko normal  react script me convert kar deta hai  */}

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}

                </div>
            </Container>


        </div>

    ) : null;
}

export default Post
