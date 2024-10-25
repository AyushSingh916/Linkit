"use client";
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function Appbar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push('/'); // Redirect after logout
  };

  return (
    <div className="flex flex-row justify-between items-center bg-white shadow-lg rounded-full sticky top-16 z-20 mx-4 md:mx-16 p-4 transition-all duration-300 ease-in-out">
      {/* Brand Section */}
      <div className="flex items-center">
        {status === "authenticated" ? (
          <Link href="/pages/console" className="flex items-center cursor-pointer">
            <div className="text-3xl font-extrabold text-black hover:text-custom-yellow transition-colors duration-200">
              LinkIT (Click me!)
            </div>
          </Link>
        ) : (
          <div className="flex items-center cursor-not-allowed text-gray-400">
            <span className="text-3xl font-extrabold">
              🔒 LinkIT
            </span>
          </div>
        )}
      </div>

      {/* Welcome Message */}
      <div className="hidden sm:flex items-center space-x-2">
        {status === "authenticated" && (
          <div className="text-custom-yellow text-xl font-semibold lg:text-2xl">
            Welcome, <span className="font-bold">{session?.user?.name}</span>!
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="flex items-center space-x-4">
        {status === "authenticated" ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-custom-yellow text-white rounded-full py-2 px-6 font-semibold hover:bg-yellow-600 transition-colors duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => router.push('/pages/verify/signin')}
              className="bg-custom-yellow text-white rounded-full py-2 px-6 font-semibold hover:bg-yellow-600 transition-colors duration-200"
            >
              Log in
            </button>
            <button
              onClick={() => router.push('/pages/verify/signup')}
              className="border border-custom-yellow text-custom-yellow rounded-full py-2 px-6 font-semibold hover:bg-yellow-50 transition-colors duration-200"
            >
              Sign up free
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Appbar;
