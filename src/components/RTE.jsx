// reak time editor

import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

//controller islioye use kia hai hamne ku ki is controller ki madad se jo bhi ham real time editor me change karenmge to wo change ui dikhaane ke liye ya khi ar dikhaane ke liye ham  forward ref bhi use kar skte the lekin controller zyaada shi rhta ar nyi cheez sikh jaaate 

export default function RTE({ name, control, label, defaultValue = "" }) {

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            {/* yha pr name control render sab componet hai  Controller */}

            <Controller
                name={name || "content"}
                
                control={control}                            //control ki wjh se hi ui me changes effect hoga 
                // kya display karwanaana hai  wo render ke nadar aega  iske andar field hoti hai 
                // iska matlab agar is field me kuch bhi change hota hai to mujhe btao ar fir onchange functionn  call karo
                render={({ field: { onChange } }) => (
                    //yha  pr jo bhi elemnt render karwana hai 
                    //ye sab kuch ham  tinymce ki website pr jaa kar padh skte hain 

                    <Editor


                        //             init Object: Yahan init wo settings object hai jo TinyMCE editor ko configure kar raha hai. Yeh kuch important settings define kar raha hai:

                        // initialValue: Editor ka starting content jo defaultValue hai.
                        // height: Editor ki height set ki ja rahi hai (500px in this case).
                        // menubar: Agar true hai, toh editor mein menubar dikhayi degi.
                        // Plugins: Editor mein different functionalities ko enable karne ke liye plugins ka array. Jaise image, link, lists, fullscreen, etc. Yeh sab features editor mein add karte hain.
                        // Toolbar: Yeh line specify karti hai ki editor mein kaunse buttons dikhne chahiye. Jaise undo, redo, bold, italic, etc.
                        // Content Style: Yeh editor ke content ka style set karta hai (fonts aur size).

                        apiKey='vcrp09519075x5ccuhsmajikydc43djmjn3e02a6l7ike2rh'
                        initialValue={defaultValue}
                    

                        init={{
                            height: 500,
                            menubar: true,

                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"



                        }}

                        onEditorChange={onChange}
                      
                        //on change react hook form ka hai 
                        //on editor change  tiny mce editor ka hai 
                        //hamne controller ke zarye third party  editor ke ststes ko mange kar liya isiwjh se jab ham kuch editor me likh rahe hain to wo automaticallllly 

                    />


                )}



            />

        </div>
    )
}


