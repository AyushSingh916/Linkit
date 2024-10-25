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
          <div className="flex flex-col gap-2 w-full max-w-md mt-4">
            <button onClick={() => signIn('google')} className="flex items-center justify-center bg-black text-white p-4 rounded-lg transition duration-300 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.29 3.438 9.801 8.207 11.388.6.112.82-.261.82-.577 0-.285-.01-1.044-.015-2.052-3.338.724-4.045-1.604-4.045-1.604-.548-1.392-1.336-1.765-1.336-1.765-1.092-.746.083-.73.083-.73 1.207.085 1.838 1.237 1.838 1.237 1.07 1.831 2.805 1.302 3.49.996.109-.775.419-1.302.763-1.602-2.665-.303-5.467-1.333-5.467-5.933 0-1.311.47-2.38 1.236-3.219-.124-.303-.535-1.525.117-3.176 0 0 1.008-.322 3.301 1.229.957-.265 1.986-.397 3.003-.403 1.016.006 2.046.138 3.006.403 2.293-1.551 3.301-1.229 3.301-1.229.652 1.651.241 2.873.117 3.176.766.839 1.236 1.908 1.236 3.219 0 4.619-2.804 5.626-5.474 5.926.43.37.816 1.097.816 2.213 0 1.598-.014 2.888-.014 3.282 0 .317.22.694.826.577C20.565 21.798 24 17.29 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Sign In with Google
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
