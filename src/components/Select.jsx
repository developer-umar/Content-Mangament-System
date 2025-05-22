import React ,{useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props

}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 bg-white text-black outline-none focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}  >

                {/* agar options hai to option me iterate karo  wrna na kro */}

                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}

                    </option>
                ))}


            </select>
        </div>
    )
}
//yha pr aise bhi forward use kar skte  hain 

export default React.forwardRef(Select)