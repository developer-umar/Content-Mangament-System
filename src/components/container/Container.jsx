import React from "react";
//  ye khli aistis jo bhi aagea  dsiplay kar deta hai  ar css add kar rha hai 

function Container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
  
}

export default Container
