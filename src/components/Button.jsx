//ek button bna lo ar isko sab jgh use karlo apne hisaaab se 
import React from 'react'
//yha pr jo bhi text aaega wo   asitis btn pr lag jaega 


function Button({
  children,                            //text -jo bhi dega use children kh rha hai 
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = '',
  ...props                     //agar maanlo user ar koi properties de dede to spread kar ke add karlo




}) {

  return (
    <button className={`px-4 py-2 rounded-lg  ${bgColor} ${textColor} ${className}`}{...props}>

      {children}

    </button>
  )
}

export default Button
