"use client";
import axios from "axios";
import Link from "next/link";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function Profile() {
  const params=useParams();
  const userId=params.userid;
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      if (userId) {
        // Ensure userId is available before making the request
        try {
          const rescol = await axios.post("/api/userprof/getcollections", {
            num: userId,
          });
          setCollections(rescol.data); // Ensure this matches the response structure
        } catch (error) {
          console.error("Error fetching collections:", error);
          toast.error("Failed to fetch collections");
        }
      }
    };

    fetchCollections(); // Call the fetch function
  }, [userId]); // Run effect when userId changes

const router= useRouter();
const handleCollectionClick=(id:Number)=>{
router.push(`/profiles/view/${userId}/${id}`)
}

  return (
    <div className="flex flex-col gap-4 min-h-screen justify-center items-center bg-black">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-5xl flex md:text-6xl lg:text-7xl">
        <span className="text-custom-yellow">Welcome,</span>
        <span className="text-white">Visitor</span>
      </div>
      <div className="text-white font-serif">
        Here is the list of collections
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex flex-col gap-4">
          {collections.map((e: any) => (
  <div onClick={()=>{handleCollectionClick(e.id)}}
    className="text-custom-yellow text-sm cursor-pointer lg:text-2xl p-4 bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-between"
    key={e.id}
  >
    {/* Collection name */}
    <span className="flex-grow text-center">{e.ref}</span>
  </div>
))}

          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
  <Link href="/">
    <button className="bg-custom-yellow rounded-md h-10 p-2">
      Home
    </button>
  </Link>
</div>
    </div>
  );
}

export default Profile;
