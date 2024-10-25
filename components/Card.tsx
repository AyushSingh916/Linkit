import React from 'react';
import Image from 'next/image';
import userImage from '@/assets/homepages/user.png';  // Import the image directly
import { useRouter } from 'next/navigation';
function Card({ name, email ,id }) {
  const router=useRouter()
  const handleclick=()=>{
       router.push(`/pages/users/${id}`)
  }
  return (
    <div onClick={handleclick} className="bg-custom-yellow cursor-pointer mx-8 flex justify-center w-full max-w-xs  md:max-w-md p-16 rounded-lg shadow-lg border-2 border-gray-300 transition-transform transform hover:scale-105">
      {/* Container for profile picture and user details */}
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Profile Picture */}
        <div className="flex items-center justify-center mb-4 md:mb-0 md:mr-4">
          <Image
            src={userImage}  // Use imported image path with next/image
            alt={`${name}'s profile`}
            width={96}
            height={96}
            className="rounded-full"  // Circle image
          />
        </div>
        
        {/* User Details */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="text-4xl md:text-5xl font-extrabold text-black mb-2 font-custom">
            {name}
          </div>
          
          {/* Email, hidden on small screens */}
          <div className="hidden md:block text-sm text-gray-800 mb-4">
            {email}
          </div>
          
          <div className="text-sm md:text-base text-gray-700">
            "This user hasn't added a bio yet."
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
