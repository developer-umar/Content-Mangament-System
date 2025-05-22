
import React, { useCallback ,useEffect} from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//  ye wo post hai jo ham bna rahe hain ya bna chuke hain use edit kar rahe hain 

function PostForm({ post }) {

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    // agar post hai yaa ni wo user edit karne aaya hai 
    // post hai to  post ke  title  ka title  lelo  wrna khaali rhne do 
    // post nhi hai matlab  nya post daalne aaya hai to saare cheeze yaaani tile ,content.. sab  khaali honge
      defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",



    },
  })

  const navigate = useNavigate();
  const userData = useSelector((state)=>state.auth.userData);
  
  

  const submit = async (data) => {
    //  Jab post already hai 
    // post hai matlab edit karne aaya hai so phle ham ek nyi image upload karenge fir puraani image ko delete kaerenge ar fir usko redirect karenege  nyi post pe 
    // upload karne  ke baad file me image ki id save hoti hai 

    if (post) {
      const file =   data.image[0] ?  await appwriteService.uploadfile(data.image[0]) : null

      // ar saath hi saath
      // faturedimage yaani id image ki  delet karenge 
      if (file) {
        appwriteService.deletefile(post.featuredImage);

      }
      //post ko update  karna hai  abhi khli image hua baaki saari cheeze update karni hai matlab agar poora post updatae karna hai to 
      const dbPost = await appwriteService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined })         //see from  appwrite sevices in config
      // db post  naya post ka data return hua hai   ho gya to  naviagte kardo use uspost ke url pe jisko tumne  edit  kia hai 

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)


      }
    }



    //jab  post nhi hai matlab mujhe naya  post daaalna hai to   create karo ar navigate karo  post pr
    // phle file upload kiya hoga 
    //iske liye mujhe image ki id bhi chaiye hogi alag se 
    else {

      const file =   data.image[0] ?  await  appwriteService.uploadfile(data.image[0]) : null;
     
      if (file) {
        const fileId = file.$id
      
        data.featuredImage = fileId;

        //  ham logo ne image ki id yaa ni fatured image ki id set kardi  ar baaki bachi properties  ko asitis spread karke send karo
        const dbpost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id                // userdata hamne store se  le aae userid bhi dena tha isliye 
        })
        //aagr post kar dia hai to use navigate  karao 

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`)
        }
      }



    }
  }
  //slug ka function 

  // Aise samjho, useCallback ek tarika hai jo React ko ye batata hai ki "is function ko mat badlo jab tak yeh specific values nahi badalti," aur isse hum unnecessary re-renders se bach sakte hain.
// agar value hai to slug me change karo agar nhi hai to null
const slugTransform = useCallback((value) => {

  if (value && typeof value === "string")
      return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

  return "";
}, []);

  //ye watch function hi dono ke beech me connection kar rha hai 
  
  useEffect(() => {
    const subscription = watch((value, { name }) => {

      // slug field ki value  slugTransform method jo bina spaces ke return kar rha hai  set kardo 
      if (name === "title") {

        setValue("slug", slugTransform(value.title, { shouldValidate: true }))


      }

    });

      return () =>  subscription.unsubscribe();   // ye ek optimization ka tarika hai bas
                      
      
   

  }, [watch, slugTransform, setValue])          //ye teeno elements react hook form se milte hain 




  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

      <div className="w-2/3  px-3">

        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}

        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })

          }}

        />
        

        <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />

      </div>

      <div className="w-1/3  px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"

          {...register("image", { required: !post })}
        

        />
        {/* agar post hai to display karo  */}

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        
        <Select
          label="Status"
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}

        />

          <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>


      </div>




    </form>


  )
}

export default PostForm;
