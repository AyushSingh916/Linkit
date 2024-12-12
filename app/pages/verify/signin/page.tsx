"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import signinImage from '@/assets/homepages/login.png'; // Change to your signin image path
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner'; // Import the LoadingSpinner

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    try {
      const result = await signIn('credentials',{
        redirect: false,
        email,
        password,
      });
      if (result?.status === 200) {
        router.push('/');
      } else {
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Signin error:', error);
      alert('Error signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid bg-custom-yellow grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Side: Form Section */}
      <div className="flex flex-col m-8 md:m-16 gap-8">
        <div className='flex flex-row items-center gap-2'>
          <h1 className='font-mono font-semibold text-xl'>LinkIt</h1>
        </div>
        <div className="flex flex-col gap-4 mt-32 justify-center items-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">Welcome Back</h1>
          <h2 className="text-lg">Sign in to your account</h2>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-col space-y-4 w-full max-w-md">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out hover:border-gray-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-300 ease-in-out hover:border-gray-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className={`bg-black text-white p-4 rounded-lg hover:outline-gray-500 transition duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleSignin}
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : 'Sign In'}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Image Section */}
      <div className="hidden md:flex justify-center items-center">
        <Image src={signinImage} alt="Sign In" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default SignInPage;
