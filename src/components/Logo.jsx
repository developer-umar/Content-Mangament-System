import React from 'react';

// const Logo = () => {
//   return (
//     <div className="flex items-center space-x-3  p-5 rounded-lg bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-200">

     
//       <h1 className="text-3xl font-extrabold text-gray-800">
//         Blog
//         <span className="text-indigo-600">Aura</span>
//       </h1>
//     </div>
//   );
// };

// export default Logo;


const Logo = () => {
  return (
    <div className="flex items-center space-x-3 p-5 rounded-lg bg-gradient-to-r from-pink-300 via-orange-200 to-yellow-200 shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
      
    {/* Logo Text */}
    <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide">
      Blog
      <span className="text-indigo-600">Aura</span>
    </h1>
  </div>
  );
};

export default Logo;