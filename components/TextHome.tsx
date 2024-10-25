"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function TextHome() {
  const [name, setName] = useState('');
  const router = useRouter(); // Correctly invoked useRouter
  const handlebtn = async () => {
    try {
      const response = await axios.post('api/userprof/getid', { name });
      const id = response.data.id;
      if (id) {
        toast.success("GOT the user");
        router.push(`/profiles/view/${id}`); // Use id directly
      } else {
        toast.error("Id not Retrieved");
      }
    } catch (error) {
      toast.error("Error retrieving ID");
      console.error(error);
    }
  }

  return (
    <div className='mt-32 mx-4 md:mx-16'>
      <Toaster reverseOrder={false} position='top-right' />
      <div className='flex flex-col gap-8'>
        <p className='text-custom-yellow text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold'>
          Everything you are. In one, simple link in bio.
        </p>
        <p className='text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl font-semibold'>
          Join 50+ people using LinkIT for their link in bio. One link to help you share everything you create, curate, and sell from your Instagram, TikTok, Twitter, YouTube, and other social media profiles.
        </p>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex min-h-16 bg-white rounded-2xl items-center text-lg p-4 outline-blue border border-transparent focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 w-full md:w-auto'>
            <span className='font-medium'>linkit.vercel.dev/</span>
            <input 
              type="text" 
              placeholder='yourname' 
              value={name} 
              className='text-gray-400 w-32 md:w-40 lg:w-48 outline-none' 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handlebtn} className='rounded-full items-center p-4 bg-custom-yellow min-h-16 transition duration-200 hover:bg-pink-300'>
              Search User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextHome;
