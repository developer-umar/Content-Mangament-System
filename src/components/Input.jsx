import React, {useId} from 'react'
// input  ko bhi btn ki tarah bange ki uske andar props pass kar ske taaki ek hi input alag alag  jgh use kar ske 
//yha pr normal function na likh kar ham  arrow function likh rahe kuki forward ref use karenge to z yaada accha dikhega  ar smjh me aega

// function Input({

// }) {

//     const  id = useId();
//   return (
//     <div>
      
//     </div>
//   )
// }

//forward ref isliye use kar rahe hain taaki   ham jab iske stataes bangee to doosre components me  bhi iska refrence avialable rahe 
// input functiopn ke andar   props pass kar denge 


const  Input = React.forwardRef( function Input ({
    label,
    type="text",
    className="",
    ...props


},ref){                // ye hi ref ko ham reference ki tarah use karenge  ref ko props ki tarah use kia hai 
   const id = useId();
    return (
        <div className='w-full'>
{/* agar label kisi ne pass kia hai ya dia hai to display karo  */}
            {label && <label className="inline-block mb-1 pl-1" htmlFor={id}>{label}</label> }

            
            <input  type={type}  className={`px-3 py-2 rounded-lg bg-white text-black outline-none  focus:bg-gray-50  duration-200 border border-gray-200 w-full ${className}`}
             ref = {ref}              // ref is passed to the input, so it can be accessed by parent components
             {...props}
             id = {id}                     
            />


        </div>
    )

})
export default Input
